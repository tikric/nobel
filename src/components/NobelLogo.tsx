import React from 'react';
import logoAsset from '@/assets/images/logo.png';

interface NobelLogoProps {
  className?: string;
  isDarkTheme?: boolean;
}

export default function NobelLogo({ className = "h-8", isDarkTheme = false }: NobelLogoProps) {
  return (
    <img 
      src={logoAsset} 
      alt="Contabilidade Nobel" 
      className={`${className} object-contain`}
      referrerPolicy="no-referrer"
    />
  );
}
