# Swiggy Food Delivery App - PWA Implementation

## Overview
A complete Swiggy clone built as a Progressive Web App (PWA) with all essential food delivery features.

## Features Implemented

### 🎨 **Design & UI**
- **Swiggy Brand Colors**:
  - Primary Orange: `#FC8019`
  - Success Green: `#48C479`
  - Text Primary: `#282C3F`
  - Text Secondary: `#7E808C`
  - Background: `#FFFFFF`
  - Card Background: `#F9F9F9`
  - Border: `#E9E9EB`

### 📱 **Screens Implemented**
1. **Location Selection** - Choose delivery address from saved locations
2. **Home/Restaurant Listing** - Browse restaurants with filters and offers
3. **Search** - Search for restaurants and dishes with real-time filtering
4. **Restaurant Detail** - View menu with categories, ratings, and customization
5. **Item Customization Modal** - Select size, beverages, and toppings
6. **Cart** - Review items, apply coupons, manage quantities
7. **Address Management** - Add, edit, delete delivery addresses
8. **Payment Options** - UPI, Cards, Wallets, NetBanking, Cash on Delivery
9. **UPI Timer** - Countdown timer for payment approval
10. **Order Tracking** - Real-time order status with delivery partner info
11. **Rating** - Rate delivery experience with star rating
12. **Account/Profile** - View past orders, manage settings

### ✨ **Key Functionality**
- **Cart Management**: Add/remove items, quantity controls, customizations
- **Price Calculation**: Subtotal, tax (5%), discounts, total
- **Restaurant Filtering**: Veg only, ratings, delivery time
- **Search**: Real-time across restaurants and menu items
- **Payment Flow**: Multiple payment options with dummy gateway
- **Order Tracking**: Progress stepper with status updates
- **Delivery Timer**: Live countdown for order delivery
- **Rating System**: 5-star rating for delivery person

### 🔧 **PWA Features**
- **Service Worker**: Offline caching support
- **Manifest**: Installable as app on mobile/desktop
- **Theme Color**: Swiggy orange (#FC8019)
- **Responsive**: Optimized for mobile devices
- **Standalone Mode**: Full-screen app experience

### 🎭 **Animations**
- Slide-up modal transitions
- Scale-in success animation
- Circular timer countdown
- Smooth screen transitions
- Pulse effects on active states

## File Structure

```
lib/
  ├── swiggyData.ts         # Restaurant, menu, location data
  └── swiggyUtils.ts        # Helper functions (price calc, formatting)

components/swiggy/
  ├── StatusBar.tsx         # Mobile status bar with time, battery, signal
  ├── BottomNav.tsx         # Bottom navigation (Swiggy, Food, Instamart, etc.)
  ├── CircularTimer.tsx     # Countdown timer for UPI payment
  └── PaymentIcons.tsx      # SVG icons for payment methods

app/foodie/
  └── page.tsx              # Main Swiggy app (all screens)

public/
  ├── manifest.json         # PWA manifest
  └── sw.js                 # Service worker
```

## Data Structure

### Restaurants (8 total)
- Olio - The Wood Fired Pizzeria
- Chai Point
- Samosa Party
- The Cubano Sandwich Co.
- Sandoitchi Kojo
- 32 Degree
- The Coffee Brewery
- Grover Mithaivala

### Menu Items
- Images from Unsplash
- Veg/Non-veg indicators
- Ratings and reviews
- Customizable sizes, beverages, toppings
- Real-time availability status

### Locations (4 saved addresses)
- Home (Rohini, Delhi)
- Work (Malviya Nagar, Delhi)
- Hotel (Gurgaon)
- Nandini (New Delhi)

### Payment Methods
- UPI: 3 saved IDs (Google Pay, Paytm)
- Cards: 3 saved cards (Visa, Slice)
- Wallets: Paytm, PhonePe, Amazon Pay
- Other: NetBanking, Cash on Delivery

## User Flow

```
Location Selection
    ↓
Home (Restaurant Listing)
    ↓
Restaurant Detail → Menu → Item Customization
    ↓
Cart → Review Items
    ↓
Address Selection
    ↓
Payment Options
    ↓
UPI Timer (Payment Processing)
    ↓
Order Tracking (Status Updates)
    ↓
Rating → Back to Home
```

## Technical Stack
- **Framework**: Next.js 15 with React
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Images**: Unsplash API
- **State Management**: React useState (no Redux)
- **PWA**: Service Worker + Manifest

## Access
Navigate to `/foodie` to view the complete Swiggy app experience.

## Dummy Credentials
No login required - app starts at location selection screen.

## Payment Gateway
All payment methods are dummy/simulated:
- UPI timer auto-completes after countdown
- Card payments processed immediately
- All transactions are simulated

## Features Not Implemented (Out of Scope)
- Backend API integration
- Real payment processing
- Live GPS tracking
- Push notifications
- User authentication
- Real-time order updates from backend

## Browser Support
- Chrome/Edge (recommended)
- Safari (iOS/macOS)
- Firefox
- Best experience on mobile devices

## Installation as PWA
1. Visit the app in mobile browser
2. Click "Add to Home Screen"
3. App will install as standalone application
4. Launch from home screen for app-like experience

