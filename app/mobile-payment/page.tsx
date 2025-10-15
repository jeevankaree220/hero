'use client'

import React, { useState, useEffect } from 'react'
import { ArrowLeft, MapPin, Search, ChevronDown, Star, Plus, Minus, X, Check, Heart, Clock, Navigation, CheckCircle2, ChevronRight, User } from 'lucide-react'
import { StatusBar } from '@/components/swiggy/StatusBar'
import { BottomNav } from '@/components/swiggy/BottomNav'
import { CircularTimer } from '@/components/swiggy/CircularTimer'
import { GooglePayIcon, PaytmIcon, PhonePeIcon, VisaIcon, WalletIcon, BankIcon, CashIcon } from '@/components/swiggy/PaymentIcons'
import { Button } from '@/components/ui/button'
import { 
  restaurants, 
  locations, 
  paymentMethods, 
  deliveryPerson, 
  addOns,
  type Restaurant, 
  type MenuItem, 
  type CartItem,
  type Location 
} from '@/lib/swiggyData'
import { formatPrice, calculateItemTotal, calculateCartTotal, calculateTax, calculateDiscount, calculateGrandTotal, generateOrderId } from '@/lib/swiggyUtils'

type Screen = 'location' | 'home' | 'restaurants-home' | 'instamart-home' | 'search' | 'restaurant' | 'cart' | 'address' | 'payment' | 'upi-timer' | 'tracking' | 'rating' | 'account'

