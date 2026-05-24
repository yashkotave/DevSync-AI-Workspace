const { execSync } = require('child_process');
const { watch } = require('fs');
const path = require('path');
let timeoutId = null;
const repoRoot = path.resolve(__dirname);
const debounceTime = 10000;

/**
 * Secure git-sync
 * - If `GITHUB_PAT` and `GITHUB_REPO` environment variables are provided,
 *   the script will push using the token over HTTPS to the specified repo host/path.
 * - Otherwise, it falls back to the configured `origin` remote.
 *
 * Usage (Linux/macOS):
 *   GITHUB_PAT=xxx GITHUB_REPO=github.com/owner/repo.git node git-sync.js
 *
 * Windows (PowerShell):
 *   $env:GITHUB_PAT='xxx'; $env:GITHUB_REPO='github.com/owner/repo.git'; node git-sync.js
 */

function runGitSync() {
  try {
    execSync('git add .', { cwd: repoRoot, stdio: 'ignore' });
    const timestamp = new Date().toISOString();
    // Avoid noisy commits when nothing to commit
    try {
      execSync(`git commit -m "Automated Sync: ${timestamp}"`, { cwd: repoRoot, stdio: 'ignore' });
    } catch (commitErr) {
      // No changes to commit
    }

    const pat = process.env.GITHUB_PAT;
    const repo = process.env.GITHUB_REPO; // example: github.com/owner/repo.git

    if (pat && repo) {
      // Push using token supplied at runtime. Do not log the token.
      const pushUrl = `https://${pat}@${repo}`;
      execSync(`git push ${pushUrl} main`, { cwd: repoRoot, stdio: 'ignore' });
    } else {
      execSync('git push origin main', { cwd: repoRoot, stdio: 'ignore' });
    }

    console.log(`[git-sync] synced at ${new Date().toISOString()}`);
  } catch (error) {
    const message = error.message || String(error);
    console.error('[git-sync] sync failed:', message);
  }
}

function scheduleSync() {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(runGitSync, debounceTime);
}

console.log('[git-sync] watching project files for changes...');
watch(repoRoot, { recursive: true }, (eventType, filename) => {
  if (!filename) return;
  if (filename.includes('node_modules') || filename.includes('.git')) return;
  scheduleSync();
});
