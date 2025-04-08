import React from 'react';

interface MedievalIconProps {
  type: 'sword' | 'castle' | 'scroll' | 'crown' | 'fleurDeLis' | 'column';
  className?: string;
}

const MedievalIcon: React.FC<MedievalIconProps> = ({ type, className = "w-12 h-12" }) => {
  const icons = {
    sword: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M20 4L4 20M19.2 8.5L15.5 4.8M4.8 15.5L8.5 19.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 6L18 10M6.5 17.5L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M19 5L21 3M3 21L5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    castle: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M4 21H20M6 21V11M18 21V11M6 11V7L12 4L18 7V11" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M9 21V17H15V21M10 11H14M10 14H14" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 7H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    scroll: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M19 5V16.5C19 17.8807 17.8807 19 16.5 19C15.1193 19 14 17.8807 14 16.5V5C14 3.89543 14.8954 3 16 3H17C18.1046 3 19 3.89543 19 5Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M14 5H6C4.89543 5 4 5.89543 4 7V19C4 20.1046 4.89543 21 6 21H16.5" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 9H11M7 13H11M7 17H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    crown: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M3 9L7 7L12 12L17 7L21 9L19 18H5L3 9Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M5 18H19V21H5V18Z" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="7" cy="7" r="1" fill="currentColor"/>
        <circle cx="17" cy="7" r="1" fill="currentColor"/>
      </svg>
    ),
    fleurDeLis: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 3V21M12 3C10 5 8 6 8 8C8 10 10 11 12 11C14 11 16 10 16 8C16 6 14 5 12 3Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12 11C10 13 7 14 7 16C7 18 9 19 12 19C15 19 17 18 17 16C17 14 14 13 12 11Z" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    column: (
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M6 3H18M6 21H18" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="8" y="3" width="8" height="18" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 7H16M8 17H16" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    )
  };

  return (
    <div className="text-amber-200">
      {icons[type]}
    </div>
  );
};

export default MedievalIcon; 