export default function SwiggyApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('location')
  const [selectedLocation, setSelectedLocation] = useState<Location>(locations[0])
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [showItemModal, setShowItemModal] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchType, setSearchType] = useState<'restaurants' | 'dishes'>('restaurants')
  const [vegOnly, setVegOnly] = useState(false)
  const [sortBy, setSortBy] = useState('relevance')
  const [selectedSize, setSelectedSize] = useState<{name: string; price: number} | null>(null)
  const [selectedBeverages, setSelectedBeverages] = useState<{name: string; price: number}[]>([])
  const [selectedToppings, setSelectedToppings] = useState<{name: string; price: number}[]>([])
  const [selectedPayment, setSelectedPayment] = useState<string>('')
  const [cvv, setCvv] = useState('')
  const [orderId, setOrderId] = useState('')
  const [deliveryTime, setDeliveryTime] = useState(0)
  const [rating, setRating] = useState(0)
  const [bottomNavActive, setBottomNavActive] = useState<'swiggy' | 'food' | 'instamart' | 'search' | 'account'>('food')

  // Location Selection Screen
  const LocationScreen = () => (
    <div className="flex flex-col h-full bg-white">
      <StatusBar />
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h1 className="text-xl font-bold text-[#282C3F] mb-6">MANAGE ADDRESSES</h1>
          <h2 className="text-xs font-semibold text-[#7E808C] mb-4">SAVED ADDRESSES</h2>
          
          {locations.map((location) => (
            <div key={location.id} className="mb-4 pb-4 border-b border-[#E9E9EB] last:border-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-[#282C3F] text-base mb-1">{location.label}</h3>
                  <p className="text-sm text-[#7E808C] leading-relaxed">{location.address}</p>
                </div>
              </div>
              <div className="flex gap-6 mt-3">
                <button 
                  className="text-[#FC8019] font-semibold text-sm"
                  onClick={() => {
                    setSelectedLocation(location)
                    setCurrentScreen('home')
                  }}
                >
                  SELECT
                </button>
                <button className="text-[#FC8019] font-semibold text-sm">EDIT</button>
                <button className="text-[#FC8019] font-semibold text-sm">DELETE</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Home Screen - Restaurant Listing
  const HomeScreen = () => (
    <div className="flex flex-col h-full bg-[#F8F8F8]">
      <StatusBar />
      
      {/* Header */}
      <div className="px-4 pt-3 pb-3 bg-white">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2" onClick={() => setCurrentScreen('location')}>
            <MapPin className="w-5 h-5 text-[#282C3F]" fill="currentColor" />
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-[#282C3F] text-base">{selectedLocation.label}</span>
                <ChevronDown className="w-4 h-4 text-[#282C3F]" />
              </div>
              <p className="text-xs text-[#7E808C] truncate max-w-[200px]">{selectedLocation.address.split(',')[0]}</p>
            </div>
          </div>
          <button className="flex items-center gap-1 text-[#FC8019]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm font-medium">Offers</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-16">
        {/* Category Cards */}
        <div className="px-4 pt-4 pb-4 bg-white">
          <div className="grid grid-cols-2 gap-3">
            {/* Restaurants Card */}
            <div 
              className="bg-white rounded-2xl p-4 shadow-sm border border-[#E9E9EB] relative overflow-hidden cursor-pointer"
              onClick={() => setCurrentScreen('restaurants-home')}
            >
              <h3 className="font-bold text-[#282C3F] text-lg mb-1">Restaurants</h3>
              <p className="text-xs text-[#7E808C] mb-3">Enjoy your<br/>favourite treats</p>
              <div className="absolute right-0 bottom-0 w-24 h-24">
                <img 
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop" 
                  alt="Food"
                  className="w-full h-full object-cover rounded-tl-3xl"
                />
              </div>
              <button className="mt-8">
                <svg className="w-5 h-5 text-[#282C3F]" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            {/* Instamart Card */}
            <div 
              className="bg-white rounded-2xl p-4 shadow-sm border border-[#E9E9EB] relative overflow-hidden cursor-pointer"
              onClick={() => setCurrentScreen('instamart-home')}
            >
              <h3 className="font-bold text-[#282C3F] text-lg mb-1">Instamart</h3>
              <p className="text-xs text-[#7E808C] mb-3">Groceries in under<br/>30 mins</p>
              <div className="absolute right-0 bottom-0 w-24 h-24">
                <img 
                  src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=200&h=200&fit=crop" 
                  alt="Groceries"
                  className="w-full h-full object-cover rounded-tl-3xl"
                />
              </div>
              <button className="mt-8">
                <svg className="w-5 h-5 text-[#282C3F]" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Top Picks For You */}
        <div className="px-4 pt-6 pb-4 bg-[#F8F8F8]">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-[#FC8019]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 7H17V9H7V7ZM7 11H17V13H7V11ZM7 15H17V17H7V15Z"/>
            </svg>
            <h2 className="font-bold text-[#282C3F] text-lg">Top Picks For You</h2>
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-2">
            {restaurants.slice(0, 4).map((restaurant, idx) => (
              <div 
                key={restaurant.id}
                className="min-w-[160px] cursor-pointer"
                onClick={() => {
                  setSelectedRestaurant(restaurant)
                  setCurrentScreen('restaurant')
                }}
              >
                <div className="relative rounded-2xl overflow-hidden mb-2">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  {idx === 0 && (
                    <div className="absolute top-2 left-2 bg-white/90 text-[#282C3F] px-2 py-0.5 rounded text-xs font-bold">
                      Ad
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2">
                    <div className="bg-[#FC8019] text-white px-2 py-1 rounded text-xs font-bold">
                      {restaurant.offers[0]?.includes('125') ? '₹125 OFF' : '30% OFF'}
                    </div>
                    <p className="text-white text-[10px] mt-0.5">• UPTO ₹75 •</p>
                  </div>
                </div>
                <h3 className="font-semibold text-[#282C3F] text-sm truncate">{restaurant.name.split(' - ')[0]}...</h3>
                <p className="text-xs text-[#7E808C]">{restaurant.deliveryTime.split(' ')[0]} mins</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Today's Featured */}
        <div className="px-4 pt-6 pb-4 bg-[#F8F8F8]">
          <h2 className="font-bold text-[#282C3F] text-lg mb-4">Today's Featured</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {/* Chinese Specials Banner */}
            <div className="min-w-[280px] rounded-2xl overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-[#8B4513] to-[#A0522D] p-6 relative">
                <h3 className="text-white font-bold text-sm mb-1">CHINESE SPECIALS</h3>
                <p className="text-white text-xs mb-4">Explore The Authentic<br/>Chinese Cuisine!</p>
                <button className="bg-white text-[#8B4513] px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                  ORDER NOW
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 5L16 12L9 19"/>
                  </svg>
                </button>
                <div className="absolute right-0 top-0 w-32 h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=300&fit=crop" 
                    alt="Chinese food"
                    className="w-full h-full object-cover opacity-40"
                  />
                </div>
              </div>
            </div>
            
            {/* Biryani Banner */}
            <div className="min-w-[280px] rounded-2xl overflow-hidden shadow-md">
              <div className="bg-gradient-to-r from-[#DC143C] to-[#B22222] p-6 relative">
                <h3 className="text-white font-bold text-sm mb-1">BIRYANI</h3>
                <p className="text-white text-xs mb-4">Treat Yourself To<br/>Biryani Bliss!</p>
                <button className="bg-white text-[#DC143C] px-4 py-1.5 rounded-full text-xs font-bold">
                  TRY NOW
                </button>
                <div className="absolute right-0 top-0 w-32 h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&h=300&fit=crop" 
                    alt="Biryani"
                    className="w-full h-full object-cover opacity-40"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Carousel Dots */}
          <div className="flex justify-center gap-1.5 mt-3">
            <div className="w-2 h-2 rounded-full bg-[#282C3F]"></div>
            <div className="w-2 h-2 rounded-full bg-[#E9E9EB]"></div>
            <div className="w-2 h-2 rounded-full bg-[#E9E9EB]"></div>
            <div className="w-2 h-2 rounded-full bg-[#E9E9EB]"></div>
            <div className="w-2 h-2 rounded-full bg-[#E9E9EB]"></div>
            <div className="w-2 h-2 rounded-full bg-[#E9E9EB]"></div>
          </div>
        </div>
        
        {/* Offers For You */}
        <div className="px-4 pt-6 pb-4 bg-[#F8F8F8]">
          <h2 className="font-bold text-[#282C3F] text-lg mb-4">Offers For You</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {/* Offer 1 */}
            <div className="min-w-[160px] rounded-2xl overflow-hidden shadow-sm bg-gradient-to-br from-[#D1F2EB] to-[#A3E4D7]">
              <div className="p-4">
                <p className="text-xs text-[#48C479] font-semibold mb-1">Upto</p>
                <h3 className="text-3xl font-bold text-[#00A896] mb-1">60%</h3>
                <p className="text-xs font-bold text-[#00A896] mb-3">OFF</p>
                <div className="w-10 h-10 bg-[#00A896] rounded-full flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                  </svg>
                </div>
                <p className="text-xs font-bold text-[#00A896]">Try New Tastes</p>
                <div className="absolute right-2 bottom-2 w-16 h-16">
                  <img 
                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop" 
                    alt="Burger"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Offer 2 */}
            <div className="min-w-[160px] rounded-2xl overflow-hidden shadow-sm bg-gradient-to-br from-[#F4D03F] to-[#D4A424]">
              <div className="p-4">
                <p className="text-xs text-[#8B4513] font-semibold mb-1">Upto</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-xs text-[#8B4513]">₹</span>
                  <h3 className="text-3xl font-bold text-[#8B4513]">200</h3>
                </div>
                <p className="text-xs font-bold text-[#8B4513] mb-3">OFF</p>
                <div className="w-10 h-10 bg-[#8B4513] rounded-full flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                </div>
                <p className="text-xs font-bold text-[#8B4513]">A Feast For 2</p>
                <div className="absolute right-2 bottom-2 w-16 h-16">
                  <img 
                    src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=100&h=100&fit=crop" 
                    alt="Burger"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Offer 3 */}
            <div className="min-w-[160px] rounded-2xl overflow-hidden shadow-sm bg-gradient-to-br from-[#F8BBD0] to-[#F48FB1]">
              <div className="p-4">
                <p className="text-xs text-[#C2185B] font-semibold mb-1">Upto</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-xs text-[#C2185B]">₹</span>
                  <h3 className="text-3xl font-bold text-[#C2185B]">300</h3>
                </div>
                <p className="text-xs font-bold text-[#C2185B] mb-3">OFF</p>
                <div className="w-10 h-10 bg-[#C2185B] rounded-full flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15 9L22 9L17 14L19 21L12 17L5 21L7 14L2 9L9 9L12 2Z"/>
                  </svg>
                </div>
                <p className="text-xs font-bold text-[#C2185B]">Calls For A Party</p>
                <div className="absolute right-2 bottom-2 w-16 h-16">
                  <img 
                    src="https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=100&h=100&fit=crop" 
                    alt="Burger"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* All Restaurants Nearby */}
        <div className="px-4 pt-6 pb-4 bg-[#F8F8F8]">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 text-[#282C3F]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>
            </svg>
            <h2 className="font-bold text-[#282C3F] text-lg">All Restaurants Nearby</h2>
          </div>
          <p className="text-sm text-[#7E808C] mb-4">Discover unique tastes near you</p>
          
          <div className="space-y-4">
            {restaurants.slice(0, 3).map((restaurant) => (
              <div 
                key={restaurant.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer"
                onClick={() => {
                  setSelectedRestaurant(restaurant)
                  setCurrentScreen('restaurant')
                }}
              >
                <div className="flex gap-3 p-3">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    {restaurant.offers[0] && (
                      <div className="absolute bottom-1 left-1 bg-[#FC8019] text-white px-2 py-0.5 rounded text-[10px] font-bold">
                        FLAT DEAL
                      </div>
                    )}
                    {restaurant.offers[0] && (
                      <div className="absolute bottom-1 left-1 bg-white text-[#FC8019] px-2 py-0.5 rounded text-[10px] font-bold mt-5">
                        ₹125 OFF
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#282C3F] text-base truncate">{restaurant.name}</h3>
                    <div className="flex items-center gap-2 my-1">
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4 bg-[#48C479] rounded-full flex items-center justify-center">
                          <Star className="w-2.5 h-2.5 fill-white text-white" />
                        </div>
                        <span className="text-xs font-semibold text-[#282C3F]">{restaurant.rating}</span>
                      </div>
                      <span className="text-xs text-[#7E808C]">•</span>
                      <span className="text-xs text-[#7E808C]">{restaurant.deliveryTime}</span>
                      <span className="text-xs text-[#7E808C]">•</span>
                      <span className="text-xs text-[#7E808C]">₹{restaurant.priceForTwo} for two</span>
                    </div>
                    <p className="text-xs text-[#7E808C] truncate">{restaurant.cuisines.join(', ')}</p>
                    {restaurant.offers[0] && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#FC8019] uppercase">Free Delivery</span>
                        <div className="w-12 h-4">
                          <svg viewBox="0 0 48 16" fill="none">
                            <text x="0" y="12" fontSize="10" fontWeight="bold" fill="#FC8019">one</text>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <BottomNav active="swiggy" onNavigate={(screen) => {
        setBottomNavActive(screen)
        if (screen === 'food') setCurrentScreen('restaurants-home')
        if (screen === 'instamart') setCurrentScreen('instamart-home')
        if (screen === 'search') setCurrentScreen('search')
        if (screen === 'account') setCurrentScreen('account')
      }} />
    </div>
  )

  // Restaurants Home Screen
  const RestaurantsHomeScreen = () => (
    <div className="flex flex-col h-full bg-white">
      <StatusBar />
      
      {/* Header */}
      <div className="px-4 pt-3 pb-3 bg-white border-b border-[#E9E9EB]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ArrowLeft className="w-5 h-5 text-[#282C3F] cursor-pointer" onClick={() => setCurrentScreen('home')} />
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-[#282C3F] text-base">{selectedLocation.label}</span>
                <ChevronDown className="w-4 h-4 text-[#282C3F]" />
              </div>
              <p className="text-xs text-[#7E808C] truncate max-w-[200px]">{selectedLocation.address.split(',')[0]}</p>
            </div>
          </div>
          <button className="flex items-center gap-1 text-[#FC8019]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm font-medium">Offers</span>
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pb-16">
        {/* Delivery Banner */}
        <div className="p-4">
          <div className="bg-gradient-to-r from-[#4A5FC1] to-[#667EEA] rounded-2xl p-6 relative overflow-hidden">
            <h2 className="text-white font-bold text-xl mb-1">Delivery</h2>
            <h3 className="text-white font-bold text-2xl mb-2">Under 30 Mins</h3>
            <p className="text-white text-sm mb-4">Enjoy fast delivery<br/>on your tasty dishes</p>
            <button className="bg-white text-[#4A5FC1] px-4 py-2 rounded-lg text-sm font-bold">
              ORDER NOW
            </button>
            <div className="absolute right-0 top-0 w-40 h-full">
              <img 
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop" 
                alt="Food"
                className="w-full h-full object-cover opacity-50"
              />
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#282C3F] text-white px-3 py-1 rounded-full text-xs">
              2/2
            </div>
          </div>
        </div>
        
        {/* Moksh, what's on your mind? */}
        <div className="px-4 pt-4 pb-6">
          <h2 className="font-bold text-[#282C3F] text-lg mb-4">Moksh, what's on your mind?</h2>
          <div className="grid grid-cols-5 gap-4">
            {[
              { name: 'Pizza', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&h=100&fit=crop' },
              { name: 'Noodles', img: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=100&h=100&fit=crop' },
              { name: 'Shawarma', img: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=100&h=100&fit=crop' },
              { name: 'Ice Cream', img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=100&h=100&fit=crop' },
              { name: 'Biryani', img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=100&h=100&fit=crop' },
              { name: 'Shakes', img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=100&h=100&fit=crop' },
              { name: 'Momos', img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=100&h=100&fit=crop' },
              { name: 'Cakes', img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100&h=100&fit=crop' },
              { name: 'South Indian', img: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=100&h=100&fit=crop' },
              { name: 'Paratha', img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=100&h=100&fit=crop' }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full overflow-hidden mb-1">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs text-[#282C3F] text-center">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Top restaurant chains */}
        <div className="px-4 pt-4 pb-6">
          <h2 className="font-bold text-[#282C3F] text-lg mb-4">Top restaurant chains in Bangalore</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {restaurants.slice(0, 3).map((restaurant) => (
              <div 
                key={restaurant.id}
                className="min-w-[180px] cursor-pointer"
                onClick={() => {
                  setSelectedRestaurant(restaurant)
                  setCurrentScreen('restaurant')
                }}
              >
                <div className="relative rounded-2xl overflow-hidden mb-2">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    className="w-full h-36 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-2 left-2 bg-[#FC8019] text-white px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                      <text x="2" y="18" fontSize="14" fontWeight="bold">one</text>
                    </svg>
                    Free delivery
                  </div>
                  <div className="absolute bottom-2 left-2 text-white">
                    <p className="font-bold text-sm">EVERY ITEM</p>
                    <p className="text-xs">@ ₹129</p>
                  </div>
                </div>
                <h3 className="font-bold text-[#282C3F] text-sm mb-1">{restaurant.name}</h3>
                <div className="flex items-center gap-1 mb-1">
                  <div className="w-4 h-4 bg-[#48C479] rounded-full flex items-center justify-center">
                    <Star className="w-2.5 h-2.5 fill-white text-white" />
                  </div>
                  <span className="text-xs font-semibold">{restaurant.rating}</span>
                </div>
                <p className="text-xs text-[#7E808C] truncate">{restaurant.cuisines.join(', ')}</p>
                <p className="text-xs text-[#7E808C]">{selectedLocation.area}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Restaurants with online food delivery */}
        <div className="px-4 pt-4 pb-6 bg-[#F8F8F8]">
          <h2 className="font-bold text-[#282C3F] text-lg mb-2">Restaurants with online food delivery in Bangalore</h2>
          
          {/* Filters */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            <button className="px-3 py-1.5 bg-white border border-[#E9E9EB] rounded-full text-xs flex items-center gap-1 whitespace-nowrap">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/>
              </svg>
              Filter
            </button>
            <button className="px-3 py-1.5 bg-white border border-[#E9E9EB] rounded-full text-xs flex items-center gap-1 whitespace-nowrap">
              Sort By
              <ChevronDown className="w-3 h-3" />
            </button>
            <button className="px-3 py-1.5 bg-white border border-[#E9E9EB] rounded-full text-xs whitespace-nowrap">
              Fast Delivery
            </button>
            <button className="px-3 py-1.5 bg-white border border-[#E9E9EB] rounded-full text-xs whitespace-nowrap">
              Favourite
            </button>
          </div>
          
          {/* Restaurant Cards */}
          <div className="grid grid-cols-2 gap-4">
            {restaurants.map((restaurant) => (
              <div 
                key={restaurant.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm cursor-pointer"
                onClick={() => {
                  setSelectedRestaurant(restaurant)
                  setCurrentScreen('restaurant')
                }}
              >
                <div className="relative">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  {restaurant.offers[0] && (
                    <div className="absolute top-2 left-2 bg-[#FC8019] text-white px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                        <text x="2" y="18" fontSize="14" fontWeight="bold">one</text>
                      </svg>
                      Free delivery
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 text-white">
                    <p className="font-bold text-xs">{restaurant.offers[0]?.includes('125') ? '₹125 OFF' : 'EVERY ITEM'}</p>
                    <p className="text-[10px]">{restaurant.offers[0]?.includes('125') ? 'ABOVE ₹249' : '@ ₹129'}</p>
                  </div>
                </div>
                
                <div className="p-3">
                  <h3 className="font-bold text-[#282C3F] text-sm truncate mb-1">{restaurant.name}</h3>
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-4 h-4 bg-[#48C479] rounded-full flex items-center justify-center">
                      <Star className="w-2.5 h-2.5 fill-white text-white" />
                    </div>
                    <span className="text-xs font-semibold">{restaurant.rating}</span>
                  </div>
                  <p className="text-xs text-[#7E808C] truncate">{restaurant.cuisines.slice(0, 2).join(', ')}</p>
                  <p className="text-xs text-[#7E808C]">{selectedLocation.area}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <BottomNav active="food" onNavigate={(screen) => {
        setBottomNavActive(screen)
        if (screen === 'swiggy') setCurrentScreen('home')
        if (screen === 'search') setCurrentScreen('search')
        if (screen === 'account') setCurrentScreen('account')
        if (screen === 'instamart') setCurrentScreen('instamart-home')
      }} />
    </div>
  )

  // Instamart Home Screen
  const InstamartHomeScreen = () => (
    <div className="flex flex-col h-full bg-white">
      <StatusBar />
      
      {/* Header */}
      <div className="px-4 pt-3 pb-3 bg-white border-b border-[#E9E9EB]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <ArrowLeft className="w-5 h-5 text-[#282C3F] cursor-pointer" onClick={() => setCurrentScreen('home')} />
            <div className="text-2xl font-bold bg-gradient-to-r from-[#E91E63] to-[#9C27B0] bg-clip-text text-transparent">
              instamart
            </div>
          </div>
          <button onClick={() => setCurrentScreen('search')}>
            <Search className="w-5 h-5 text-[#282C3F]" />
          </button>
        </div>
        <p className="text-xs text-[#7E808C]">
          {selectedLocation.address.split(',').slice(0, 2).join(', ')}...
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto pb-16">
        {/* Delivery Banner */}
        <div className="p-4 bg-white">
          <div className="bg-gradient-to-r from-[#E8D5FF] to-[#F3E5F5] rounded-2xl p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-[#7E808C] mb-1">Late night needs? Our Delivery</p>
              <p className="text-sm font-semibold text-[#282C3F]">Partners have you covered all night.</p>
            </div>
            <div className="w-16 h-16">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="50" r="40" fill="#E91E63" opacity="0.2"/>
                <text x="50" y="60" textAnchor="middle" fontSize="30" fill="#E91E63">🌙</text>
              </svg>
            </div>
          </div>
          
          <div className="mt-4 bg-gradient-to-r from-[#FF6B6B] to-[#EE5A6F] rounded-xl p-3 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-[#FF6B6B]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15 9L22 9L17 14L19 21L12 17L5 21L7 14L2 9L9 9L12 2Z"/>
                </svg>
              </div>
              <span className="text-sm font-semibold">Delivering in</span>
              <span className="font-bold">⚡ 12 Mins</span>
            </div>
            <span className="text-xs bg-white/20 px-2 py-1 rounded">See More</span>
          </div>
        </div>
        
        {/* Your go-to items */}
        <div className="px-4 pt-6 pb-4 bg-white">
          <h2 className="font-bold text-[#282C3F] text-lg mb-4">Your go-to items</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[
              { name: 'Coca Cola Diet Coke Can', price: '₹155', img: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=200&h=200&fit=crop', qty: '300 ml x 4' },
              { name: 'Lay\'s Hii Fi Pack', price: '₹70', img: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=200&h=200&fit=crop', qty: '160g' },
              { name: 'Red Bull Sugar Free', price: '₹125', img: 'https://images.unsplash.com/photo-1622543925917-763c34f1f161?w=200&h=200&fit=crop', qty: '250 ml' },
              { name: 'Amul Milk', price: '₹60', img: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=200&h=200&fit=crop', qty: '500 ml' }
            ].map((item, idx) => (
              <div key={idx} className="min-w-[120px] bg-white border border-[#E9E9EB] rounded-xl p-3">
                <div className="relative">
                  {idx === 0 && (
                    <div className="absolute top-0 left-0 bg-[#FC8019] text-white px-2 py-0.5 rounded text-[10px] font-bold">
                      5% OFF
                    </div>
                  )}
                  <img src={item.img} alt={item.name} className="w-full h-20 object-cover rounded-lg mb-2" />
                </div>
                <p className="text-xs font-medium text-[#282C3F] mb-1 h-8 overflow-hidden">{item.name}</p>
                <p className="text-xs text-[#7E808C] mb-2">{item.qty}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#282C3F]">{item.price}</span>
                  <button className="bg-white border border-[#48C479] text-[#48C479] px-3 py-1 rounded text-xs font-bold">
                    ADD
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Shop by category */}
        <div className="px-4 pt-6 pb-4 bg-[#F8F8F8]">
          <h2 className="font-bold text-[#282C3F] text-lg mb-4">Shop by category</h2>
          <div className="grid grid-cols-3 gap-3">
            {[
              { name: 'Fresh Vegetables', color: 'from-green-100 to-green-200', img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&h=200&fit=crop' },
              { name: 'Fresh Fruits', color: 'from-orange-100 to-orange-200', img: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=200&h=200&fit=crop' },
              { name: 'Dairy, Bread and Eggs', color: 'from-blue-100 to-blue-200', img: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=200&h=200&fit=crop' },
              { name: 'Rice, Atta and Daal', color: 'from-yellow-100 to-yellow-200', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop' },
              { name: 'Edible Oils and Ghee', color: 'from-amber-100 to-amber-200', img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&h=200&fit=crop' },
              { name: 'Masala and Dry Fruits', color: 'from-red-100 to-red-200', img: 'https://images.unsplash.com/photo-1596040033229-a0b3b7c5f08e?w=200&h=200&fit=crop' },
              { name: 'Chocolates and Ice Cream', color: 'from-pink-100 to-pink-200', img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200&h=200&fit=crop' },
              { name: 'Cold Drinks and Juices', color: 'from-cyan-100 to-cyan-200', img: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=200&h=200&fit=crop' },
              { name: 'Biscuits and Cakes', color: 'from-orange-100 to-orange-200', img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=200&h=200&fit=crop' }
            ].map((cat, idx) => (
              <div key={idx} className={`bg-gradient-to-br ${cat.color} rounded-xl p-3 h-24 flex flex-col justify-between overflow-hidden relative`}>
                <p className="text-xs font-semibold text-[#282C3F] z-10">{cat.name}</p>
                <div className="absolute right-0 bottom-0 w-16 h-16 opacity-70">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Monthly Essentials */}
        <div className="px-4 pt-6 pb-6 bg-white">
          <div className="bg-gradient-to-r from-[#FF6B6B] to-[#EE5A6F] rounded-2xl p-6 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-white font-bold text-xl mb-2">Your Monthly Essentials</h3>
              <p className="text-white text-sm mb-4">before you run out!</p>
              <button className="bg-white text-[#FF6B6B] px-6 py-2 rounded-lg font-bold text-sm">
                Refill Now & Save big!
              </button>
            </div>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-20">
              <svg className="w-32 h-32" viewBox="0 0 100 100">
                <text x="10" y="50" fontSize="60" fill="white">📦</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNav active="instamart" onNavigate={(screen) => {
        setBottomNavActive(screen)
        if (screen === 'swiggy') setCurrentScreen('home')
        if (screen === 'food') setCurrentScreen('restaurants-home')
        if (screen === 'search') setCurrentScreen('search')
        if (screen === 'account') setCurrentScreen('account')
      }} />
    </div>
  )

  // Search Screen
  const SearchScreen = () => (
    <div className="flex flex-col h-full bg-white">
      <StatusBar />
      
      {/* Search Header */}
      <div className="px-4 pt-3 pb-2 border-b border-[#E9E9EB]">
        <div className="flex items-center gap-3 mb-3">
          <ArrowLeft className="w-5 h-5 text-[#282C3F] cursor-pointer" onClick={() => setCurrentScreen('home')} />
          <div className="flex-1 bg-[#F9F9F9] rounded-lg px-3 py-2 flex items-center gap-2">
            <Search className="w-4 h-4 text-[#7E808C]" />
            <input 
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-[#282C3F] outline-none placeholder-[#7E808C]"
              autoFocus
            />
          </div>
          <X className="w-5 h-5 text-[#7E808C] cursor-pointer" onClick={() => setSearchQuery('')} />
        </div>
        
        {/* Toggle */}
        <div className="flex gap-2 mb-3">
          <button 
            className={`px-4 py-1.5 rounded-full text-sm font-medium ${searchType === 'restaurants' ? 'bg-[#282C3F] text-white' : 'bg-[#F9F9F9] text-[#7E808C]'}`}
            onClick={() => setSearchType('restaurants')}
          >
            Restaurants
          </button>
          <button 
            className={`px-4 py-1.5 rounded-full text-sm font-medium ${searchType === 'dishes' ? 'bg-[#282C3F] text-white' : 'bg-[#F9F9F9] text-[#7E808C]'}`}
            onClick={() => setSearchType('dishes')}
          >
            Dishes
          </button>
        </div>
        
        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button className="px-3 py-1 border border-[#E9E9EB] rounded-full text-xs text-[#7E808C] whitespace-nowrap">
            Sort by
          </button>
          <button className="px-3 py-1 border border-[#E9E9EB] rounded-full text-xs text-[#7E808C] whitespace-nowrap">
            Fast Delivery
          </button>
          <button className="px-3 py-1 border border-[#E9E9EB] rounded-full text-xs text-[#7E808C] whitespace-nowrap">
            Pure Veg
          </button>
          <button className="px-3 py-1 border border-[#E9E9EB] rounded-full text-xs text-[#7E808C] whitespace-nowrap">
            Rated 4+
          </button>
        </div>
      </div>
      
      {/* Search Results */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          {restaurants
            .filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .map((restaurant) => (
              <div 
                key={restaurant.id}
                className="flex gap-3 mb-4 pb-4 border-b border-[#E9E9EB] cursor-pointer"
                onClick={() => {
                  setSelectedRestaurant(restaurant)
                  setCurrentScreen('restaurant')
                }}
              >
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-[#282C3F] text-sm mb-1">{restaurant.name}</h3>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="w-3 h-3 fill-[#48C479] text-[#48C479]" />
                      <span className="font-semibold">{restaurant.rating}</span>
                    </div>
                    <span className="text-xs text-[#7E808C]">•</span>
                    <span className="text-xs text-[#7E808C]">{restaurant.deliveryTime}</span>
                  </div>
                  <p className="text-xs text-[#7E808C]">{restaurant.cuisines.join(', ')}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#7E808C]" />
              </div>
            ))}
        </div>
      </div>
    </div>
  )

  // Restaurant Detail Screen
  const RestaurantScreen = () => {
    if (!selectedRestaurant) return null
    
    return (
      <div className="flex flex-col h-full bg-white">
        <StatusBar />
        
        {/* Restaurant Header */}
        <div className="relative">
          <div className="relative h-48">
            <img 
              src={selectedRestaurant.image} 
              alt={selectedRestaurant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <ArrowLeft 
              className="absolute top-3 left-3 w-6 h-6 text-white cursor-pointer"
              onClick={() => setCurrentScreen('home')}
            />
            
            <div className="absolute bottom-3 left-3 right-3">
              <h1 className="text-white font-bold text-xl mb-1">{selectedRestaurant.name}</h1>
              <p className="text-white text-sm">{selectedRestaurant.cuisines.join(', ')}</p>
              <p className="text-white text-xs mt-1">{selectedRestaurant.distance}</p>
            </div>
          </div>
          
          {/* Info Bar */}
          <div className="flex items-center justify-around py-3 border-b border-[#E9E9EB]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#7E808C]" />
              <span className="text-sm font-semibold text-[#282C3F]">{selectedRestaurant.deliveryTime}</span>
            </div>
            <div className="w-px h-4 bg-[#E9E9EB]"></div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-[#282C3F]">₹{selectedRestaurant.priceForTwo} FOR TWO</span>
            </div>
          </div>
          
          {/* Offers */}
          {selectedRestaurant.offers.length > 0 && (
            <div className="px-4 py-3 border-b border-[#E9E9EB]">
              {selectedRestaurant.offers.map((offer, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-2 last:mb-0">
                  <div className="w-6 h-6 rounded-full bg-[#FC8019] flex items-center justify-center">
                    <span className="text-white text-xs font-bold">%</span>
                  </div>
                  <span className="text-sm font-medium text-[#282C3F]">{offer}</span>
                </div>
              ))}
            </div>
          )}
          
          {/* Veg Only Toggle */}
          <div className="px-4 py-3 flex items-center justify-between border-b border-[#E9E9EB]">
            <span className="text-sm font-medium text-[#282C3F]">Veg Only</span>
            <button 
              className={`w-12 h-6 rounded-full transition-colors ${vegOnly ? 'bg-[#48C479]' : 'bg-[#E9E9EB]'}`}
              onClick={() => setVegOnly(!vegOnly)}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${vegOnly ? 'translate-x-6' : 'translate-x-1'}`}></div>
            </button>
          </div>
        </div>
        
        {/* Menu Categories */}
        <div className="px-4 py-3 border-b border-[#E9E9EB] overflow-x-auto">
          <div className="flex gap-4">
            {selectedRestaurant.categories.map((category) => (
              <button key={category.id} className="flex items-center gap-2 whitespace-nowrap text-sm">
                <span className="font-medium text-[#282C3F]">{category.name}</span>
                <span className="text-[#7E808C]">{category.itemCount}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto pb-20">
          <div className="p-4">
            {selectedRestaurant.categories.map((category) => (
              <div key={category.id} className="mb-6">
                <h3 className="font-bold text-[#282C3F] mb-3">{category.name} ({category.itemCount})</h3>
                {category.items.map((item) => (
                  <div key={item.id} className="flex gap-3 mb-4 pb-4 border-b border-[#E9E9EB] last:border-0">
                    <div className="flex-1">
                      <div className="flex items-start gap-2 mb-1">
                        <div className={`w-4 h-4 border-2 ${item.isVeg ? 'border-[#48C479]' : 'border-[#E74C3C]'} flex items-center justify-center`}>
                          <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-[#48C479]' : 'bg-[#E74C3C]'}`}></div>
                        </div>
                        <h4 className="font-semibold text-[#282C3F] text-sm flex-1">{item.name}</h4>
                      </div>
                      <p className="text-xs text-[#7E808C] mb-2">{item.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#282C3F]">₹{item.price}</span>
                        {item.rating && (
                          <div className="flex items-center gap-1 text-xs">
                            <Star className="w-3 h-3 fill-[#48C479] text-[#48C479]" />
                            <span className="font-semibold">{item.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      <button 
                        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white border border-[#E9E9EB] px-6 py-1 rounded text-sm font-bold text-[#48C479] shadow-sm"
                        onClick={() => {
                          setSelectedItem(item)
                          if (item.sizes || item.beverages || item.toppings) {
                            setShowItemModal(true)
                            setSelectedSize(item.sizes ? item.sizes[0] : null)
                          } else {
                            addToCart(item)
                          }
                        }}
                      >
                        ADD
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        {/* Cart Preview */}
        {cart.length > 0 && (
          <div 
            className="fixed bottom-0 left-0 right-0 bg-[#48C479] px-4 py-3 flex items-center justify-between cursor-pointer"
            onClick={() => setCurrentScreen('cart')}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="font-bold text-[#48C479]">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
              </div>
              <span className="text-white font-semibold">View Cart</span>
            </div>
            <span className="text-white font-bold">₹{calculateCartTotal(cart)}</span>
          </div>
        )}
      </div>
    )
  }

  // Item Customization Modal
  const ItemModal = () => {
    if (!selectedItem || !showItemModal) return null
    
    const calculateModalTotal = () => {
      let total = selectedSize ? selectedSize.price : selectedItem.price
      total += selectedBeverages.reduce((sum, bev) => sum + bev.price, 0)
      total += selectedToppings.reduce((sum, top) => sum + top.price, 0)
      return total
    }
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-end z-50 animate-fade-in">
        <div className="bg-white rounded-t-3xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
          <div className="sticky top-0 bg-white px-4 py-3 border-b border-[#E9E9EB] flex items-center justify-between">
            <h2 className="font-bold text-[#282C3F]">{selectedItem.name}</h2>
            <X className="w-5 h-5 cursor-pointer" onClick={() => {
              setShowItemModal(false)
              setSelectedBeverages([])
              setSelectedToppings([])
            }} />
          </div>
          
          <div className="p-4">
            <p className="text-sm font-bold text-[#282C3F] mb-1">₹{selectedSize ? selectedSize.price : selectedItem.price} - ₹{selectedItem.price + 250}</p>
            
            {/* Size Selection */}
            {selectedItem.sizes && (
              <div className="mb-6">
                <h3 className="font-semibold text-[#282C3F] mb-2">Size</h3>
                <div className="bg-[#F9F9F9] p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#282C3F]">{selectedSize?.name}</span>
                    <button className="text-[#48C479] text-sm font-semibold">CHANGE</button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Beverages */}
            {selectedItem.beverages && (
              <div className="mb-6">
                <h3 className="font-semibold text-[#282C3F] mb-2">Beverages</h3>
                {selectedItem.beverages.map((bev, idx) => (
                  <div key={idx} className={`flex items-center justify-between py-2 ${!bev.isAvailable ? 'opacity-40' : ''}`}>
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox"
                        disabled={!bev.isAvailable}
                        checked={selectedBeverages.some(b => b.name === bev.name)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedBeverages([...selectedBeverages, {name: bev.name, price: bev.price}])
                          } else {
                            setSelectedBeverages(selectedBeverages.filter(b => b.name !== bev.name))
                          }
                        }}
                        className="w-4 h-4 accent-[#48C479]"
                      />
                      <span className="text-sm text-[#282C3F]">{bev.name}</span>
                    </div>
                    <span className="text-sm text-[#282C3F]">₹{bev.price}</span>
                    {!bev.isAvailable && (
                      <span className="text-xs text-[#7E808C] ml-2">Item Not Available</span>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Toppings */}
            {selectedItem.toppings && (
              <div className="mb-6">
                <h3 className="font-semibold text-[#282C3F] mb-2">Extra Non Veg Toppings</h3>
                {selectedItem.toppings.map((top, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox"
                        checked={selectedToppings.some(t => t.name === top.name)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedToppings([...selectedToppings, {name: top.name, price: top.price}])
                          } else {
                            setSelectedToppings(selectedToppings.filter(t => t.name !== top.name))
                          }
                        }}
                        className="w-4 h-4 accent-[#48C479]"
                      />
                      <span className="text-sm text-[#282C3F]">{top.name}</span>
                    </div>
                    <span className="text-sm text-[#282C3F]">₹{top.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="sticky bottom-0 bg-white p-4 border-t border-[#E9E9EB]">
            <button 
              className="w-full bg-[#48C479] text-white py-3 rounded-lg font-bold"
              onClick={() => {
                if (selectedItem && selectedRestaurant) {
                  const cartItem: CartItem = {
                    menuItem: selectedItem,
                    restaurant: selectedRestaurant,
                    quantity: 1,
                    selectedSize: selectedSize || undefined,
                    selectedBeverages,
                    selectedToppings,
                    customizationTotal: calculateModalTotal()
                  }
                  setCart([...cart, cartItem])
                }
                setShowItemModal(false)
                setSelectedBeverages([])
                setSelectedToppings([])
              }}
            >
              ADD ITEM   Total ₹{calculateModalTotal()}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Cart Screen
  const CartScreen = () => {
    const subtotal = calculateCartTotal(cart)
    const discount = calculateDiscount(subtotal)
    const tax = calculateTax(subtotal)
    const total = subtotal + tax - discount
    
    return (
      <div className="flex flex-col h-full bg-white">
        <StatusBar />
        
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E9E9EB]">
          <ArrowLeft className="w-5 h-5 cursor-pointer" onClick={() => setCurrentScreen('restaurant')} />
          <h1 className="font-bold text-[#282C3F]">Your Cart</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {/* Savings Banner */}
          {discount > 0 && (
            <div className="bg-[#E8F5E9] px-4 py-3 flex items-center gap-2">
              <Check className="w-5 h-5 text-[#48C479]" />
              <span className="text-sm text-[#48C479] font-medium">
                ₹{discount} savings on this order
              </span>
            </div>
          )}
          
          {/* Apply Coupon */}
          <div className="px-4 py-3 border-b border-[#E9E9EB]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-[#282C3F] mb-1">Apply Coupon</h3>
                <p className="text-xs text-[#7E808C]">Save more with coupons available for you</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#7E808C]" />
            </div>
          </div>
          
          {/* Cart Items */}
          <div className="px-4 py-4">
            <h3 className="font-semibold text-[#282C3F] mb-3">Review Items</h3>
            {cart.map((item, idx) => (
              <div key={idx} className="flex gap-3 mb-4">
                <img 
                  src={item.menuItem.image} 
                  alt={item.menuItem.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-[#282C3F] text-sm mb-1">{item.menuItem.name}</h4>
                  {item.selectedSize && (
                    <p className="text-xs text-[#7E808C]">{item.selectedSize.name}</p>
                  )}
                  {item.selectedBeverages && item.selectedBeverages.length > 0 && (
                    <p className="text-xs text-[#7E808C]">{item.selectedBeverages.map(b => b.name).join(', ')}</p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2 border border-[#E9E9EB] rounded">
                    <button 
                      className="px-2 py-1 text-[#48C479] font-bold"
                      onClick={() => {
                        if (item.quantity > 1) {
                          const newCart = [...cart]
                          newCart[idx].quantity--
                          setCart(newCart)
                        } else {
                          setCart(cart.filter((_, i) => i !== idx))
                        }
                      }}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-semibold text-[#48C479]">{item.quantity}</span>
                    <button 
                      className="px-2 py-1 text-[#48C479] font-bold"
                      onClick={() => {
                        const newCart = [...cart]
                        newCart[idx].quantity++
                        setCart(newCart)
                      }}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="font-bold text-[#282C3F] text-sm">₹{calculateItemTotal(item)}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Add-ons */}
          <div className="px-4 py-4 bg-[#F9F9F9]">
            <h3 className="font-semibold text-[#282C3F] mb-3 flex items-center gap-2">
              <span>🛒</span> Your last minute add-ons
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {addOns.map((addon) => (
                <div key={addon.id} className="min-w-[120px] bg-white rounded-lg p-2 relative">
                  <div className="absolute top-1 left-1 bg-[#FC8019] text-white text-xs px-1.5 py-0.5 rounded">
                    {addon.discount} OFF
                  </div>
                  <img src={addon.image} alt={addon.name} className="w-full h-20 object-cover rounded mb-2" />
                  <p className="text-xs font-medium text-[#282C3F] truncate">{addon.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-[#282C3F]">₹{addon.price}</span>
                    <span className="text-xs text-[#7E808C] line-through">₹{addon.originalPrice}</span>
                  </div>
                  <button className="w-full mt-2 bg-white border border-[#48C479] text-[#48C479] text-xs py-1 rounded font-semibold">
                    <Plus className="w-3 h-3 inline" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Bill Details */}
          <div className="px-4 py-4">
            <h3 className="font-semibold text-[#282C3F] mb-3">Bill Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-[#7E808C]">Item Total</span>
                <span className="text-[#282C3F]">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-[#7E808C]">Discount</span>
                  <span className="text-[#48C479]">-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-[#7E808C]">Delivery Fee</span>
                <span className="text-[#282C3F]">FREE</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#7E808C]">Taxes</span>
                <span className="text-[#282C3F]">₹{tax}</span>
              </div>
              <div className="border-t border-[#E9E9EB] pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span className="text-[#282C3F]">To Pay</span>
                  <span className="text-[#282C3F]">₹{total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Delivery Address & Proceed */}
        <div className="border-t border-[#E9E9EB] p-4">
          <div 
            className="flex items-center justify-between mb-3 cursor-pointer"
            onClick={() => setCurrentScreen('address')}
          >
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-[#FC8019]" />
              <div>
                <p className="text-sm font-semibold text-[#282C3F]">Deliver to {selectedLocation.label}</p>
                <p className="text-xs text-[#7E808C]">{selectedLocation.address.substring(0, 40)}...</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#7E808C]" />
          </div>
          <button 
            className="w-full bg-[#48C479] text-white py-3 rounded-lg font-bold"
            onClick={() => setCurrentScreen('payment')}
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    )
  }

  // Address Management Screen
  const AddressScreen = () => (
    <div className="flex flex-col h-full bg-white">
      <StatusBar />
      
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E9E9EB]">
        <ArrowLeft className="w-5 h-5 cursor-pointer" onClick={() => setCurrentScreen('cart')} />
        <h1 className="font-bold text-[#282C3F]">MANAGE ADDRESSES</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-xs font-semibold text-[#7E808C] mb-4">SAVED ADDRESSES</h2>
        
        {locations.map((location) => (
          <div key={location.id} className="mb-4 pb-4 border-b border-[#E9E9EB]">
            <h3 className="font-bold text-[#282C3F] mb-1">{location.label}</h3>
            <p className="text-sm text-[#7E808C] mb-3">{location.address}</p>
            <div className="flex gap-6">
              <button 
                className="text-[#FC8019] font-semibold text-sm"
                onClick={() => {
                  setSelectedLocation(location)
                  setCurrentScreen('cart')
                }}
              >
                SELECT
              </button>
              <button className="text-[#FC8019] font-semibold text-sm">EDIT</button>
              <button className="text-[#FC8019] font-semibold text-sm">DELETE</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Payment Options Screen
  const PaymentScreen = () => {
    const total = calculateGrandTotal(cart)
    
    return (
      <div className="flex flex-col h-full bg-white">
        <StatusBar />
        
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E9E9EB]">
          <ArrowLeft className="w-5 h-5 cursor-pointer" onClick={() => setCurrentScreen('cart')} />
          <div>
            <h1 className="font-bold text-[#282C3F]">Payment Options</h1>
            <p className="text-xs text-[#7E808C]">{cart.length} items, Total: ₹{total}</p>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {/* Delivery Info */}
          <div className="px-4 py-3 bg-[#F9F9F9] border-b border-[#E9E9EB]">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#FC8019] mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#282C3F]">Instamart | MBR Building Kasavanahalli Main Rd...</p>
                <p className="text-xs text-[#7E808C]">{selectedLocation.area}</p>
                <p className="text-xs text-[#48C479] mt-1">Delivery In: 10 mins</p>
              </div>
            </div>
          </div>
          
          {/* Preferred Payment */}
          <div className="px-4 py-4 border-b border-[#E9E9EB]">
            <h3 className="font-semibold text-[#282C3F] mb-3">Preferred Payment</h3>
            <div className="bg-[#F9F9F9] rounded-lg p-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <VisaIcon />
                  <div>
                    <p className="text-sm font-semibold text-[#282C3F]">Axis Card</p>
                    <p className="text-xs text-[#7E808C]">•••••••• 1380</p>
                  </div>
                </div>
                <Check className="w-5 h-5 text-[#48C479]" />
              </div>
              <div className="flex gap-2">
                <input 
                  type="text"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  maxLength={3}
                  className="flex-1 bg-white border border-[#E9E9EB] rounded px-3 py-2 text-sm"
                />
                <button 
                  className="flex-1 bg-[#48C479] text-white rounded font-semibold text-sm py-2"
                  onClick={() => {
                    if (cvv.length === 3) {
                      setCurrentScreen('upi-timer')
                    }
                  }}
                >
                  PAY ₹{total}
                </button>
              </div>
            </div>
          </div>
          
          {/* UPI */}
          <div className="px-4 py-4 border-b border-[#E9E9EB]">
            <h3 className="font-semibold text-[#282C3F] mb-3">UPI</h3>
            <div className="space-y-3">
              {paymentMethods.filter(p => p.type === 'upi').map((method) => (
                <div key={method.id} className="flex items-center justify-between p-3 bg-[#F9F9F9] rounded-lg">
                  <div className="flex items-center gap-2">
                    <GooglePayIcon />
                    <span className="text-sm text-[#282C3F]">{method.name}</span>
                  </div>
                  <input 
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={selectedPayment === method.id}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="w-4 h-4 accent-[#48C479]"
                  />
                </div>
              ))}
              <button className="text-[#FC8019] font-semibold text-sm flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add New UPI ID
              </button>
            </div>
          </div>
          
          {/* Credit & Debit Cards */}
          <div className="px-4 py-4 border-b border-[#E9E9EB]">
            <h3 className="font-semibold text-[#282C3F] mb-3">Credit & Debit cards</h3>
            <div className="space-y-3">
              {paymentMethods.filter(p => p.type === 'card').map((method) => (
                <div key={method.id} className="flex items-center justify-between p-3 bg-[#F9F9F9] rounded-lg">
                  <div className="flex items-center gap-2">
                    <VisaIcon />
                    <div>
                      <p className="text-sm font-medium text-[#282C3F]">{method.name}</p>
                      <p className="text-xs text-[#7E808C]">{method.details}</p>
                    </div>
                  </div>
                  <input 
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={selectedPayment === method.id}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="w-4 h-4 accent-[#48C479]"
                  />
                </div>
              ))}
              <button className="text-[#FC8019] font-semibold text-sm flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add New Card
              </button>
            </div>
          </div>
          
          {/* More Payment Options */}
          <div className="px-4 py-4">
            <h3 className="font-semibold text-[#282C3F] mb-3">More Payment Options</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <WalletIcon />
                  <div>
                    <p className="text-sm font-medium text-[#282C3F]">Wallets</p>
                    <p className="text-xs text-[#7E808C]">Paytm, PhonePe, Amazon Pay & more</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#7E808C]" />
              </div>
              
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <BankIcon />
                  <div>
                    <p className="text-sm font-medium text-[#282C3F]">Netbanking</p>
                    <p className="text-xs text-[#7E808C]">Select from a list of banks</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#7E808C]" />
              </div>
              
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <CashIcon />
                  <div>
                    <p className="text-sm font-medium text-[#282C3F]">Pay on Delivery</p>
                    <p className="text-xs text-[#7E808C]">Pay in cash or pay online</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-[#7E808C]" />
              </div>
            </div>
          </div>
        </div>
        
        {selectedPayment && (
          <div className="p-4 border-t border-[#E9E9EB]">
            <button 
              className="w-full bg-[#48C479] text-white py-3 rounded-lg font-bold"
              onClick={() => setCurrentScreen('upi-timer')}
            >
              PAY ₹{total}
            </button>
          </div>
        )}
      </div>
    )
  }

  // UPI Timer Screen
  const UPITimerScreen = () => {
    return (
      <div className="flex flex-col h-full bg-white">
        <StatusBar />
        
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E9E9EB]">
          <ArrowLeft className="w-5 h-5 cursor-pointer" onClick={() => setCurrentScreen('payment')} />
          <div>
            <h1 className="font-bold text-[#282C3F]">PAYMENT DETAILS</h1>
            <p className="text-xs text-[#7E808C]">{cart.length} items, Total: ₹{calculateGrandTotal(cart)}</p>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <CircularTimer 
            initialSeconds={291}
            onComplete={() => {
              const newOrderId = generateOrderId()
              setOrderId(newOrderId)
              setDeliveryTime(35)
              setCurrentScreen('tracking')
            }}
          />
          
          <h2 className="text-center text-lg font-semibold text-[#282C3F] mt-8 mb-2">
            Open your UPI app to approve the payment request before the timer runs out
          </h2>
          
          <p className="text-center text-sm text-[#7E808C] mt-8">
            <span className="font-semibold">Note:</span> Do not hit back button or close this screen until the transaction is complete
          </p>
          
          <button 
            className="mt-12 text-[#FC8019] font-bold"
            onClick={() => setCurrentScreen('payment')}
          >
            Cancel payment
          </button>
        </div>
      </div>
    )
  }

  // Order Tracking Screen
  const TrackingScreen = () => {
    const [timeRemaining, setTimeRemaining] = useState(deliveryTime * 60)
    
    useEffect(() => {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 0) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      
      return () => clearInterval(timer)
    }, [])
    
    const minutes = Math.floor(timeRemaining / 60)
    const seconds = timeRemaining % 60
    
    return (
      <div className="flex flex-col h-full bg-white">
        <StatusBar />
        
        <div className="flex-1 overflow-y-auto">
          {/* Success Animation */}
          <div className="flex flex-col items-center justify-center py-12 bg-gradient-to-b from-[#E8F5E9] to-white">
            <div className="w-24 h-24 bg-[#48C479] rounded-full flex items-center justify-center mb-6 animate-scale-in">
              <CheckCircle2 className="w-16 h-16 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#282C3F] mb-2">Order Placed Successfully!</h1>
            <p className="text-sm text-[#7E808C]">Your order is being prepared</p>
          </div>
          
          <div className="px-4 py-6">
            {/* Order Details */}
            <div className="bg-[#F9F9F9] rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-3">
                <span className="text-sm text-[#7E808C]">Order ID</span>
                <span className="text-sm font-semibold text-[#282C3F]">{orderId}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-sm text-[#7E808C]">Total Amount</span>
                <span className="text-sm font-bold text-[#282C3F]">₹{calculateGrandTotal(cart)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#7E808C]">Estimated Delivery</span>
                <span className="text-sm font-semibold text-[#48C479]">
                  {minutes}:{String(seconds).padStart(2, '0')} mins
                </span>
              </div>
            </div>
            
            {/* Delivery Person */}
            <div className="mb-6">
              <h3 className="font-semibold text-[#282C3F] mb-3">Delivery Partner</h3>
              <div className="flex items-center gap-3 p-3 bg-[#F9F9F9] rounded-lg">
                <div className="w-12 h-12 bg-[#FC8019] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {deliveryPerson.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#282C3F]">{deliveryPerson.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-3 h-3 fill-[#FC8019] text-[#FC8019]" />
                    <span className="text-xs text-[#7E808C]">{deliveryPerson.rating} • {deliveryPerson.deliveries} deliveries</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Status */}
            <div className="mb-6">
              <h3 className="font-semibold text-[#282C3F] mb-4">Order Status</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-[#48C479] rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <div className="w-px h-12 bg-[#48C479]"></div>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="font-semibold text-[#282C3F]">Order Confirmed</p>
                    <p className="text-xs text-[#7E808C] mt-1">Your order has been received</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-[#FC8019] rounded-full flex items-center justify-center animate-pulse">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <div className="w-px h-12 bg-[#E9E9EB]"></div>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="font-semibold text-[#282C3F]">Preparing</p>
                    <p className="text-xs text-[#7E808C] mt-1">Your order is being prepared</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-[#E9E9EB] rounded-full flex items-center justify-center">
                      <Navigation className="w-4 h-4 text-[#7E808C]" />
                    </div>
                    <div className="w-px h-12 bg-[#E9E9EB]"></div>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="font-semibold text-[#7E808C]">Out for Delivery</p>
                    <p className="text-xs text-[#7E808C] mt-1">On the way to your location</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-[#E9E9EB] rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-[#7E808C]" />
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="font-semibold text-[#7E808C]">Delivered</p>
                    <p className="text-xs text-[#7E808C] mt-1">Order delivered successfully</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Map Placeholder */}
            <div className="bg-[#F9F9F9] rounded-lg h-48 flex items-center justify-center mb-6">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-[#7E808C] mx-auto mb-2" />
                <p className="text-sm text-[#7E808C]">Tracking Map</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-[#E9E9EB]">
          <button 
            className="w-full bg-[#48C479] text-white py-3 rounded-lg font-bold"
            onClick={() => setCurrentScreen('rating')}
          >
            Continue
          </button>
        </div>
      </div>
    )
  }

  // Rating Screen
  const RatingScreen = () => {
    return (
      <div className="flex flex-col h-full bg-white">
        <StatusBar />
        
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E9E9EB]">
          <h1 className="font-bold text-[#282C3F]">RATE YOUR DELIVERY</h1>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {/* Delivery Person Illustration */}
          <div className="w-48 h-48 mb-8">
            <div className="w-full h-full bg-gradient-to-br from-[#FFF3E0] to-[#FFE0B2] rounded-full flex items-center justify-center">
              <div className="w-32 h-32 bg-[#FC8019] rounded-full flex items-center justify-center">
                <User className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
          
          <p className="text-sm text-[#7E808C] mb-2">Rate your delivery by</p>
          <h2 className="text-2xl font-bold text-[#282C3F] mb-8">{deliveryPerson.name}</h2>
          
          {/* Star Rating */}
          <div className="flex gap-4 mb-12">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="transition-transform hover:scale-110"
              >
                <Star 
                  className={`w-12 h-12 ${
                    star <= rating 
                      ? 'fill-[#FC8019] text-[#FC8019]' 
                      : 'text-[#E9E9EB]'
                  }`}
                />
              </button>
            ))}
          </div>
          
          <p className="text-center text-xs text-[#7E808C] mb-8 max-w-xs">
            Your word makes Swiggy a better place.<br/>
            You are the influence!
          </p>
        </div>
        
        <div className="p-4 border-t border-[#E9E9EB]">
          <button 
            className="w-full bg-[#FC8019] text-white py-3 rounded-lg font-bold"
            onClick={() => {
              setCart([])
              setCurrentScreen('home')
            }}
          >
            Submit Rating
          </button>
        </div>
      </div>
    )
  }

  // Account Screen
  const AccountScreen = () => (
    <div className="flex flex-col h-full bg-white">
      <StatusBar />
      
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-[#FC8019] to-[#FF6F00] px-4 py-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-white font-bold text-xl">MOKSH GARG</h1>
            <p className="text-white/90 text-sm">9711898182 • mokshgarg003@gmail.com</p>
          </div>
          <button className="text-white text-sm">EDIT</button>
        </div>
        
        {/* Swiggy One Banner */}
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white font-bold">one</span>
              <span className="bg-white text-[#FC8019] text-xs px-2 py-0.5 rounded-full font-bold">ACTIVE</span>
            </div>
            <p className="text-white text-xs">₹2,233 saved in 78 days. Explore more benefits</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {/* Menu Items */}
        <div className="px-4 py-2">
          <div className="py-4 border-b border-[#E9E9EB]">
            <h3 className="font-semibold text-[#282C3F] mb-1">My Account</h3>
            <p className="text-xs text-[#7E808C]">Address, Favourites & Settings</p>
          </div>
          
          <div 
            className="py-4 border-b border-[#E9E9EB] cursor-pointer"
            onClick={() => setCurrentScreen('address')}
          >
            <h3 className="font-semibold text-[#282C3F]">Manage Address</h3>
          </div>
          
          <div className="py-4 border-b border-[#E9E9EB]">
            <h3 className="font-semibold text-[#282C3F]">Favourites</h3>
          </div>
          
          <div className="py-4 border-b border-[#E9E9EB]">
            <h3 className="font-semibold text-[#282C3F]">Settings</h3>
          </div>
          
          <div className="py-4 border-b border-[#E9E9EB]">
            <h3 className="font-semibold text-[#282C3F] mb-1">Payments & Refunds</h3>
            <p className="text-xs text-[#7E808C]">Manage your Refunds, Payment Modes</p>
          </div>
          
          <div className="py-4 border-b border-[#E9E9EB]">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[#282C3F]">Refund Status</h3>
              <span className="bg-[#FFF3E0] text-[#FC8019] text-xs px-2 py-1 rounded">1 active refund</span>
            </div>
          </div>
          
          <div className="py-4 border-b border-[#E9E9EB]">
            <h3 className="font-semibold text-[#282C3F]">Payment Modes</h3>
          </div>
          
          <div className="py-4">
            <h3 className="font-semibold text-[#282C3F] mb-1">Help</h3>
            <p className="text-xs text-[#7E808C]">FAQs & Links</p>
          </div>
        </div>
        
        {/* Past Orders */}
        <div className="px-4 py-4 bg-[#F9F9F9]">
          <h3 className="font-semibold text-[#282C3F] mb-4">PAST ORDERS</h3>
          
          <div className="flex gap-4 mb-4 border-b border-[#E9E9EB]">
            <button className="pb-2 border-b-2 border-[#FC8019] text-[#FC8019] font-semibold text-sm">
              Restaurants
            </button>
            <button className="pb-2 text-[#7E808C] text-sm">Grocery & more</button>
            <button className="pb-2 text-[#7E808C] text-sm">Dineout</button>
          </div>
          
          {/* Order Card */}
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-bold text-[#282C3F]">Grover Mithaivala</h4>
                <p className="text-xs text-[#7E808C]">NSP</p>
                <p className="text-sm font-semibold text-[#282C3F] mt-1">₹388</p>
              </div>
              <span className="text-xs text-[#48C479] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Delivered
              </span>
            </div>
            
            <p className="text-xs text-[#7E808C] mb-3">Lorem Ipsum (I)</p>
            <p className="text-xs text-[#7E808C] mb-4">Jul 20, 2023, 08:48 AM</p>
            
            <div className="flex gap-3">
              <button className="flex-1 border border-[#FC8019] text-[#FC8019] py-2 rounded font-semibold text-sm">
                REORDER
              </button>
              <button className="flex-1 border border-[#E9E9EB] text-[#282C3F] py-2 rounded font-semibold text-sm">
                RATE ORDER
              </button>
            </div>
          </div>
          
          {/* Feedback Banner */}
          <div className="bg-gradient-to-r from-[#E8D5FF] to-[#D5B8FF] rounded-lg p-4 flex items-center gap-3">
            <div className="w-16 h-16 bg-[#FC8019] rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-[#282C3F] mb-1">Give us your Delivery & Food feedback</h4>
              <p className="text-xs text-[#7E808C]">Your word makes Swiggy a better place. You are the influence!</p>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNav active={bottomNavActive} onNavigate={(screen) => {
        setBottomNavActive(screen)
        if (screen === 'food') setCurrentScreen('home')
        if (screen === 'search') setCurrentScreen('search')
      }} />
    </div>
  )

  // Helper function to add item to cart
  const addToCart = (item: MenuItem) => {
    if (selectedRestaurant) {
      const cartItem: CartItem = {
        menuItem: item,
        restaurant: selectedRestaurant,
        quantity: 1,
        customizationTotal: item.price
      }
      setCart([...cart, cartItem])
    }
  }

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-md h-screen sm:h-auto">
        {/* iPhone Frame */}
        <div className="bg-blue-100 rounded-none sm:rounded-[50px] p-0 sm:p-3 shadow-none sm:shadow-2xl h-full sm:h-auto">
          <div className="bg-white rounded-none sm:rounded-[40px] overflow-hidden h-full sm:h-[90vh] max-h-[900px] relative">
            {currentScreen === 'location' && <LocationScreen />}
            {currentScreen === 'home' && <HomeScreen />}
            {currentScreen === 'restaurants-home' && <RestaurantsHomeScreen />}
            {currentScreen === 'instamart-home' && <InstamartHomeScreen />}
            {currentScreen === 'search' && <SearchScreen />}
            {currentScreen === 'restaurant' && <RestaurantScreen />}
            {currentScreen === 'cart' && <CartScreen />}
            {currentScreen === 'address' && <AddressScreen />}
            {currentScreen === 'payment' && <PaymentScreen />}
            {currentScreen === 'upi-timer' && <UPITimerScreen />}
            {currentScreen === 'tracking' && <TrackingScreen />}
            {currentScreen === 'rating' && <RatingScreen />}
            {currentScreen === 'account' && <AccountScreen />}
            
            <ItemModal />
          </div>
        </div>
      </div>
    </div>
  )
}
