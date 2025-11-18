"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { ShoppingCart, User, Heart, Search, Home, Package, ArrowLeft, X, Plus, Minus, CreditCard, Smartphone, Wallet, Check } from "lucide-react";

// Nike Color Palette
const NIKE_COLORS = {
  black: "#111111",
  white: "#FFFFFF",
  orange: "#FF6B00",
  grey: "#757575",
  lightGrey: "#F5F5F5",
  darkGrey: "#1A1A1A",
};

// Dummy credentials
const DEMO_CREDS = {
  email: "demo@nike.com",
  password: "Nike@2024",
};

// Nike Shoes Data (curated selection with actual Nike models)
const NIKE_SHOES = [
  {
    id: 1,
    name: "Air Jordan 1 High",
    price: 12295,
    category: "Basketball",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&q=80",
    color: "White/Black/Red",
    sizes: [7, 8, 9, 10, 11],
  },
  {
    id: 2,
    name: "Air Max 270",
    price: 13995,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    color: "Triple Black",
    sizes: [7, 8, 9, 10, 11, 12],
  },
  {
    id: 3,
    name: "React Infinity Run",
    price: 10795,
    category: "Running",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
    color: "White/Blue",
    sizes: [6, 7, 8, 9, 10, 11],
  },
  {
    id: 4,
    name: "Blazer Mid '77",
    price: 8695,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80",
    color: "White/Black",
    sizes: [7, 8, 9, 10, 11],
  },
  {
    id: 5,
    name: "Dunk Low Retro",
    price: 8695,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
    color: "Panda",
    sizes: [6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 6,
    name: "Air Force 1 '07",
    price: 7495,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
    color: "Triple White",
    sizes: [6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 7,
    name: "Pegasus 40",
    price: 10795,
    category: "Running",
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80",
    color: "Black/White",
    sizes: [6, 7, 8, 9, 10, 11],
  },
  {
    id: 8,
    name: "Cortez Leather",
    price: 6495,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
    color: "White/Red/Blue",
    sizes: [7, 8, 9, 10, 11],
  },
];

type Screen = "login" | "home" | "product" | "cart" | "payment" | "otp" | "confirmation";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  size: number;
  quantity: number;
}

export default function NikeShoesApp() {
  const [screen, setScreen] = useState<Screen>("login");
  const [selectedProduct, setSelectedProduct] = useState<typeof NIKE_SHOES[0] | null>(null);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCartAnimation, setShowCartAnimation] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "wallet" | null>(null);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const addToCart = (product: typeof NIKE_SHOES[0], size: number) => {
    const existingItem = cart.find((item) => item.id === product.id && item.size === size);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size,
          quantity: 1,
        },
      ]);
    }

    setShowCartAnimation(true);
    setTimeout(() => setShowCartAnimation(false), 1000);
  };

  const updateQuantity = (id: number, size: number, delta: number) => {
    setCart(
      cart
        .map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number, size: number) => {
    setCart(cart.filter((item) => !(item.id === id && item.size === size)));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = subtotal * 0.18; // 18% GST
  const shipping = subtotal > 0 ? (subtotal > 14000 ? 0 : 500) : 0;
  const total = subtotal + gst + shipping;

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const handleLogin = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (email === DEMO_CREDS.email && password === DEMO_CREDS.password) {
      setScreen("home");
    } else {
      alert("Invalid credentials! Please use:\n" + DEMO_CREDS.email + "\n" + DEMO_CREDS.password);
    }
  }, [email, password]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handlePayment = () => {
    if (paymentMethod) {
      setScreen("otp");
    }
  };

  const verifyOtp = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp === "123456") {
      setScreen("confirmation");
      // Clear cart after successful order
      setTimeout(() => {
        setCart([]);
      }, 2000);
    } else {
      alert("Invalid OTP! Use: 123456");
    }
  };

  // Login Screen
  const LoginScreen = useMemo(() => (
    <div className="h-full flex flex-col justify-between p-8 bg-white">
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-12">
          <svg className="w-20 h-20 mx-auto mb-4" viewBox="0 0 60 60" fill="none">
            <path
              d="M0 30C0 13.4315 13.4315 0 30 0C46.5685 0 60 13.4315 60 30C60 46.5685 46.5685 60 30 60C13.4315 60 0 46.5685 0 30Z"
              fill={NIKE_COLORS.black}
            />
            <path
              d="M39.3 20.7L20.7 35.1L15 32.4L39.3 20.7Z"
              fill={NIKE_COLORS.white}
            />
          </svg>
          <h1 className="text-3xl font-black mb-2" style={{ color: NIKE_COLORS.black }}>
            NIKE
          </h1>
          <p className="text-sm" style={{ color: NIKE_COLORS.grey }}>
            Just Do It.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-2" style={{ color: NIKE_COLORS.black }}>
              Email Address
            </label>
            <input
              key="nike-email-input"
              ref={emailInputRef}
              type="text"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-md focus:outline-none focus:border-black"
              style={{ borderColor: NIKE_COLORS.lightGrey }}
              placeholder="demo@nike.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-2" style={{ color: NIKE_COLORS.black }}>
              Password
            </label>
            <input
              key="nike-password-input"
              ref={passwordInputRef}
              type="text"
              name="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-md focus:outline-none focus:border-black"
              style={{ borderColor: NIKE_COLORS.lightGrey }}
              placeholder="Nike@2024"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-full text-white font-bold hover:opacity-90 transition-opacity"
            style={{ backgroundColor: NIKE_COLORS.black }}
          >
            SIGN IN
          </button>
        </form>

        <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: NIKE_COLORS.lightGrey }}>
          <p className="text-xs font-semibold mb-2" style={{ color: NIKE_COLORS.black }}>
            Demo Credentials:
          </p>
          <p className="text-xs" style={{ color: NIKE_COLORS.grey }}>
            Email: {DEMO_CREDS.email}
          </p>
          <p className="text-xs" style={{ color: NIKE_COLORS.grey }}>
            Password: {DEMO_CREDS.password}
          </p>
        </div>
      </div>
    </div>
  ), [email, password, handleLogin]);

  // Home Screen
  const HomeScreen = () => (
    <div className="h-full flex flex-col bg-white relative">
      {/* Header */}
      <div className="p-4 border-b" style={{ borderColor: NIKE_COLORS.lightGrey }}>
        <div className="flex items-center justify-between mb-4">
          <svg className="w-12 h-12" viewBox="0 0 60 60" fill="none">
            <path
              d="M0 30C0 13.4315 13.4315 0 30 0C46.5685 0 60 13.4315 60 30C60 46.5685 46.5685 60 30 60C13.4315 60 0 46.5685 0 30Z"
              fill={NIKE_COLORS.black}
            />
            <path d="M39.3 20.7L20.7 35.1L15 32.4L39.3 20.7Z" fill={NIKE_COLORS.white} />
          </svg>
          <div className="flex items-center gap-3">
            <button className="p-2 relative">
              <ShoppingCart className="w-6 h-6" style={{ color: NIKE_COLORS.black }} />
              {cart.length > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: NIKE_COLORS.orange }}
                >
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
            <button className="p-2">
              <User className="w-6 h-6" style={{ color: NIKE_COLORS.black }} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
            style={{ color: NIKE_COLORS.grey }}
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-3 rounded-full focus:outline-none"
            style={{ backgroundColor: NIKE_COLORS.lightGrey }}
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-2xl font-black mb-4" style={{ color: NIKE_COLORS.black }}>
          New Arrivals
        </h2>
        <div className="grid grid-cols-2 gap-4 pb-20">
          {NIKE_SHOES.map((shoe) => (
            <div
              key={shoe.id}
              className="relative rounded-lg overflow-hidden cursor-pointer"
              style={{ backgroundColor: NIKE_COLORS.lightGrey }}
              onClick={() => {
                setSelectedProduct(shoe);
                setScreen("product");
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(shoe.id);
                }}
                className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: NIKE_COLORS.white }}
              >
                <Heart
                  className="w-5 h-5"
                  style={{
                    color: favorites.includes(shoe.id) ? NIKE_COLORS.orange : NIKE_COLORS.grey,
                    fill: favorites.includes(shoe.id) ? NIKE_COLORS.orange : "none",
                  }}
                />
              </button>
              <div className="w-full aspect-square bg-gray-50">
                <img src={shoe.image} alt={shoe.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold mb-1 text-gray-600">
                  {shoe.category}
                </p>
                <h3 className="text-sm font-bold mb-1" style={{ color: NIKE_COLORS.black }}>
                  {shoe.name}
                </h3>
                <p className="text-xs mb-2" style={{ color: NIKE_COLORS.grey }}>
                  {shoe.color}
                </p>
                <p className="text-lg font-bold" style={{ color: NIKE_COLORS.black }}>
                  ₹{shoe.price.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div
        className="absolute bottom-0 left-0 right-0 border-t z-10"
        style={{ borderColor: NIKE_COLORS.lightGrey, backgroundColor: NIKE_COLORS.white }}
      >
        <div className="flex justify-around py-3">
          <button className="flex flex-col items-center gap-1">
            <Home className="w-6 h-6" style={{ color: NIKE_COLORS.black }} />
            <span className="text-xs font-semibold" style={{ color: NIKE_COLORS.black }}>
              Home
            </span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <div className="relative">
              <Heart className="w-6 h-6" style={{ color: NIKE_COLORS.grey }} />
              {favorites.length > 0 && (
                <div
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: NIKE_COLORS.orange }}
                >
                  {favorites.length}
                </div>
              )}
            </div>
            <span className="text-xs" style={{ color: NIKE_COLORS.grey }}>
              Favorites
            </span>
          </button>
          <button
            className="flex flex-col items-center gap-1"
            onClick={() => setScreen("cart")}
          >
            <div className="relative">
              <ShoppingCart className="w-6 h-6" style={{ color: NIKE_COLORS.grey }} />
              {cart.length > 0 && (
                <div
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: NIKE_COLORS.orange }}
                >
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </div>
              )}
            </div>
            <span className="text-xs" style={{ color: NIKE_COLORS.grey }}>
              Bag
            </span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <User className="w-6 h-6" style={{ color: NIKE_COLORS.grey }} />
            <span className="text-xs" style={{ color: NIKE_COLORS.grey }}>
              Profile
            </span>
          </button>
        </div>
      </div>

      {/* Cart Animation */}
      {showCartAnimation && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
          <div
            className="animate-bounce p-6 rounded-full"
            style={{ backgroundColor: NIKE_COLORS.orange }}
          >
            <Check className="w-12 h-12 text-white" />
          </div>
        </div>
      )}
    </div>
  );

  // Product Detail Screen
  const ProductScreen = () => {
    if (!selectedProduct) return null;

    return (
      <div className="h-full flex flex-col bg-white relative">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b" style={{ borderColor: NIKE_COLORS.lightGrey }}>
          <button onClick={() => setScreen("home")}>
            <ArrowLeft className="w-6 h-6" style={{ color: NIKE_COLORS.black }} />
          </button>
          <button onClick={() => toggleFavorite(selectedProduct.id)}>
            <Heart
              className="w-6 h-6"
              style={{
                color: favorites.includes(selectedProduct.id) ? NIKE_COLORS.orange : NIKE_COLORS.grey,
                fill: favorites.includes(selectedProduct.id) ? NIKE_COLORS.orange : "none",
              }}
            />
          </button>
        </div>

        {/* Product Image */}
        <div className="flex-1 overflow-y-auto pb-16">
          <div className="p-8" style={{ backgroundColor: NIKE_COLORS.lightGrey }}>
            <div className="w-full aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="p-6">
            <p className="text-sm font-semibold mb-2" style={{ color: NIKE_COLORS.orange }}>
              {selectedProduct.category}
            </p>
            <h1 className="text-3xl font-black mb-2" style={{ color: NIKE_COLORS.black }}>
              {selectedProduct.name}
            </h1>
            <p className="text-lg mb-4" style={{ color: NIKE_COLORS.grey }}>
              {selectedProduct.color}
            </p>
            <p className="text-2xl font-bold mb-6" style={{ color: NIKE_COLORS.black }}>
              ₹{selectedProduct.price.toLocaleString("en-IN")}
            </p>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-bold mb-3" style={{ color: NIKE_COLORS.black }}>
                Select Size (UK)
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="py-3 rounded-lg border-2 font-semibold transition-colors"
                    style={{
                      borderColor: selectedSize === size ? NIKE_COLORS.black : NIKE_COLORS.lightGrey,
                      backgroundColor: selectedSize === size ? NIKE_COLORS.black : NIKE_COLORS.white,
                      color: selectedSize === size ? NIKE_COLORS.white : NIKE_COLORS.black,
                    }}
                  >
                    UK {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-sm font-bold mb-2" style={{ color: NIKE_COLORS.black }}>
                Product Information
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: NIKE_COLORS.grey }}>
                Experience ultimate comfort and style with the {selectedProduct.name}. Engineered for
                performance and designed for everyday wear. Premium materials and innovative cushioning
                technology provide superior comfort and durability.
              </p>
            </div>

            {/* Add to Cart Actions */}
            <div className="flex gap-3 mb-24">
              <button
                onClick={() => {
                  if (selectedSize) {
                    addToCart(selectedProduct, selectedSize);
                  } else {
                    alert("Please select a size");
                  }
                }}
                className="flex-1 py-4 rounded-full border-2 font-bold transition-opacity hover:opacity-70"
                style={{
                  borderColor: NIKE_COLORS.black,
                  color: NIKE_COLORS.black,
                  backgroundColor: NIKE_COLORS.white,
                }}
              >
                Add to Bag
              </button>
              <button
                onClick={() => {
                  if (selectedSize) {
                    addToCart(selectedProduct, selectedSize);
                    setScreen("cart");
                  } else {
                    alert("Please select a size");
                  }
                }}
                className="flex-1 py-4 rounded-full font-bold transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: NIKE_COLORS.black,
                  color: NIKE_COLORS.white,
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div
          className="absolute bottom-0 left-0 right-0 border-t z-10"
          style={{ borderColor: NIKE_COLORS.lightGrey, backgroundColor: NIKE_COLORS.white }}
        >
          <div className="flex justify-around py-3">
            <button className="flex flex-col items-center gap-1" onClick={() => setScreen("home")}>
              <Home className="w-6 h-6" style={{ color: NIKE_COLORS.grey }} />
              <span className="text-xs" style={{ color: NIKE_COLORS.grey }}>
                Home
              </span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <div className="relative">
                <Heart className="w-6 h-6" style={{ color: NIKE_COLORS.grey }} />
                {favorites.length > 0 && (
                  <div
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: NIKE_COLORS.orange }}
                  >
                    {favorites.length}
                  </div>
                )}
              </div>
              <span className="text-xs" style={{ color: NIKE_COLORS.grey }}>
                Favorites
              </span>
            </button>
            <button
              className="flex flex-col items-center gap-1"
              onClick={() => setScreen("cart")}
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6" style={{ color: NIKE_COLORS.grey }} />
                {cart.length > 0 && (
                  <div
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: NIKE_COLORS.orange }}
                  >
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </div>
                )}
              </div>
              <span className="text-xs" style={{ color: NIKE_COLORS.grey }}>
                Bag
              </span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <User className="w-6 h-6" style={{ color: NIKE_COLORS.grey }} />
              <span className="text-xs" style={{ color: NIKE_COLORS.grey }}>
                Profile
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Cart Screen
  const CartScreen = () => (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 flex items-center border-b" style={{ borderColor: NIKE_COLORS.lightGrey }}>
        <button onClick={() => setScreen("home")} className="mr-4">
          <ArrowLeft className="w-6 h-6" style={{ color: NIKE_COLORS.black }} />
        </button>
        <h1 className="text-xl font-black" style={{ color: NIKE_COLORS.black }}>
          Bag ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
        </h1>
      </div>

      {cart.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <ShoppingCart className="w-20 h-20 mb-4" style={{ color: NIKE_COLORS.lightGrey }} />
          <h2 className="text-xl font-bold mb-2" style={{ color: NIKE_COLORS.black }}>
            Your bag is empty
          </h2>
          <p className="text-center mb-6" style={{ color: NIKE_COLORS.grey }}>
            Add some products to get started
          </p>
          <button
            onClick={() => setScreen("home")}
            className="px-8 py-3 rounded-full font-bold"
            style={{ backgroundColor: NIKE_COLORS.black, color: NIKE_COLORS.white }}
          >
            Shop Now
          </button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex gap-4 mb-4 p-4 rounded-lg"
                style={{ backgroundColor: NIKE_COLORS.lightGrey }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-contain rounded-lg"
                  style={{ backgroundColor: NIKE_COLORS.white }}
                />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <h3 className="text-sm font-bold" style={{ color: NIKE_COLORS.black }}>
                      {item.name}
                    </h3>
                    <button onClick={() => removeFromCart(item.id, item.size)}>
                      <X className="w-5 h-5" style={{ color: NIKE_COLORS.grey }} />
                    </button>
                  </div>
                  <p className="text-xs mb-2" style={{ color: NIKE_COLORS.grey }}>
                    Size: UK {item.size}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, -1)}
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: NIKE_COLORS.white }}
                      >
                        <Minus className="w-4 h-4" style={{ color: NIKE_COLORS.black }} />
                      </button>
                      <span className="font-bold" style={{ color: NIKE_COLORS.black }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, 1)}
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: NIKE_COLORS.white }}
                      >
                        <Plus className="w-4 h-4" style={{ color: NIKE_COLORS.black }} />
                      </button>
                    </div>
                    <p className="text-sm font-bold" style={{ color: NIKE_COLORS.black }}>
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Order Summary */}
            <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: NIKE_COLORS.lightGrey }}>
              <h3 className="text-lg font-black mb-4" style={{ color: NIKE_COLORS.black }}>
                Order Summary
              </h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span style={{ color: NIKE_COLORS.grey }}>Subtotal</span>
                  <span className="font-semibold" style={{ color: NIKE_COLORS.black }}>
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: NIKE_COLORS.grey }}>GST (18%)</span>
                  <span className="font-semibold" style={{ color: NIKE_COLORS.black }}>
                    ₹{gst.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: NIKE_COLORS.grey }}>
                    Shipping {subtotal > 14000 && "(FREE)"}
                  </span>
                  <span className="font-semibold" style={{ color: NIKE_COLORS.black }}>
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
                <div className="border-t pt-2 mt-2" style={{ borderColor: NIKE_COLORS.white }}>
                  <div className="flex justify-between">
                    <span className="font-bold" style={{ color: NIKE_COLORS.black }}>
                      Total
                    </span>
                    <span className="text-lg font-black" style={{ color: NIKE_COLORS.black }}>
                      ₹{total.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="p-4 border-t" style={{ borderColor: NIKE_COLORS.lightGrey }}>
            <button
              onClick={() => setScreen("payment")}
              className="w-full py-4 rounded-full font-bold"
              style={{ backgroundColor: NIKE_COLORS.black, color: NIKE_COLORS.white }}
            >
              Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );

  // Payment Screen
  const PaymentScreen = () => (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 flex items-center border-b" style={{ borderColor: NIKE_COLORS.lightGrey }}>
        <button onClick={() => setScreen("cart")} className="mr-4">
          <ArrowLeft className="w-6 h-6" style={{ color: NIKE_COLORS.black }} />
        </button>
        <h1 className="text-xl font-black" style={{ color: NIKE_COLORS.black }}>
          Payment
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {/* Amount */}
        <div className="text-center mb-8">
          <p className="text-sm mb-2" style={{ color: NIKE_COLORS.grey }}>
            Amount to Pay
          </p>
          <p className="text-4xl font-black" style={{ color: NIKE_COLORS.black }}>
            ₹{total.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </p>
        </div>

        {/* Payment Methods */}
        <h2 className="text-lg font-bold mb-4" style={{ color: NIKE_COLORS.black }}>
          Select Payment Method
        </h2>

        <div className="space-y-3 mb-20">
          {/* Card */}
          <button
            onClick={() => setPaymentMethod("card")}
            className="w-full p-4 rounded-lg border-2 flex items-center justify-between transition-colors"
            style={{
              borderColor: paymentMethod === "card" ? NIKE_COLORS.black : NIKE_COLORS.lightGrey,
              backgroundColor: paymentMethod === "card" ? NIKE_COLORS.lightGrey : NIKE_COLORS.white,
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: NIKE_COLORS.white }}
              >
                <CreditCard className="w-6 h-6" style={{ color: NIKE_COLORS.black }} />
              </div>
              <div className="text-left">
                <p className="font-bold text-sm" style={{ color: NIKE_COLORS.black }}>
                  Credit / Debit Card
                </p>
                <p className="text-xs" style={{ color: NIKE_COLORS.grey }}>
                  Visa, Mastercard, Rupay
                </p>
              </div>
            </div>
            {paymentMethod === "card" && (
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: NIKE_COLORS.black }}
              >
                <Check className="w-4 h-4" style={{ color: NIKE_COLORS.white }} />
              </div>
            )}
          </button>

          {/* UPI */}
          <button
            onClick={() => setPaymentMethod("upi")}
            className="w-full p-4 rounded-lg border-2 flex items-center justify-between transition-colors"
            style={{
              borderColor: paymentMethod === "upi" ? NIKE_COLORS.black : NIKE_COLORS.lightGrey,
              backgroundColor: paymentMethod === "upi" ? NIKE_COLORS.lightGrey : NIKE_COLORS.white,
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: NIKE_COLORS.white }}
              >
                <Smartphone className="w-6 h-6" style={{ color: NIKE_COLORS.black }} />
              </div>
              <div className="text-left">
                <p className="font-bold text-sm" style={{ color: NIKE_COLORS.black }}>
                  UPI
                </p>
                <p className="text-xs" style={{ color: NIKE_COLORS.grey }}>
                  GPay, PhonePe, Paytm
                </p>
              </div>
            </div>
            {paymentMethod === "upi" && (
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: NIKE_COLORS.black }}
              >
                <Check className="w-4 h-4" style={{ color: NIKE_COLORS.white }} />
              </div>
            )}
          </button>

          {/* Wallets */}
          <button
            onClick={() => setPaymentMethod("wallet")}
            className="w-full p-4 rounded-lg border-2 flex items-center justify-between transition-colors"
            style={{
              borderColor: paymentMethod === "wallet" ? NIKE_COLORS.black : NIKE_COLORS.lightGrey,
              backgroundColor: paymentMethod === "wallet" ? NIKE_COLORS.lightGrey : NIKE_COLORS.white,
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: NIKE_COLORS.white }}
              >
                <Wallet className="w-6 h-6" style={{ color: NIKE_COLORS.black }} />
              </div>
              <div className="text-left">
                <p className="font-bold text-sm" style={{ color: NIKE_COLORS.black }}>
                  Wallets
                </p>
                <p className="text-xs" style={{ color: NIKE_COLORS.grey }}>
                  Amazon Pay, Paytm, Mobikwik
                </p>
              </div>
            </div>
            {paymentMethod === "wallet" && (
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: NIKE_COLORS.black }}
              >
                <Check className="w-4 h-4" style={{ color: NIKE_COLORS.white }} />
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Pay Button */}
      <div className="p-4 border-t" style={{ borderColor: NIKE_COLORS.lightGrey }}>
        <button
          onClick={handlePayment}
          disabled={!paymentMethod}
          className="w-full py-4 rounded-full font-bold disabled:opacity-50"
          style={{
            backgroundColor: paymentMethod ? NIKE_COLORS.black : NIKE_COLORS.grey,
            color: NIKE_COLORS.white,
          }}
        >
          Pay Now
        </button>
      </div>
    </div>
  );

  // OTP Screen
  const OtpScreen = () => (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 flex items-center border-b" style={{ borderColor: NIKE_COLORS.lightGrey }}>
        <button onClick={() => setScreen("payment")} className="mr-4">
          <ArrowLeft className="w-6 h-6" style={{ color: NIKE_COLORS.black }} />
        </button>
        <h1 className="text-xl font-black" style={{ color: NIKE_COLORS.black }}>
          Verify Payment
        </h1>
      </div>

      <div className="flex-1 flex flex-col justify-center p-8">
        <div className="text-center mb-8">
          <div
            className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: NIKE_COLORS.lightGrey }}
          >
            <Smartphone className="w-10 h-10" style={{ color: NIKE_COLORS.black }} />
          </div>
          <h2 className="text-2xl font-black mb-2" style={{ color: NIKE_COLORS.black }}>
            Enter OTP
          </h2>
          <p className="text-sm" style={{ color: NIKE_COLORS.grey }}>
            We've sent a 6-digit code to your registered mobile number
          </p>
        </div>

        {/* OTP Input */}
        <div className="flex justify-center gap-2 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              className="w-12 h-14 text-center text-2xl font-bold border-2 rounded-lg focus:outline-none"
              style={{
                borderColor: digit ? NIKE_COLORS.black : NIKE_COLORS.lightGrey,
                color: NIKE_COLORS.black,
              }}
            />
          ))}
        </div>

        <div className="mb-6 p-4 rounded-lg text-center" style={{ backgroundColor: NIKE_COLORS.lightGrey }}>
          <p className="text-xs font-semibold" style={{ color: NIKE_COLORS.black }}>
            Demo OTP: 123456
          </p>
        </div>

        <button
          onClick={verifyOtp}
          disabled={otp.some((digit) => !digit)}
          className="w-full py-4 rounded-full font-bold disabled:opacity-50"
          style={{
            backgroundColor: otp.every((digit) => digit) ? NIKE_COLORS.black : NIKE_COLORS.grey,
            color: NIKE_COLORS.white,
          }}
        >
          Verify & Pay
        </button>

        <button className="mt-4 text-center text-sm" style={{ color: NIKE_COLORS.grey }}>
          Resend OTP
        </button>
      </div>
    </div>
  );

  // Confirmation Screen
  const ConfirmationScreen = () => (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-white">
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center mb-6 animate-pulse"
        style={{ backgroundColor: NIKE_COLORS.black }}
      >
        <Check className="w-12 h-12" style={{ color: NIKE_COLORS.white }} />
      </div>

      <h1 className="text-3xl font-black mb-2 text-center" style={{ color: NIKE_COLORS.black }}>
        Order Confirmed!
      </h1>

      <p className="text-center mb-2" style={{ color: NIKE_COLORS.grey }}>
        Your order has been placed successfully
      </p>

      <p className="text-2xl font-bold mb-8" style={{ color: NIKE_COLORS.orange }}>
        ₹{total.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
      </p>

      <div className="w-full max-w-sm mb-8 p-4 rounded-lg" style={{ backgroundColor: NIKE_COLORS.lightGrey }}>
        <div className="flex items-center gap-3 mb-3">
          <Package className="w-5 h-5" style={{ color: NIKE_COLORS.black }} />
          <p className="text-sm font-bold" style={{ color: NIKE_COLORS.black }}>
            Estimated Delivery
          </p>
        </div>
        <p className="text-sm" style={{ color: NIKE_COLORS.grey }}>
          Your order will be delivered in 3-5 business days
        </p>
      </div>

      <button
        onClick={() => {
          setScreen("home");
          setSelectedProduct(null);
          setSelectedSize(null);
          setPaymentMethod(null);
          setOtp(["", "", "", "", "", ""]);
        }}
        className="w-full max-w-sm py-4 rounded-full font-bold"
        style={{ backgroundColor: NIKE_COLORS.black, color: NIKE_COLORS.white }}
      >
        Continue Shopping
      </button>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: NIKE_COLORS.darkGrey }}>
      {/* iPhone Frame */}
      <div className="relative" style={{ width: "375px", height: "95vh", maxHeight: "812px" }}>
        {/* iPhone Notch */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-50 rounded-b-3xl"
          style={{
            width: "200px",
            height: "30px",
            backgroundColor: NIKE_COLORS.black,
          }}
        />

        {/* iPhone Screen */}
        <div
          className="h-full rounded-[3rem] overflow-hidden shadow-2xl relative"
          style={{
            backgroundColor: NIKE_COLORS.white,
            border: `12px solid ${NIKE_COLORS.black}`,
          }}
        >
          {/* Screen Content */}
          <div className="h-full overflow-hidden">
            {screen === "login" && LoginScreen}
            {screen === "home" && <HomeScreen />}
            {screen === "product" && <ProductScreen />}
            {screen === "cart" && <CartScreen />}
            {screen === "payment" && <PaymentScreen />}
            {screen === "otp" && <OtpScreen />}
            {screen === "confirmation" && <ConfirmationScreen />}
          </div>
        </div>

        {/* iPhone Home Indicator */}
        <div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full"
          style={{
            width: "140px",
            height: "5px",
            backgroundColor: NIKE_COLORS.darkGrey,
          }}
        />
      </div>
    </div>
  );
}
