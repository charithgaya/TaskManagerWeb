import React from 'react';

function IconStopwatch({ stroke = "currentColor" }: { stroke?: string }) {
  return (
    <svg width='20' height='20' viewBox="0 0 24 24" fill="none" className="text-muted-foreground">
      <circle cx="12" cy="13" r="8" stroke={stroke} strokeWidth="2" />
      <path
        d="M12 9V13L15 15"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 2H15"
        stroke={stroke}
        strokeWidth="2"
      />
    </svg>
  )
}

export default IconStopwatch;
