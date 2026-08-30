export function ScienceHeroScene() {
  return (
    <div className="relative min-h-[390px] w-full overflow-hidden sm:min-h-[460px] lg:min-h-[550px]" aria-hidden="true">
      <style>{`
        @keyframes ax-science-orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes ax-science-orbit-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes ax-science-pulse { 0%,100% { transform: scale(1); opacity:.78; } 50% { transform: scale(1.035); opacity:1; } }
        @media (prefers-reduced-motion: reduce) { .ax-science-spin,.ax-science-spin-r,.ax-science-pulse { animation:none !important; } }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_56%_48%,rgba(80,156,238,0.13),transparent_31%),radial-gradient(circle_at_76%_36%,rgba(133,103,233,0.05),transparent_27%)]" />

      <svg viewBox="0 0 760 520" className="absolute inset-0 h-full w-full" role="presentation">
        <defs>
          <radialGradient id="science-core" cx="42%" cy="34%" r="68%">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.96" />
            <stop offset="0.25" stopColor="#9ed8ff" stopOpacity="0.9" />
            <stop offset="0.58" stopColor="#4e8fe1" stopOpacity="0.72" />
            <stop offset="1" stopColor="#746cde" stopOpacity="0.3" />
          </radialGradient>
          <filter id="science-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <g transform="translate(426 263)">
          <g className="ax-science-spin" style={{ animation: "ax-science-orbit 30s linear infinite", transformOrigin: "0px 0px" }} fill="none" stroke="#6f96d3" strokeWidth="1" opacity="0.22">
            <ellipse rx="240" ry="76" transform="rotate(-13)" strokeDasharray="6 9" />
            <ellipse rx="192" ry="118" transform="rotate(32)" strokeDasharray="5 10" />
          </g>
          <g className="ax-science-spin-r" style={{ animation: "ax-science-orbit-reverse 38s linear infinite", transformOrigin: "0px 0px" }} fill="none" stroke="#88a8d8" strokeWidth="1" opacity="0.15">
            <ellipse rx="160" ry="146" transform="rotate(-51)" strokeDasharray="4 12" />
          </g>

          <circle className="ax-science-pulse" style={{ animation: "ax-science-pulse 7s ease-in-out infinite", transformOrigin: "0px 0px" }} r="78" fill="url(#science-core)" opacity="0.88" filter="url(#science-glow)" />
          <circle r="52" fill="none" stroke="#d7ebff" strokeWidth="1" opacity="0.7" />
          <ellipse rx="66" ry="26" fill="none" stroke="#d9eaff" strokeWidth="1" opacity="0.58" />
          <ellipse rx="28" ry="68" fill="none" stroke="#d9eaff" strokeWidth="1" opacity="0.52" />

          <g fontFamily="system-ui" fontSize="12" fontWeight="600">
            <g transform="translate(-210 -28)">
              <circle r="18" fill="#ffffff" stroke="#dce5f0" />
              <text x="28" y="4" fill="#253248">Math</text>
            </g>
            <g transform="translate(178 -105)">
              <circle r="18" fill="#ffffff" stroke="#dce5f0" />
              <text x="28" y="4" fill="#253248">Notebook</text>
            </g>
            <g transform="translate(190 112)">
              <circle r="18" fill="#ffffff" stroke="#dce5f0" />
              <text x="28" y="4" fill="#253248">Writer</text>
            </g>
          </g>

          <path d="M-192 -28 C-132 -86 -72 -88 -18 -42" fill="none" stroke="#73a6df" strokeWidth="1.4" opacity="0.45" />
          <path d="M155 -96 C102 -63 83 -38 62 -5" fill="none" stroke="#8794de" strokeWidth="1.4" opacity="0.4" />
          <path d="M164 103 C107 80 88 53 61 19" fill="none" stroke="#61b0d1" strokeWidth="1.4" opacity="0.4" />
        </g>

        <text x="164" y="154" fill="#778eb5" fontSize="16" fontFamily="Georgia, serif" fontStyle="italic" opacity="0.5">Question → Model → Finding</text>
        <text x="555" y="424" fill="#778eb5" fontSize="15" fontFamily="Georgia, serif" fontStyle="italic" opacity="0.44">one project · many instruments</text>
        <circle cx="180" cy="355" r="4.5" fill="#4f9adc" opacity="0.48" />
        <circle cx="650" cy="192" r="4" fill="#797fdb" opacity="0.38" />
        <circle cx="624" cy="349" r="5" fill="#5eb5cf" opacity="0.38" />
      </svg>

      <div className="absolute inset-y-0 left-0 w-[18%] bg-gradient-to-r from-[var(--ax-canvas)] to-transparent" />
    </div>
  );
}
