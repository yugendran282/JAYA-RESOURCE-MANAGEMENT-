import React from 'react';

interface InstitutionalLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const InstitutionalLogo: React.FC<InstitutionalLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showTagline = true,
  className = ''
}) => {
  const isDark = variant === 'dark'; // Dark text for light background
  const textColor = isDark ? 'text-[#0B192C]' : 'text-white';
  const subtitleColor = isDark ? 'text-slate-600' : 'text-slate-300';
  const crestStroke = isDark ? '#0B192C' : '#FFFFFF';
  const goldColor = '#C5A059';

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16'
  };

  const titleSizes = {
    sm: 'text-sm font-bold tracking-wider',
    md: 'text-base lg:text-lg font-bold tracking-wider',
    lg: 'text-xl lg:text-2xl font-bold tracking-widest'
  };

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Official Institutional Crest / Seal SVG */}
      <div className={`relative flex-shrink-0 ${iconSizes[size]} flex items-center justify-center`}>
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Outer Shield / Crest Border */}
          <path
            d="M50 5 L88 20 C88 56 68 85 50 95 C32 85 12 56 12 20 Z"
            fill={isDark ? '#0B192C' : '#0F223D'}
            stroke={goldColor}
            strokeWidth="3.5"
          />
          {/* Inner Inscribed Shield */}
          <path
            d="M50 12 L82 24 C82 52 65 77 50 86 C35 77 18 52 18 24 Z"
            fill="none"
            stroke={goldColor}
            strokeWidth="1.2"
            strokeDasharray="2 1"
          />
          {/* Open Book of Academic Distinction */}
          <path
            d="M32 50 C40 46 48 48 50 53 C52 48 60 46 68 50 L68 64 C60 60 52 62 50 67 C48 62 40 60 32 64 Z"
            fill="#FFFFFF"
            stroke={crestStroke}
            strokeWidth="1.5"
          />
          {/* Central Flame / Torch of Wisdom */}
          <path
            d="M50 22 C47 28 44 32 46 36 C48 40 52 40 54 36 C56 32 53 28 50 22 Z"
            fill={goldColor}
          />
          <circle cx="50" cy="38" r="1.5" fill="#FFFFFF" />
          {/* Stylized Laurels */}
          <path
            d="M26 34 C24 38 24 43 27 47 M74 34 C76 38 76 43 73 47"
            stroke={goldColor}
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Foundation Banner Arc */}
          <path
            d="M32 76 C42 81 58 81 68 76"
            stroke={goldColor}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col leading-tight">
        <span className={`font-institutional-crest ${titleSizes[size]} ${textColor} uppercase tracking-[0.14em]`}>
          JAYA GROUP
        </span>
        <span className="font-institutional-crest text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C5A059]">
          OF INSTITUTIONS
        </span>
        {showTagline && size !== 'sm' && (
          <span className={`text-[9.5px] uppercase tracking-widest mt-0.5 font-medium ${subtitleColor}`}>
            Est. 1977 • Thiruninravur, Chennai
          </span>
        )}
      </div>
    </div>
  );
};
