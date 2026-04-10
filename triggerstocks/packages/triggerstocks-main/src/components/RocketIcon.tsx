
import React from 'react';

export const RocketIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <filter id="rocketGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    
    <path 
      d="M32 58C32 58 24 50 24 44C24 39.5817 27.5817 36 32 36C36.4183 36 40 39.5817 40 44C40 50 32 58 32 58Z" 
      fill="#38AECC" 
      fillOpacity="0.5"
    />
    <path 
      d="M32 52C32 52 28 48 28 44C28 41.7909 29.7909 40 32 40C34.2091 40 36 41.7909 36 44C36 48 32 52 32 52Z" 
      fill="#38AECC" 
    />
    
    <path 
      d="M32 4C32 4 18 18 18 34V46H46V34C46 18 32 4 32 4Z" 
      stroke="#EAF2F7" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    
    <path 
      d="M18 38L10 46H18V38Z" 
      stroke="#EAF2F7" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    <path 
      d="M46 38L54 46H46V38Z" 
      stroke="#EAF2F7" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    
    <circle cx="32" cy="22" r="4" stroke="#38AECC" strokeWidth="2.5" />
  </svg>
);

export default RocketIcon;
