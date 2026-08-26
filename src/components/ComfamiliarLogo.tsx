import React from 'react';

interface ComfamiliarLogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  withSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ComfamiliarLogo: React.FC<ComfamiliarLogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
}) => {
  const isLight = variant === 'light';

  // Altura proporcional exacta según el tamaño solicitado
  const heightClass = {
    sm: 'h-8 sm:h-9',
    md: 'h-11 sm:h-13',
    lg: 'h-14 sm:h-16',
    xl: 'h-18 sm:h-20',
  }[size];

  const logoSrc = isLight ? '/logo-exacto-light.png' : '/logo-exacto.png';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={logoSrc}
        alt="Vivienda Comfamiliar Risaralda"
        className={`${heightClass} w-auto object-contain transition-transform hover:scale-102 drop-shadow-sm`}
        loading="eager"
      />
    </div>
  );
};
