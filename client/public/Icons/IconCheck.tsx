import React from 'react';

function IconCheck({ stroke = "currentColor" }: { stroke?: string }) {
  return (
    <svg width='20' height='20' viewBox="0 0 24 24" fill="none" className="text-muted-foreground">
      <circle cx="12" cy="12" r="10" stroke={stroke} strokeWidth="2" />
      <path
        d="M8 12L11 15L16 9"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default IconCheck;
