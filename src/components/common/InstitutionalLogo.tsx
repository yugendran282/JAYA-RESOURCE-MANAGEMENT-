import React from 'react';

interface InstitutionalLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  showText?: boolean;
  className?: string;
  subTitle?: string;
}

export const InstitutionalLogo: React.FC<InstitutionalLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showTagline = true,
  showText = true,
  className = '',
  subTitle
}) => {
  const isDarkBg = variant === 'light'; // Light text for dark navy background
  const textColor = isDarkBg ? 'text-white' : 'text-[#0B192C]';
  const subtitleColor = isDarkBg ? 'text-slate-300' : 'text-slate-600';
  const goldColor = '#C5A059';

  // Responsive, aspect-ratio-preserving heights for the official lighthouse emblem
  const imageSizes = {
    sm: 'h-8 sm:h-9 max-w-[42px]',
    md: 'h-11 sm:h-12 max-w-[56px]',
    lg: 'h-14 sm:h-16 max-w-[76px]',
    xl: 'h-20 sm:h-24 max-w-[110px]'
  };

  const titleSizes = {
    sm: 'text-xs sm:text-sm font-bold tracking-[0.14em]',
    md: 'text-sm sm:text-base lg:text-lg font-bold tracking-[0.16em]',
    lg: 'text-lg sm:text-xl lg:text-2xl font-bold tracking-[0.18em]',
    xl: 'text-2xl sm:text-3xl font-bold tracking-[0.20em]'
  };

  const subTitleSizes = {
    sm: 'text-[9px] sm:text-[10px] tracking-[0.20em]',
    md: 'text-[10px] sm:text-[11px] tracking-[0.24em]',
    lg: 'text-xs tracking-[0.26em]',
    xl: 'text-sm tracking-[0.28em]'
  };

  return (
    <div className={`inline-flex items-center gap-3 sm:gap-4 select-none ${className}`}>
      {/* Official JAYA Education Trust Lighthouse Logo */}
      <div className={`relative shrink-0 flex items-center justify-center ${imageSizes[size]}`}>
        <img
          src="/images/jaya-education-trust-logo.png"
          alt="JAYA Educational Trust Official Lighthouse Crest"
          className={`w-full h-full object-contain ${
            isDarkBg ? 'drop-shadow-[0_2px_8px_rgba(197,160,89,0.3)]' : 'drop-shadow-xs'
          }`}
          loading="eager"
        />
      </div>

      {/* Institutional Typography */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`font-institutional-crest ${titleSizes[size]} ${textColor} uppercase transition-colors`}>
            JAYA GROUP
          </span>
          <span className={`font-institutional-crest ${subTitleSizes[size]} font-semibold uppercase text-[#C5A059]`}>
            OF INSTITUTIONS
          </span>
          {showTagline && size !== 'sm' && (
            <span className={`text-[9px] sm:text-[10px] uppercase tracking-wider mt-0.5 font-medium ${subtitleColor}`}>
              {subTitle || 'Est. 1977 • Chennai, Tamil Nadu • "Your Success is Our Service"'}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
