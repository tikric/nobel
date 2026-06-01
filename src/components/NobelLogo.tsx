import React from 'react';
import logoAsset from '@/assets/images/nobel_logo_1780349909238.png';

interface NobelLogoProps {
  className?: string;
  isDarkTheme?: boolean;
}

export default function NobelLogo({ className = "h-8", isDarkTheme = false }: NobelLogoProps) {
  const [logoSrcIdx, setLogoSrcIdx] = React.useState(0);
  
  const possiblePaths = [
    "./imagens/logo.png",
    "imagens/logo.png",
    "/nobel/imagens/logo.png",
    "./imagens/logo.PNG",
    "imagens/logo.PNG",
    "/nobel/imagens/logo.PNG",
    "./imagens/Logo.png",
    "imagens/Logo.png",
    logoAsset, // The bundled relative asset compiled by Vite 
    "/imagens/logo.png"
  ];

  const currentSrc = possiblePaths[logoSrcIdx];

  if (logoSrcIdx < possiblePaths.length) {
    return (
      <img 
        src={currentSrc} 
        alt="Contabilidade Nobel" 
        className={`${className} object-contain`}
        onError={() => setLogoSrcIdx(prev => prev + 1)}
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <svg 
      viewBox="0 0 600 200" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoCircleGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#439366" />
          <stop offset="100%" stopColor="#0C3E26" />
        </linearGradient>
      </defs>
      
      {/* Outer split circle segments representing the monogram container */}
      {/* Left split crescent arc */}
      <path 
        d="M 125 15 A 110 110 0 1 0 250 145 L 222 135 A 80 80 0 1 1 125 45 Z" 
        fill="url(#logoCircleGreen)" 
      />
      {/* Right split crescent / tail arcs */}
      <path 
        d="M 190 5 A 110 110 0 0 1 295 110 L 267 110 A 80 80 0 0 0 190 35 Z" 
        fill="url(#logoCircleGreen)" 
      />
      <path 
        d="M 293 110 A 110 110 0 0 1 190 215 L 190 185 A 80 80 0 0 0 265 110 Z" 
        fill="url(#logoCircleGreen)" 
      />

      {/* Stylized sharp letter 'N' intersecting the circle */}
      <path d="M 98 62 L 126 62 L 126 190 L 98 190 Z" fill="#0C3E26" />
      <path d="M 246 48 L 274 48 L 274 163 L 246 163 Z" fill="#0C3E26" />
      <path d="M 126 62 L 274 163 L 246 182 L 98 81 Z" fill="url(#logoCircleGreen)" />

      {/* Corporate label: "CONTABILIDADE" on top right in italic cap style */}
      <text 
        x="315" 
        y="93" 
        fill="#439366" 
        fontSize="40" 
        fontWeight="800" 
        fontStyle="italic" 
        fontFamily="sans-serif, system-ui" 
        letterSpacing="2"
      >
        CONTABILIDADE
      </text>
      
      {/* Brand: "nobel" below in deep neutral color (black/slate in light mode; changes to pure white in dark mode) */}
      <text 
        x="315" 
        y="158" 
        fill={isDarkTheme ? "#FFFFFF" : "#1F2937"} 
        fontSize="86" 
        fontWeight="900" 
        fontStyle="italic" 
        fontFamily="sans-serif, system-ui" 
        letterSpacing="-1"
      >
        nobel
      </text>
    </svg>
  );
}
