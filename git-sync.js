const { execSync } = require('child_process');
const { watch } = require('fs');
const path = require('path');
let timeoutId = null;
const repoRoot = path.resolve(__dirname);
const debounceTime = 10000;

function runGitSync() {
  try {
    execSync('git add .', { cwd: repoRoot, stdio: 'ignore' });
    const timestamp = new Date().toISOString();
    execSync(`git commit -m "Automated Sync: ${timestamp}"`, { cwd: repoRoot, stdio: 'ignore' });
    // For security, do NOT embed tokens in source. Use repository remote configured with credentials.
    execSync('git push origin main', { cwd: repoRoot, stdio: 'ignore' });
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
