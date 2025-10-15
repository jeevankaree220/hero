import React from 'react'
import { Home, UtensilsCrossed, ShoppingBag, Search, User } from 'lucide-react'

interface BottomNavProps {
  active: 'swiggy' | 'food' | 'instamart' | 'search' | 'account'
  onNavigate: (screen: 'swiggy' | 'food' | 'instamart' | 'search' | 'account') => void
}

export const BottomNav: React.FC<BottomNavProps> = ({ active, onNavigate }) => {
  const items = [
    { id: 'swiggy' as const, icon: Home, label: 'SWIGGY' },
    { id: 'food' as const, icon: UtensilsCrossed, label: 'FOOD' },
    { id: 'instamart' as const, icon: ShoppingBag, label: 'INSTAMART' },
    { id: 'search' as const, icon: Search, label: 'SEARCH' },
    { id: 'account' as const, icon: User, label: 'ACCOUNT' }
  ]
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E9E9EB] flex items-center justify-around py-2 px-2">
      {items.map((item) => {
        const Icon = item.icon
        const isActive = active === item.id
        
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="flex flex-col items-center justify-center flex-1 py-1"
          >
            <Icon 
              className={`w-5 h-5 mb-0.5 ${isActive ? 'text-[#282C3F]' : 'text-[#7E808C]'}`}
              strokeWidth={isActive ? 2.5 : 2}
            />
            <span className={`text-[9px] font-medium ${isActive ? 'text-[#282C3F]' : 'text-[#7E808C]'}`}>
              {item.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

