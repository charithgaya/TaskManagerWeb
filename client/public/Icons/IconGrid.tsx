import React from 'react';

function IconGrid({ stroke = "currentColor" }: { stroke?: string }) {
  return (
    <svg width='20' height='20' viewBox="0 0 20 20" fill="none" className='text-muted-foreground'>
      <rect x="2" y="2" width="6" height="6" stroke="currentColor" strokeWidth="2"/>
      <rect x="12" y="2" width="6" height="6" stroke="currentColor" strokeWidth="2"/>
      <rect x="2" y="12" width="6" height="6" stroke="currentColor" strokeWidth="2"/>
      <rect x="12" y="12" width="6" height="6" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
}

export default IconGrid;
