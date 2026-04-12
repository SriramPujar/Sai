import React from 'react';

export const SaiBabaPortrait: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F5E6D3" />
        <stop offset="100%" stopColor="#E8D4BC" />
      </linearGradient>
      <linearGradient id="robe" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8B4513" />
        <stop offset="100%" stopColor="#654321" />
      </linearGradient>
      <linearGradient id="skin" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#D4A574" />
        <stop offset="100%" stopColor="#C4956A" />
      </linearGradient>
    </defs>
    <rect width="400" height="500" fill="url(#bg)" />
    <ellipse cx="200" cy="180" rx="85" ry="100" fill="url(#skin)" />
    <ellipse cx="200" cy="160" rx="75" ry="70" fill="#2C1810" />
    <ellipse cx="200" cy="150" rx="60" ry="50" fill="url(#skin)" />
    <circle cx="175" cy="140" r="8" fill="#1a1a1a" />
    <circle cx="225" cy="140" r="8" fill="#1a1a1a" />
    <circle cx="177" cy="138" r="3" fill="#fff" />
    <circle cx="227" cy="138" r="3" fill="#fff" />
    <ellipse cx="200" cy="165" rx="12" ry="8" fill="#C4956A" />
    <path d="M185 185 Q200 195 215 185" stroke="#8B4513" strokeWidth="3" fill="none" />
    <rect x="140" y="250" width="120" height="200" rx="20" fill="url(#robe)" />
    <rect x="160" y="280" width="80" height="60" fill="#F5E6D3" />
    <text x="200" y="315" textAnchor="middle" fill="#3E2723" fontSize="14" fontFamily="serif">श्री साई बाबा</text>
    <path d="M100 280 L140 260 L140 450 L100 450 Z" fill="url(#robe)" />
    <path d="M300 280 L260 260 L260 450 L300 450 Z" fill="url(#robe)" />
    <ellipse cx="200" cy="480" rx="100" ry="30" fill="#3E2723" />
    <circle cx="320" cy="100" r="25" fill="#FFD700" opacity="0.6" />
    <circle cx="80" cy="120" r="20" fill="#FFD700" opacity="0.4" />
    <circle cx="350" cy="180" r="15" fill="#FFD700" opacity="0.3" />
  </svg>
);

export const SaiBabaStatue: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF9933" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#FFF8DC" />
      </linearGradient>
    </defs>
    <rect width="400" height="500" fill="url(#bg2)" />
    <rect x="150" y="400" width="100" height="100" fill="#8B4513" />
    <rect x="130" y="380" width="140" height="30" fill="#A0522D" />
    <ellipse cx="200" cy="250" rx="60" ry="80" fill="#DEB887" />
    <ellipse cx="200" cy="220" rx="50" ry="55" fill="#8B4513" />
    <ellipse cx="200" cy="210" rx="40" ry="40" fill="#DEB887" />
    <circle cx="185" cy="200" r="5" fill="#1a1a1a" />
    <circle cx="215" cy="200" r="5" fill="#1a1a1a" />
    <path d="M190 225 Q200 230 210 225" stroke="#8B4513" strokeWidth="2" fill="none" />
    <rect x="170" y="320" width="60" height="50" fill="#FFF8DC" />
    <text x="200" y="355" textAnchor="middle" fill="#8B4513" fontSize="10" fontFamily="serif">साई बाबा</text>
    <ellipse cx="140" cy="280" rx="15" ry="40" fill="#DEB887" />
    <ellipse cx="260" cy="280" rx="15" ry="40" fill="#DEB887" />
    <circle cx="200" cy="100" r="30" fill="#FFD700" opacity="0.5" />
    <circle cx="200" cy="100" r="20" fill="#FF6600" opacity="0.6" />
  </svg>
);

export const ShirdiTemple: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#87CEEB" />
        <stop offset="100%" stopColor="#FFE4B5" />
      </linearGradient>
    </defs>
    <rect width="400" height="500" fill="url(#sky)" />
    <rect x="0" y="350" width="400" height="150" fill="#DEB887" />
    <rect x="50" y="150" width="300" height="200" fill="#F5DEB3" />
    <polygon points="200,50 100,150 300,150" fill="#CD853F" />
    <rect x="80" y="200" width="40" height="80" fill="#8B4513" />
    <rect x="150" y="200" width="40" height="80" fill="#8B4513" />
    <rect x="210" y="200" width="40" height="80" fill="#8B4513" />
    <rect x="280" y="200" width="40" height="80" fill="#8B4513" />
    <rect x="170" y="280" width="60" height="70" fill="#654321" />
    <circle cx="200" cy="120" r="25" fill="#FFD700" opacity="0.7" />
    <circle cx="200" cy="120" r="15" fill="#FF6600" />
    <rect x="120" y="350" width="160" height="10" fill="#8B4513" />
    <ellipse cx="350" cy="100" rx="20" ry="20" fill="#FFFFFF" opacity="0.8" />
    <ellipse cx="50" cy="80" rx="30" ry="30" fill="#FFFFFF" opacity="0.6" />
    <circle cx="80" cy="400" r="15" fill="#228B22" />
    <circle cx="320" cy="420" r="20" fill="#228B22" />
    <circle cx="350" cy="380" r="12" fill="#228B22" />
  </svg>
);
