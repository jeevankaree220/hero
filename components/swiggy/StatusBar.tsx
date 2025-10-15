import React from 'react'

export const StatusBar = () => {
  return (
    <div className="flex justify-between items-center px-4 pt-2 pb-1 text-[#282C3F] text-xs font-medium bg-white">
      <span>12:30</span>
      <div className="flex items-center gap-2">
        {/* Signal Icon */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <rect x="0" y="8" width="2" height="4" fill="currentColor"/>
          <rect x="3" y="6" width="2" height="6" fill="currentColor"/>
          <rect x="6" y="4" width="2" height="8" fill="currentColor"/>
          <rect x="9" y="2" width="2" height="10" fill="currentColor"/>
          <rect x="12" y="0" width="2" height="12" fill="currentColor"/>
        </svg>
        
        {/* WiFi Icon */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 12C8.55228 12 9 11.5523 9 11C9 10.4477 8.55228 10 8 10C7.44772 10 7 10.4477 7 11C7 11.5523 7.44772 12 8 12Z" fill="currentColor"/>
          <path d="M5.5 8.5C6.5 7.5 7.5 7 8 7C8.5 7 9.5 7.5 10.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M3 5.5C5 3.5 6.5 3 8 3C9.5 3 11 3.5 13 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        
        {/* Battery Icon */}
        <div className="flex items-center">
          <div className="w-5 h-2.5 border border-current rounded-sm relative">
            <div className="absolute inset-0.5 bg-current rounded-sm" style={{width: '80%'}}></div>
          </div>
          <div className="w-0.5 h-1.5 bg-current rounded-r"></div>
        </div>
      </div>
    </div>
  )
}

