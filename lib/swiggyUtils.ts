// Swiggy Food Delivery App - Utility Functions

import { CartItem } from './swiggyData'

export const formatPrice = (price: number): string => {
  return `₹${price}`
}

export const calculateItemTotal = (item: CartItem): number => {
  let total = item.menuItem.price
  
  // Add size price if selected
  if (item.selectedSize) {
    total = item.selectedSize.price
  }
  
  // Add beverages
  if (item.selectedBeverages && item.selectedBeverages.length > 0) {
    total += item.selectedBeverages.reduce((sum, bev) => sum + bev.price, 0)
  }
  
  // Add toppings
  if (item.selectedToppings && item.selectedToppings.length > 0) {
    total += item.selectedToppings.reduce((sum, top) => sum + top.price, 0)
  }
  
  return total * item.quantity
}

export const calculateCartTotal = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => total + calculateItemTotal(item), 0)
}

export const calculateTax = (subtotal: number): number => {
  return Math.round(subtotal * 0.05) // 5% tax
}

export const calculateDiscount = (subtotal: number): number => {
  // Example discount logic
  if (subtotal > 299) {
    return 75
  }
  return 0
}

export const calculateGrandTotal = (cart: CartItem[]): number => {
  const subtotal = calculateCartTotal(cart)
  const tax = calculateTax(subtotal)
  const discount = calculateDiscount(subtotal)
  return subtotal + tax - discount
}

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

export const generateOrderId = (): string => {
  return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
}

