import React from 'react';

export const LogoNagekeo: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 100 115" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="60%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#0369a1" />
      </linearGradient>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="100%" stopColor="#eab308" />
      </linearGradient>
    </defs>
    {/* Shield Base */}
    <path 
      d="M50 4 C76 4 94 15 94 38 C94 72 65 102 50 110 C35 102 6 72 6 38 C6 15 24 4 50 4 Z" 
      fill="url(#shieldGrad)" 
      stroke="#eab308" 
      strokeWidth="3.5"
    />
    {/* Inner Border Ring */}
    <path 
      d="M50 8 C72 8 88 18 88 38 C88 68 62 96 50 104 C38 96 12 68 12 38 C12 18 28 8 50 8 Z" 
      fill="none" 
      stroke="#f8fafc" 
      strokeWidth="1"
    />
    {/* Mountain Peak (Gunung Ebulobo) */}
    <polygon points="50,30 24,75 76,75" fill="#15803d" stroke="#166534" strokeWidth="1.5" />
    <polygon points="50,30 40,55 50,52 60,55" fill="#f8fafc" opacity="0.85" />
    {/* Traditional House silhouette (Sa'o Nagekeo) */}
    <path d="M42 62 L50 54 L58 62 L56 74 L44 74 Z" fill="#854d0e" stroke="#ca8a04" strokeWidth="1" />
    {/* Golden Star at Apex */}
    <polygon points="50,14 52.5,20 58.5,20.5 54,24.5 55.5,30 50,26.5 44.5,30 46,24.5 41.5,20.5 47.5,20" fill="url(#goldGrad)" stroke="#ca8a04" strokeWidth="0.8" />
    {/* Rice & Cotton wreath at bottom */}
    <path d="M22 75 C24 90 40 98 50 100 C60 98 76 90 78 75" fill="none" stroke="#eab308" strokeWidth="3" strokeDasharray="3,2" />
    {/* Ribbon Banner */}
    <path d="M26 86 Q50 94 74 86 L71 93 Q50 100 29 93 Z" fill="#f8fafc" stroke="#334155" strokeWidth="0.8" />
    <text x="50" y="91" textAnchor="middle" fontSize="5.5" fontWeight="900" fill="#0f172a" fontFamily="sans-serif">NAGEKEO</text>
  </svg>
);

export const LogoPUPR: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Yellow Background Circle */}
    <circle cx="50" cy="50" r="48" fill="#facc15" stroke="#eab308" strokeWidth="2" />
    {/* Dark Navy Blue PUPR Emblem Propeller/Water Wheel */}
    <path 
      d="M50 20 C54 20 56 24 56 30 C56 36 50 42 50 42 C50 42 44 36 44 30 C44 24 46 20 50 20 Z" 
      fill="#1e3a8a" 
    />
    <path 
      d="M32 30 C36 28 42 30 46 34 C50 38 48 46 48 46 C48 46 40 46 36 42 C32 38 30 34 32 30 Z" 
      fill="#1e3a8a" 
    />
    <path 
      d="M22 50 C22 46 26 44 32 44 C38 44 44 50 44 50 C44 50 38 56 32 56 C26 56 22 54 22 50 Z" 
      fill="#1e3a8a" 
    />
    <path 
      d="M30 68 C28 64 30 58 34 54 C38 50 46 52 46 52 C46 52 46 60 42 64 C38 68 34 70 30 68 Z" 
      fill="#1e3a8a" 
    />
    <path 
      d="M50 80 C46 80 44 76 44 70 C44 64 50 58 50 58 C50 58 56 64 56 70 C56 76 54 80 50 80 Z" 
      fill="#1e3a8a" 
    />
    <path 
      d="M68 70 C64 72 58 70 54 66 C50 62 52 54 52 54 C52 54 60 54 64 58 C68 62 70 66 68 70 Z" 
      fill="#1e3a8a" 
    />
    <path 
      d="M78 50 C78 54 74 56 68 56 C62 56 56 50 56 50 C56 50 62 44 68 44 C74 44 78 46 78 50 Z" 
      fill="#1e3a8a" 
    />
    <path 
      d="M70 32 C72 36 70 42 66 46 C62 50 54 48 54 48 C54 48 54 40 58 36 C62 32 66 30 70 32 Z" 
      fill="#1e3a8a" 
    />
    {/* Inner Center Circle */}
    <circle cx="50" cy="50" r="9" fill="#1e3a8a" stroke="#facc15" strokeWidth="2.5" />
    <circle cx="50" cy="50" r="3.5" fill="#facc15" />
  </svg>
);

export const OfficialKopSurat: React.FC = () => {
  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-shrink-0 flex items-center justify-center pl-2">
          <LogoNagekeo className="w-20 h-20 sm:w-24 sm:h-24 object-contain" />
        </div>
        
        <div className="flex-1 text-center font-serif text-black leading-tight space-y-0.5">
          <h2 className="text-base sm:text-lg font-bold tracking-wider uppercase">
            PEMERINTAH KABUPATEN NAGEKEO
          </h2>
          <h1 className="text-base sm:text-xl font-extrabold tracking-wide uppercase">
            DINAS PEKERJAAN UMUM DAN PENATAAN RUANG
          </h1>
          <p className="text-xs sm:text-sm font-normal text-slate-800">
            Komleks Bendung Sutami-No...........Teip...........
          </p>
          <p className="text-xs sm:text-sm font-bold tracking-widest uppercase">
            MBAY
          </p>
        </div>

        <div className="flex-shrink-0 flex items-center justify-center pr-2">
          <LogoPUPR className="w-20 h-20 sm:w-24 sm:h-24 object-contain" />
        </div>
      </div>

      {/* Official Government Double Border */}
      <div className="mt-3">
        <div className="border-b-[3px] border-black"></div>
        <div className="border-b-[1px] border-black mt-[1.5px]"></div>
      </div>
    </div>
  );
};
