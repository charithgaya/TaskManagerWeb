import React from 'react';

function IconFileCheck({ stroke = "currentColor" }: { stroke?: string }) {
  return (
    <svg width='20' height='20' viewBox="0 0 24 24" fill="none" className="text-muted-foreground">
      <path
        d="M4 2H14L20 8V22H4V2Z"
        stroke={stroke}
        strokeWidth="2"
      />
      <path
        d="M8 14L11 17L16 12"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
    </svg>
  )
}

export default IconFileCheck;
