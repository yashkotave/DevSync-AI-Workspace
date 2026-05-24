export const BrandLogo = ({ className = '' }) => (
  <div className={`inline-flex items-center gap-3 ${className}`}>
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" fill="none" className="w-8 h-auto" aria-hidden="true">
        <defs>
          <linearGradient id="bracketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e40af" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="loopLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1d4ed8" />
            <stop offset="70%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="loopRight" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="60%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#172554" />
          </linearGradient>
          <linearGradient id="aiCore" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <radialGradient id="neuralGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a7f3d0" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#059669" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g>
          <path d="M 330 220 L 250 300 L 330 380" fill="none" stroke="url(#bracketGrad)" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 670 220 L 750 300 L 670 380" fill="none" stroke="url(#bracketGrad)" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="430" cy="300" r="85" fill="url(#neuralGlow)" />
          <circle cx="570" cy="300" r="85" fill="url(#neuralGlow)" />
          <circle cx="430" cy="300" r="55" fill="none" stroke="#6ee7b7" strokeWidth="2" strokeOpacity="0.5" strokeDasharray="4 6" />
          <ellipse cx="430" cy="300" rx="65" ry="30" fill="none" stroke="#34d399" strokeWidth="2" strokeOpacity="0.4" transform="rotate(30, 430, 300)" />
          <ellipse cx="430" cy="300" rx="65" ry="30" fill="none" stroke="#34d399" strokeWidth="2" strokeOpacity="0.4" transform="rotate(-30, 430, 300)" />
          <path d="M 500 300 C 470 210, 350 210, 350 300 C 350 390, 470 390, 500 300 Z" fill="none" stroke="url(#loopLeft)" strokeWidth="36" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 500 300 C 530 210, 650 210, 650 300 C 650 390, 530 390, 500 300 Z" fill="none" stroke="url(#loopRight)" strokeWidth="36" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="430" cy="300" r="28" fill="url(#aiCore)" stroke="#ffffff" strokeWidth="6" />
          <circle cx="570" cy="300" r="28" fill="url(#aiCore)" stroke="#ffffff" strokeWidth="6" />
          <circle cx="424" cy="294" r="8" fill="#ffffff" opacity="0.9" />
          <circle cx="564" cy="294" r="8" fill="#ffffff" opacity="0.9" />
        </g>
      </svg>
    </span>
    <span className="text-sm font-semibold tracking-tight text-text-primary font-[Plus Jakarta Sans]">
      DevSync AI Workspace
    </span>
  </div>
);
