"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Play, Sparkles, ArrowRight, ExternalLink, Smartphone, ShoppingCart, BarChart3, Utensils } from "lucide-react";
import { track } from '@vercel/analytics';

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--snow)]">
      {/* Enhanced Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--snow)]/80 backdrop-blur-xl border-b border-[var(--mist)]/30">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-gradient-to-br from-[var(--midnight)] to-[var(--charcoal)] flex items-center justify-center shadow-md">
              <Sparkles className="w-6 h-6 text-[var(--snow)]" />
            </div>
            <span className="font-bold text-xl text-[var(--midnight)]" style={{fontFamily: 'var(--font-josefin-sans)'}}>Desktop Apps</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium" style={{fontFamily: 'var(--font-eb-garamond)'}}>
            <Link 
              href="#services" 
              className="text-[var(--charcoal)] hover:text-[var(--midnight)] transition-colors"
              onClick={() => track('Navigation Service Click')}
            >
              Service
            </Link>
            <Link 
              href="#portfolios" 
              className="text-[var(--charcoal)] hover:text-[var(--midnight)] transition-colors"
              onClick={() => track('Navigation Portfolios Click')}
            >
              Portfolios
            </Link>
            <Link 
              href="#pricing" 
              className="text-[var(--charcoal)] hover:text-[var(--midnight)] transition-colors"
              onClick={() => track('Navigation Pricing Click')}
            >
              Pricing
            </Link>
            <Link 
              href="#case-study" 
              className="text-[var(--charcoal)] hover:text-[var(--midnight)] transition-colors"
              onClick={() => track('Navigation Case Study Click')}
            >
              Case study
            </Link>
            <Link 
              href="#about" 
              className="text-[var(--charcoal)] hover:text-[var(--midnight)] transition-colors"
              onClick={() => track('Navigation About Click')}
            >
              About
            </Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Link 
              href="#" 
              className="hidden md:flex text-[var(--charcoal)] hover:text-[var(--midnight)] text-sm font-medium" 
              style={{fontFamily: 'var(--font-eb-garamond)'}}
              onClick={() => track('Header Sign In Click')}
            >
              Sign In
            </Link>
            <button 
              className="join-button px-6 py-2 text-sm" 
              style={{fontFamily: 'var(--font-eb-garamond)'}}
              onClick={() => track('Header Contact Click')}
            >
              Contact
            </button>
            <button className="md:hidden">
              <Menu className="w-6 h-6 text-[var(--midnight)]" />
            </button>
          </div>
        </div>
      </header>

      {/* Amazing Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-20 relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[var(--snow)] border border-[var(--mist)] rounded-full px-4 py-2 mb-8 shadow-md">
              <div className="w-2 h-2 bg-[var(--softorange)] rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-[var(--charcoal)]" style={{fontFamily: 'var(--font-eb-garamond)'}}>
                  @Desktop @Software @Development
                </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--midnight)] leading-tight mb-6" style={{fontFamily: 'var(--font-josefin-sans)'}}>
              Build Powerful{' '}
              <span className="bg-gradient-to-r from-[var(--softorange)] to-[var(--sandyellow)] bg-clip-text text-transparent">
                Desktop Apps
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-[var(--charcoal)] max-w-2xl lg:mx-0 mx-auto leading-relaxed mb-8" style={{fontFamily: 'var(--font-eb-garamond)'}}>
              Transform your business with custom desktop applications. We create robust, scalable, and user-friendly software solutions that streamline operations and boost productivity.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
              <button 
                className="join-button flex items-center gap-2 px-8 py-4 text-lg" 
                style={{fontFamily: 'var(--font-eb-garamond)'}}
                onClick={() => track('Hero Get Started Click')}
              >
                Get Started
              </button>
              <button 
                className="flex items-center gap-2 px-8 py-4 text-lg font-medium text-[var(--midnight)] bg-[var(--snow)] border-2 border-[var(--mist)] rounded-full hover:border-[var(--midnight)] transition-all duration-300 shadow-md" 
                style={{fontFamily: 'var(--font-eb-garamond)'}}
                onClick={() => track('Hero View Portfolio Click')}
              >
                <Play className="w-5 h-5" />
                View Portfolio
              </button>
            </div>

            {/* Powered by section */}
            <div className="mb-8">
              <p className="text-sm text-[var(--charcoal)] mb-4" style={{fontFamily: 'var(--font-eb-garamond)'}}>
                Powered by
              </p>
              <div className="flex flex-wrap items-center gap-6 opacity-60">
                <div className="text-sm font-medium text-[var(--charcoal)]">QMS Total</div>
                <div className="text-sm font-medium text-[var(--charcoal)]">LCGC</div>
                <div className="text-sm font-medium text-[var(--charcoal)]">Calforms</div>
                <div className="text-sm font-medium text-[var(--charcoal)]">TruGold</div>
                <div className="text-sm font-medium text-[var(--charcoal)]">WeighWise</div>
              </div>
            </div>
          </div>

          {/* Right Content - Single Image with Statistics Cards */}
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative">
              {/* Single Main Image */}
              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  src="/2.jpg"
                  alt="Desktop Apps Team and Success"
                  width={400}
                  height={400}
                  className="w-full h-auto object-cover rounded-2xl"
                  priority
                />
              </div>

              {/* Statistics Cards */}
              {/* Top Left - 124K+ */}
              <div className="absolute -top-4 -left-8 bg-[var(--softorange)] text-white rounded-2xl p-4 shadow-xl z-10">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex -space-x-1">
                    <div className="w-6 h-6 bg-white/90 rounded-full"></div>
                    <div className="w-6 h-6 bg-yellow-500/90 rounded-full"></div>
                    <div className="w-6 h-6 bg-green-600/80 rounded-full"></div>
                  </div>
                </div>
                <div className="text-2xl font-bold">150+</div>
                <div className="text-sm opacity-90">apps delivered</div>
              </div>

              {/* Top Right - 58% */}
              <div className="absolute -top-8 -right-8 bg-[var(--midnight)] text-white rounded-2xl p-4 shadow-xl z-10">
                <div className="text-3xl font-bold text-[var(--softorange)]">99%</div>
                <div className="text-sm opacity-90">client</div>
                <div className="text-sm opacity-90">satisfaction</div>
              </div>

              {/* Bottom Right - 14K */}
              <div className="absolute -bottom-4 -right-8 bg-[var(--midnight)] text-white rounded-2xl p-4 shadow-xl z-10">
                <div className="text-2xl font-bold text-[var(--softorange)]">24/7</div>
                <div className="text-sm opacity-90">support &</div>
                <div className="text-sm opacity-90">maintenance</div>
              </div>

              {/* Bottom Left - 5.8K */}
              <div className="absolute -bottom-8 -left-8 bg-[var(--midnight)] text-white rounded-2xl p-4 shadow-xl z-10">
                <div className="text-2xl font-bold text-[var(--softorange)]">5+</div>
                <div className="text-sm opacity-90">years experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-study" className="py-20 px-4 bg-[var(--skymist)]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[var(--snow)] border border-[var(--mist)] rounded-full px-4 py-2 mb-6 shadow-md">
              <div className="w-2 h-2 bg-[var(--softorange)] rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-[var(--charcoal)]" style={{fontFamily: 'var(--font-eb-garamond)'}}>
                Live Projects & Demos
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--midnight)] mb-6" style={{fontFamily: 'var(--font-josefin-sans)'}}>
              Case Studies & 
              <span className="bg-gradient-to-r from-[var(--softorange)] to-[var(--sandyellow)] bg-clip-text text-transparent"> Live Demos</span>
            </h2>
            
            <p className="text-lg text-[var(--charcoal)] max-w-3xl mx-auto leading-relaxed" style={{fontFamily: 'var(--font-eb-garamond)'}}>
              Explore our portfolio of interactive applications. Each project demonstrates different aspects of modern web development, 
              from responsive design to complex user interactions.
            </p>
          </div>

          {/* Case Studies Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Foodie App Card */}
            <div className="group bg-[var(--snow)] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-48 bg-gradient-to-br from-[#FC8019] to-[#FF6F00] overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <Utensils className="w-6 h-6 text-white" />
                  <span className="text-white font-semibold">Food Delivery</span>
                </div>
                <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg p-2">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl">🍔</div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-[#FC8019] rounded-full"></div>
                  <span className="text-sm font-medium text-[var(--charcoal)]" style={{fontFamily: 'var(--font-eb-garamond)'}}>
                    PWA • Mobile First
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-[var(--midnight)] mb-3" style={{fontFamily: 'var(--font-josefin-sans)'}}>
                  Foodie - Food Delivery App
                </h3>
                
                <p className="text-[var(--charcoal)] text-sm leading-relaxed mb-4" style={{fontFamily: 'var(--font-eb-garamond)'}}>
                  Complete Swiggy clone with restaurant browsing, cart management, payment flow, and order tracking. 
                  Built as a Progressive Web App with offline support.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-[var(--mist)] text-[var(--charcoal)] text-xs rounded-full">React</span>
                  <span className="px-2 py-1 bg-[var(--mist)] text-[var(--charcoal)] text-xs rounded-full">PWA</span>
                  <span className="px-2 py-1 bg-[var(--mist)] text-[var(--charcoal)] text-xs rounded-full">Tailwind</span>
                  <span className="px-2 py-1 bg-[var(--mist)] text-[var(--charcoal)] text-xs rounded-full">Mobile</span>
                </div>
                
                <Link 
                  href="/foodie"
                  className="inline-flex items-center gap-2 text-[var(--softorange)] hover:text-[var(--midnight)] font-semibold text-sm group-hover:gap-3 transition-all duration-300"
                  style={{fontFamily: 'var(--font-eb-garamond)'}}
                  onClick={() => track('Case Study Foodie Click')}
                >
                  View Live Demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* E-commerce Card */}
            <div className="group bg-[var(--snow)] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-48 bg-gradient-to-br from-[#667EEA] to-[#764BA2] overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <ShoppingCart className="w-6 h-6 text-white" />
                  <span className="text-white font-semibold">E-commerce</span>
                </div>
                <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg p-2">
                  <ExternalLink className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl">🛒</div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-[#667EEA] rounded-full"></div>
                  <span className="text-sm font-medium text-[var(--charcoal)]" style={{fontFamily: 'var(--font-eb-garamond)'}}>
                    Full Stack • Responsive
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-[var(--midnight)] mb-3" style={{fontFamily: 'var(--font-josefin-sans)'}}>
                  E-commerce Platform
                </h3>
                
                <p className="text-[var(--charcoal)] text-sm leading-relaxed mb-4" style={{fontFamily: 'var(--font-eb-garamond)'}}>
                  Modern e-commerce solution with product catalog, shopping cart, checkout process, and user authentication. 
                  Optimized for conversion and user experience.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-[var(--mist)] text-[var(--charcoal)] text-xs rounded-full">Next.js</span>
                  <span className="px-2 py-1 bg-[var(--mist)] text-[var(--charcoal)] text-xs rounded-full">TypeScript</span>
                  <span className="px-2 py-1 bg-[var(--mist)] text-[var(--charcoal)] text-xs rounded-full">Stripe</span>
                  <span className="px-2 py-1 bg-[var(--mist)] text-[var(--charcoal)] text-xs rounded-full">Auth</span>
                </div>
                
                <Link 
                  href="/ecommerce"
                  className="inline-flex items-center gap-2 text-[var(--softorange)] hover:text-[var(--midnight)] font-semibold text-sm group-hover:gap-3 transition-all duration-300"
                  style={{fontFamily: 'var(--font-eb-garamond)'}}
                  onClick={() => track('Case Study Ecommerce Click')}
                >
                  View Live Demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Pharmify Card */}
            <div className="group bg-[var(--snow)] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-48 bg-green-500 overflow-hidden">
                <div className="absolute inset-0 bg-black/5"></div>
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl">💊</span>
                  </div>
                  <span className="text-white font-bold text-lg">Pharmify</span>
                </div>
                <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm rounded-xl p-2">
                  <ExternalLink className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-7xl">🏥</div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-[var(--charcoal)]" style={{fontFamily: 'var(--font-eb-garamond)'}}>
                    Clean Design • Healthcare Focus
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-[var(--midnight)] mb-2" style={{fontFamily: 'var(--font-josefin-sans)'}}>
                  Pharmify - Medicine App
                </h3>
                
                <p className="text-[var(--charcoal)] mb-4 text-sm leading-relaxed" style={{fontFamily: 'var(--font-eb-garamond)'}}>
                  Clean 5-step onboarding with simple green design, gray icons, professional healthcare UX, and smooth user experience.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">Clean UI</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">Simple Icons</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">Healthcare</span>
                </div>
                
                <Link 
                  href="/pharmify"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-semibold text-sm group-hover:gap-3 transition-all duration-300 transform hover:scale-105"
                  style={{fontFamily: 'var(--font-eb-garamond)'}}
                  onClick={() => track('Case Study Pharmify Click')}
                >
                  Try Onboarding
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Dashboard Card */}
            <div className="group bg-[var(--snow)] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-48 bg-gradient-to-br from-[#11998E] to-[#38EF7D] overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-white" />
                  <span className="text-white font-semibold">Analytics</span>
                </div>
                <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg p-2">
                  <ExternalLink className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl">📊</div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-[#11998E] rounded-full"></div>
                  <span className="text-sm font-medium text-[var(--charcoal)]" style={{fontFamily: 'var(--font-eb-garamond)'}}>
                    Data Viz • Interactive
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-[var(--midnight)] mb-3" style={{fontFamily: 'var(--font-josefin-sans)'}}>
                  Analytics Dashboard
                </h3>
                
                <p className="text-[var(--charcoal)] text-sm leading-relaxed mb-4" style={{fontFamily: 'var(--font-eb-garamond)'}}>
                  Comprehensive business intelligence dashboard with real-time data visualization, interactive charts, 
                  and advanced filtering capabilities.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-[var(--mist)] text-[var(--charcoal)] text-xs rounded-full">React</span>
                  <span className="px-2 py-1 bg-[var(--mist)] text-[var(--charcoal)] text-xs rounded-full">Charts</span>
                  <span className="px-2 py-1 bg-[var(--mist)] text-[var(--charcoal)] text-xs rounded-full">D3.js</span>
                  <span className="px-2 py-1 bg-[var(--mist)] text-[var(--charcoal)] text-xs rounded-full">Real-time</span>
                </div>
                
                <Link 
                  href="/dashboard"
                  className="inline-flex items-center gap-2 text-[var(--softorange)] hover:text-[var(--midnight)] font-semibold text-sm group-hover:gap-3 transition-all duration-300"
                  style={{fontFamily: 'var(--font-eb-garamond)'}}
                  onClick={() => track('Case Study Dashboard Click')}
                >
                  View Live Demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-[var(--snow)] rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-[var(--midnight)] mb-4" style={{fontFamily: 'var(--font-josefin-sans)'}}>
                Ready to Build Your Next Project?
              </h3>
              <p className="text-[var(--charcoal)] mb-6" style={{fontFamily: 'var(--font-eb-garamond)'}}>
                Let's discuss how we can create a custom solution tailored to your business needs.
              </p>
              <button 
                className="join-button px-8 py-3 text-lg" 
                style={{fontFamily: 'var(--font-eb-garamond)'}}
                onClick={() => track('Case Studies CTA Click')}
              >
                Start Your Project
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--midnight)] text-[var(--snow)] py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="size-10 rounded-xl bg-gradient-to-br from-[var(--softorange)] to-[var(--sandyellow)] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[var(--midnight)]" />
            </div>
            <span className="font-bold text-xl" style={{fontFamily: 'var(--font-josefin-sans)'}}>Desktop Apps</span>
          </div>
          
          <p className="text-[var(--mist)] mb-6" style={{fontFamily: 'var(--font-eb-garamond)'}}>
            Building the future, one application at a time.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm" style={{fontFamily: 'var(--font-eb-garamond)'}}>
            <Link href="#services" className="text-[var(--mist)] hover:text-[var(--softorange)] transition-colors">Services</Link>
            <Link href="#portfolios" className="text-[var(--mist)] hover:text-[var(--softorange)] transition-colors">Portfolio</Link>
            <Link href="#case-study" className="text-[var(--mist)] hover:text-[var(--softorange)] transition-colors">Case Studies</Link>
            <Link href="#about" className="text-[var(--mist)] hover:text-[var(--softorange)] transition-colors">About</Link>
          </div>
          
          <div className="border-t border-[var(--charcoal)] mt-8 pt-8 text-sm text-[var(--mist)]" style={{fontFamily: 'var(--font-eb-garamond)'}}>
            © 2024 Desktop Apps. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
