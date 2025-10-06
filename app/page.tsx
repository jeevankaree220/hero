import Image from "next/image";
import Link from "next/link";
import { Star, Menu } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-100 ">
      {/* Transparent Navbar */}
      <header className=" fixed top-0 left-0 right-0 z-50 bg-stone-100 backdrop-blur-md border-b border-gray-200/20">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-[var(--text-dark)] flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            {/* <span className="font-bold text-lg text-[var(--text-dark)]" style={{fontFamily: 'var(--font-josefin-sans)'}}>Walt</span> */}
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium" style={{fontFamily: 'var(--font-eb-garamond)'}}>
            <Link href="#features" className="text-[var(--text-gray)] hover:text-[var(--text-dark)] transition-colors">Features</Link>
            <Link href="#pricing" className="text-[var(--text-gray)] hover:text-[var(--text-dark)] transition-colors">Pricing</Link>
            <Link href="#about" className="text-[var(--text-gray)] hover:text-[var(--text-dark)] transition-colors">About</Link>
            <Link href="#contact" className="text-[var(--text-gray)] hover:text-[var(--text-dark)] transition-colors">Contact</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Link href="#" className="hidden md:flex text-[var(--text-gray)] hover:text-[var(--text-dark)] text-sm font-medium" style={{fontFamily: 'var(--font-eb-garamond)'}}>
              Sign In
            </Link>
            <button className="join-button px-6 py-2" style={{fontFamily: 'var(--font-eb-garamond)'}}>
              Explore My Dashboard
            </button>
            <button className="md:hidden">
              <Menu className="w-6 h-6 text-[var(--text-dark)]" />
            </button>
          </div>
        </div>
      </header>

      {/* Waitlist Hero Section - With Hero Image */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
         

          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--text-dark)] leading-tight mb-6" style={{fontFamily: 'var(--font-josefin-sans)'}}>
              Get Early Access to<br />
              Smart AI Assistance.
            </h1>
            
            <p className="text-lg md:text-xl text-[var(--text-gray)] max-w-2xl mx-auto leading-relaxed" style={{fontFamily: 'var(--font-eb-garamond)'}}>
              Be amongst the first to experience Walt and launch a viral waitlist.<br />
              Sign up to be notified when we launch!
            </p>
          </div>

          {/* Email Signup Form */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="email-input flex-1 min-w-0"
                style={{fontFamily: 'var(--font-eb-garamond)'}}
              />
              <button className="join-button whitespace-nowrap" style={{fontFamily: 'var(--font-eb-garamond)'}}>
                Start Exploring
              </button>
            </div>
          </div>

          {/* Star Rating */}
          {/* <div className="mb-16">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 star-rating fill-current" />
                ))}
              </div>
              <span className="text-sm font-semibold text-[var(--text-dark)] ml-2" style={{fontFamily: 'var(--font-eb-garamond)'}}>4.9 rating</span>
            </div>
            <p className="text-sm text-[var(--text-gray)]" style={{fontFamily: 'var(--font-eb-garamond)'}}>Based on 300k Users</p>
          </div> */}

          {/* Hero Image */}
          {/* <div className="relative mt-16">
            <div className="relative z-10 max-w-4xl mx-auto">
              <Image
                src="/hero.png"
                alt="Smart AI Assistance - Hero Image"
                width={600}
                height={400}
                className="md:w-full md:h-auto w-full h-auto md:mx-auto object-contain"
                priority
              />
            </div>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl">
              <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-pink-100/30 to-orange-100/30 rounded-full blur-3xl"></div>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
}
