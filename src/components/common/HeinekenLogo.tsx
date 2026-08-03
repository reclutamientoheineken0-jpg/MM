import React from 'react';

interface HeinekenLogoProps {
  variant?: 'white' | 'green' | 'red-box' | 'corporate';
  className?: string;
  showText?: boolean;
  textSize?: string;
}

export const HeinekenLogo: React.FC<HeinekenLogoProps> = ({
  variant = 'green',
  className = '',
  showText = true,
  textSize = 'text-xl'
}) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Heineken Red Star Icon Box */}
      <div className={`flex items-center justify-center rounded-lg shadow-sm transition-transform duration-200 hover:scale-105 ${
        variant === 'white'
          ? 'w-10 h-10 bg-white text-[#bb0011]'
          : variant === 'red-box'
          ? 'w-10 h-10 bg-[#bb0011] text-white'
          : variant === 'corporate'
          ? 'w-10 h-10 bg-[#006600] text-white'
          : 'w-10 h-10 bg-[#bb0011] text-white'
      }`}>
        {/* Five-pointed Heineken style star */}
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-['Hanken_Grotesk',sans-serif] font-black tracking-tight ${textSize} ${
            variant === 'white' ? 'text-white' : 'text-[#006600]'
          }`}>
            Heineken
          </span>
          {variant === 'corporate' && (
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#6f7b69] -mt-1">
              HR MANAGEMENT
            </span>
          )}
        </div>
      )}
    </div>
  );
};
