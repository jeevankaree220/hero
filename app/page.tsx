import Image from "next/image";
import Link from "next/link";
import { Star, Menu, Smartphone, Zap, Shield, Users, ArrowRight, Play, CheckCircle, Sparkles } from "lucide-react";
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
    </div>
  );
}
