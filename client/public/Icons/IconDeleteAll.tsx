"use client";
import React from 'react'

function IconDeleteAll({ stroke = "currentColor" }: { stroke?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width="18"
      height="22"
      viewBox="0 0 24 24"
    >
      <path
        d="M3 6h18M8 6V4h8v2m-9 0v14h10V6M10 10v6M14 10v6"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default IconDeleteAll;
