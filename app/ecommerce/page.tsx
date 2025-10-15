'use client'

import React, { useState, useEffect } from 'react'
import { Search, SlidersHorizontal, ArrowLeft, Plus, Lock, Mail, Eye, EyeOff, CreditCard, Shield, CheckCircle, ShoppingCart, User, Menu, X, Star, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface Product {
  id: string
  name: string
  size: string
  price: number
  image: string
  rating: number
  reviews: number
  category: string
}

const products: Product[] = [
  {
    id: '1',
    name: 'Organic Body Wash',
    size: '250ml',
    price: 49.36,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop',
    rating: 4.8,
    reviews: 124,
    category: 'Body Care'
  },
  {
    id: '2',
    name: 'Luxury Hand Wash',
    size: '400ml',
    price: 78.90,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&h=300&fit=crop',
    rating: 4.6,
    reviews: 89,
    category: 'Hand Care'
  },
  {
    id: '3',
    name: 'Argan Oil Shampoo',
    size: '250ml',
    price: 98.45,
    image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=300&h=300&fit=crop',
    rating: 4.9,
    reviews: 203,
    category: 'Hair Care'
  },
  {
    id: '4',
    name: 'Moisturizing Cream',
    size: '500ml',
    price: 43.09,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop',
    rating: 4.7,
    reviews: 156,
    category: 'Skin Care'
  },
  {
    id: '5',
    name: 'Face Serum',
    size: '30ml',
    price: 125.99,
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=300&h=300&fit=crop',
    rating: 4.9,
    reviews: 312,
    category: 'Skin Care'
  },
  {
    id: '6',
    name: 'Body Lotion',
    size: '200ml',
    price: 67.50,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
    rating: 4.5,
    reviews: 98,
    category: 'Body Care'
  }
]

const priceRanges = ['$15 - $30', '$30 - $50', '$50 - $70', '$70+']
const categories = ['All Products', 'Skin Care', 'Hair Care', 'Body Care', 'Hand Care']

// Dummy credentials
const DUMMY_CREDENTIALS = {
  email: 'demo@example.com',
  password: 'demo123'
}

export default function EcommercePage() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'home' | 'cart' | 'payment' | 'success'>('login')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All Products')
  const [selectedPriceRange, setSelectedPriceRange] = useState('')
  const [productName, setProductName] = useState('')
  const [productCode, setProductCode] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cart, setCart] = useState<Product[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  })

  const addToCart = (product: Product) => {
    setCart(prev => [...prev, product])
  }

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index))
  }

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const getTotalPrice = () => {
    return cart.reduce((sum, product) => sum + product.price, 0)
  }

  const handleLogin = () => {
    if (email === DUMMY_CREDENTIALS.email && password === DUMMY_CREDENTIALS.password) {
      setIsLoggedIn(true)
      setCurrentScreen('home')
      setLoginError('')
    } else {
      setLoginError('Invalid credentials. Use demo@example.com / demo123')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentScreen('login')
    setEmail('')
    setPassword('')
    setCart([])
    setFavorites([])
  }

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setCurrentScreen('success')
    }, 1500)
  }

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory
    const matchesProductName = !productName || product.name.toLowerCase().includes(productName.toLowerCase())
    
    return matchesSearch && matchesCategory && matchesProductName
  })

  // Mobile Screen Component
  const MobileScreen = () => (
    <div className="w-full h-full bg-white rounded-[40px] overflow-hidden relative">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 pt-2 pb-1 text-black text-xs font-medium">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-0.5 bg-black rounded-full"></div>
            <div className="w-0.5 h-0.5 bg-black rounded-full"></div>
            <div className="w-0.5 h-0.5 bg-black rounded-full"></div>
            <div className="w-0.5 h-0.5 bg-black/40 rounded-full"></div>
          </div>
          <div className="w-4 h-2 border border-black rounded-sm relative ml-1">
            <div className="w-2.5 h-1 bg-black rounded-sm absolute top-0.5 left-0.5"></div>
          </div>
        </div>
      </div>

      {currentScreen === 'login' && (
        <div className="flex flex-col items-center justify-center h-full px-6 -mt-8">
          <div className="w-16 h-16 bg-gray-900 rounded-xl flex items-center justify-center mb-6">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-500 text-center mb-6 text-sm">Sign in to continue shopping</p>
          
          {loginError && (
            <div className="w-full bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-red-600 text-sm text-center">{loginError}</p>
            </div>
          )}

          <div className="w-full mb-3">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-100 rounded-xl py-3 pl-10 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
          </div>

          <div className="w-full mb-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-100 rounded-xl py-3 pl-10 pr-10 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
              </button>
            </div>
          </div>

          <Button
            className="w-full bg-gray-900 text-white rounded-xl py-3 text-sm font-semibold mb-3"
            onClick={handleLogin}
          >
            Sign In
          </Button>

          <div className="text-center">
            <p className="text-xs text-gray-500 mb-2">Demo Credentials:</p>
            <p className="text-xs text-gray-600">demo@example.com / demo123</p>
          </div>
        </div>
      )}

      {currentScreen === 'home' && (
        <>
          <div className="flex items-center justify-between px-4 py-3">
            <h1 className="text-lg font-semibold text-gray-900">Products</h1>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon-sm"
                className="relative"
                onClick={() => setCurrentScreen('cart')}
              >
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cart.length}
                  </div>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={handleLogout}
              >
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="px-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 rounded-full py-2 pl-10 pr-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="px-4 flex-1 overflow-y-auto">
            <div className="grid grid-cols-2 gap-3 pb-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="p-3 border-0 shadow-sm bg-white rounded-xl">
                  <div className="relative aspect-square bg-gray-50 rounded-lg mb-2 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm"
                    >
                      <Heart 
                        className={`w-3 h-3 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                      />
                    </button>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium text-gray-900 text-xs leading-tight">{product.name}</h3>
                    <p className="text-xs text-gray-500">{product.size}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">{product.rating}</span>
                      <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900 text-sm">${product.price}</span>
                      <Button
                        size="icon-sm"
                        className="bg-gray-900 hover:bg-gray-800 rounded-full w-6 h-6"
                        onClick={() => addToCart(product)}
                      >
                        <Plus className="w-3 h-3 text-white" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}

      {currentScreen === 'cart' && (
        <>
          <div className="flex items-center justify-between px-4 py-3">
            <ArrowLeft 
              className="w-5 h-5 text-gray-700 cursor-pointer" 
              onClick={() => setCurrentScreen('home')}
            />
            <h1 className="text-lg font-semibold text-gray-900">Cart ({cart.length})</h1>
            <div className="w-5 h-5"></div>
          </div>

          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 -mt-16">
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                <ShoppingCart className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-500 text-center mb-6 text-sm">Add some products to get started</p>
              <Button
                className="bg-gray-900 text-white rounded-xl px-6 py-2 text-sm"
                onClick={() => setCurrentScreen('home')}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="px-4 flex-1 overflow-y-auto">
                <div className="space-y-3 pb-4">
                  {cart.map((product, index) => (
                    <Card key={`${product.id}-${index}`} className="p-3 border-0 shadow-sm bg-white rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-50 rounded-lg overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 text-sm">{product.name}</h3>
                          <p className="text-xs text-gray-500">{product.size}</p>
                          <p className="font-semibold text-gray-900 text-sm">${product.price}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-red-500 hover:bg-red-50"
                          onClick={() => removeFromCart(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="px-4 pb-4">
                <div className="bg-gray-50 rounded-xl p-3 mb-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Total ({cart.length} items)</span>
                    <span className="font-semibold text-lg">${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  className="w-full bg-gray-900 text-white rounded-xl py-3 text-sm font-semibold"
                  onClick={() => setCurrentScreen('payment')}
                >
                  Proceed to Payment
                </Button>
              </div>
            </>
          )}
        </>
      )}

      {currentScreen === 'payment' && (
        <>
          <div className="flex items-center justify-between px-4 py-3">
            <ArrowLeft 
              className="w-5 h-5 text-gray-700 cursor-pointer" 
              onClick={() => setCurrentScreen('cart')}
            />
            <h1 className="text-lg font-semibold text-gray-900">Payment</h1>
            <div className="w-5 h-5"></div>
          </div>

          <div className="px-4 flex-1 overflow-y-auto pb-4">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Payment Method</h3>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border-2 border-gray-900">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-gray-700" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Credit Card</p>
                    <p className="text-xs text-gray-500">**** **** **** 4242</p>
                  </div>
                </div>
                <div className="w-3 h-3 bg-gray-900 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Card Details</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={paymentData.cardNumber}
                  onChange={(e) => setPaymentData(prev => ({...prev, cardNumber: e.target.value}))}
                  className="w-full bg-gray-100 rounded-xl py-3 px-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={paymentData.expiryDate}
                    onChange={(e) => setPaymentData(prev => ({...prev, expiryDate: e.target.value}))}
                    className="flex-1 bg-gray-100 rounded-xl py-3 px-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={paymentData.cvv}
                    onChange={(e) => setPaymentData(prev => ({...prev, cvv: e.target.value}))}
                    className="flex-1 bg-gray-100 rounded-xl py-3 px-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  value={paymentData.cardholderName}
                  onChange={(e) => setPaymentData(prev => ({...prev, cardholderName: e.target.value}))}
                  className="w-full bg-gray-100 rounded-xl py-3 px-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl mb-4">
              <Shield className="w-4 h-4 text-green-600" />
              <div>
                <p className="font-medium text-green-800 text-sm">Secure Payment</p>
                <p className="text-xs text-green-600">Your information is encrypted</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 mb-4">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">Order Summary</h3>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({cart.length} items)</span>
                  <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${(getTotalPrice() * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t pt-1 mt-1">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900 text-sm">Total</span>
                    <span className="font-semibold">${(getTotalPrice() * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 pb-4">
            <Button
              className="w-full bg-gray-900 text-white rounded-xl py-3 text-sm font-semibold"
              onClick={handlePayment}
            >
              Pay ${(getTotalPrice() * 1.1).toFixed(2)}
            </Button>
          </div>
        </>
      )}

      {currentScreen === 'success' && (
        <div className="flex flex-col items-center justify-center h-full px-6 -mt-16">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-500 text-center mb-6 text-sm">Your order has been confirmed</p>
          
          <div className="w-full bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600 text-sm">Order ID</span>
              <span className="font-semibold text-sm">#ORD-2024-001</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600 text-sm">Total Amount</span>
              <span className="font-semibold">${(getTotalPrice() * 1.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Delivery</span>
              <span className="font-semibold text-sm">2-3 business days</span>
            </div>
          </div>

          <Button
            className="w-full bg-gray-900 text-white rounded-xl py-3 text-sm font-semibold"
            onClick={() => {
              setCurrentScreen('home')
              setCart([])
            }}
          >
            Continue Shopping
          </Button>
        </div>
      )}
    </div>
  )

  // Laptop Screen Component
  const LaptopScreen = () => (
    <div className="w-full h-full bg-white rounded-lg overflow-hidden relative shadow-inner">
      {currentScreen === 'login' && (
        <div className="flex items-center justify-center h-full">
          <div className="w-full max-w-md px-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-500">Sign in to your account to continue shopping</p>
            </div>
            
            {loginError && (
              <div className="w-full bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-600 text-center">{loginError}</p>
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-100 rounded-2xl py-4 pl-12 pr-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-100 rounded-2xl py-4 pl-12 pr-12 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                </button>
              </div>
            </div>

            <Button
              className="w-full bg-gray-900 text-white rounded-2xl py-4 text-lg font-semibold mb-6"
              onClick={handleLogin}
            >
              Sign In
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Demo Credentials:</p>
              <p className="text-gray-600">demo@example.com / demo123</p>
            </div>
          </div>
        </div>
      )}

      {currentScreen === 'home' && (
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900">Beauty Store</h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 bg-gray-100 rounded-full py-3 pl-12 pr-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button
                variant="outline"
                className="relative"
                onClick={() => setCurrentScreen('cart')}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Cart ({cart.length})
                {cart.length > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </div>
                )}
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <User className="w-5 h-5 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            <div className="mb-6">
              <div className="flex gap-4 mb-4">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`rounded-full ${
                      selectedCategory === category 
                        ? 'bg-gray-900 text-white' 
                        : 'bg-white text-gray-700 border-gray-200'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="p-4 border shadow-sm bg-white rounded-2xl hover:shadow-md transition-shadow">
                  <div className="relative aspect-square bg-gray-50 rounded-xl mb-4 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Heart 
                        className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
                      />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.size} • {product.category}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900">${product.price}</span>
                      <Button
                        className="bg-gray-900 hover:bg-gray-800 text-white rounded-full"
                        onClick={() => addToCart(product)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentScreen === 'cart' && (
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-4">
              <ArrowLeft 
                className="w-6 h-6 text-gray-700 cursor-pointer" 
                onClick={() => setCurrentScreen('home')}
              />
              <h1 className="text-2xl font-bold text-gray-900">Shopping Cart ({cart.length})</h1>
            </div>
          </div>

          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1">
              <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-500 text-center mb-8">Add some products to get started</p>
              <Button
                className="bg-gray-900 text-white rounded-2xl px-8 py-3"
                onClick={() => setCurrentScreen('home')}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="flex flex-1">
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-4">
                  {cart.map((product, index) => (
                    <Card key={`${product.id}-${index}`} className="p-4 border shadow-sm bg-white rounded-2xl">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
                          <p className="text-gray-500">{product.size} • {product.category}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{product.rating}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900">${product.price}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:bg-red-50 mt-2"
                            onClick={() => removeFromCart(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="w-80 p-6 border-l bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({cart.length} items)</span>
                    <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${(getTotalPrice() * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-lg font-semibold">${(getTotalPrice() * 1.1).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <Button
                  className="w-full bg-gray-900 text-white rounded-2xl py-4 text-lg font-semibold"
                  onClick={() => setCurrentScreen('payment')}
                >
                  Proceed to Payment
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {currentScreen === 'payment' && (
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-4">
              <ArrowLeft 
                className="w-6 h-6 text-gray-700 cursor-pointer" 
                onClick={() => setCurrentScreen('cart')}
              />
              <h1 className="text-2xl font-bold text-gray-900">Payment</h1>
            </div>
          </div>

          <div className="flex flex-1">
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="max-w-2xl">
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border-2 border-gray-900">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-6 h-6 text-gray-700" />
                      <div>
                        <p className="font-medium text-gray-900">Credit Card</p>
                        <p className="text-sm text-gray-500">**** **** **** 4242</p>
                      </div>
                    </div>
                    <div className="w-4 h-4 bg-gray-900 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Card Details</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Card Number"
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData(prev => ({...prev, cardNumber: e.target.value}))}
                      className="w-full bg-gray-100 rounded-2xl py-4 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                    <div className="flex gap-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={paymentData.expiryDate}
                        onChange={(e) => setPaymentData(prev => ({...prev, expiryDate: e.target.value}))}
                        className="flex-1 bg-gray-100 rounded-2xl py-4 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        value={paymentData.cvv}
                        onChange={(e) => setPaymentData(prev => ({...prev, cvv: e.target.value}))}
                        className="flex-1 bg-gray-100 rounded-2xl py-4 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Cardholder Name"
                      value={paymentData.cardholderName}
                      onChange={(e) => setPaymentData(prev => ({...prev, cardholderName: e.target.value}))}
                      className="w-full bg-gray-100 rounded-2xl py-4 px-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-2xl">
                  <Shield className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Secure Payment</p>
                    <p className="text-sm text-green-600">Your payment information is encrypted and secure</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-80 p-6 border-l bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cart.length} items)</span>
                  <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${(getTotalPrice() * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-semibold">${(getTotalPrice() * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Button
                className="w-full bg-gray-900 text-white rounded-2xl py-4 text-lg font-semibold"
                onClick={handlePayment}
              >
                Pay ${(getTotalPrice() * 1.1).toFixed(2)}
              </Button>
            </div>
          </div>
        </div>
      )}

      {currentScreen === 'success' && (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-8">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
          <p className="text-gray-500 text-center mb-8 text-lg">Your order has been confirmed and will be delivered soon.</p>
          
          <div className="w-full max-w-md bg-gray-50 rounded-2xl p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Order ID</span>
              <span className="font-semibold">#ORD-2024-001</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-semibold text-lg">${(getTotalPrice() * 1.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Delivery</span>
              <span className="font-semibold">2-3 business days</span>
            </div>
          </div>

          <Button
            className="bg-gray-900 text-white rounded-2xl px-8 py-4 text-lg font-semibold"
            onClick={() => {
              setCurrentScreen('home')
              setCart([])
            }}
          >
            Continue Shopping
          </Button>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-[#D4D4D8] flex items-center justify-center p-4">
      <div className="flex items-center gap-8 w-full max-w-7xl">
        {/* Laptop Screen */}
        <div className="flex-1 relative">
          <div className="bg-gray-800 rounded-2xl p-4 shadow-2xl">
            <div className="bg-gray-700 rounded-lg p-2 mb-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 bg-gray-600 rounded px-3 py-1 text-gray-300 text-sm">
                  https://beautystore.com
                </div>
              </div>
            </div>
            <div className="aspect-[16/10] bg-white rounded-lg overflow-hidden">
              <LaptopScreen />
            </div>
          </div>
        </div>

        {/* Mobile Screen */}
        <div className="relative">
          <div className="w-[280px] h-[600px] bg-black rounded-[40px] p-2 shadow-2xl">
            <MobileScreen />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-[40px] pointer-events-none"></div>
        </div>
      </div>
    </div>
  )
}
