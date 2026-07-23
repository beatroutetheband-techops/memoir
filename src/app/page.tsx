"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Music, Check, ArrowRight, Mail, Phone } from "lucide-react";
import BrandHeader from "@/components/BrandHeader";
import PersonalNote from "@/components/PersonalNote";
import PackageSelector from "@/components/PackageSelector";
import BookingWizard from "@/components/BookingWizard";

// Custom Instagram SVG Icon to bypass registry lucide-react version limit
const Instagram = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState<'basic' | 'pro' | 'ultimate' | 'custom' | null>('pro');

  const handleSelectPackage = (pkg: 'basic' | 'pro' | 'ultimate' | 'custom') => {
    setSelectedPackage(pkg);
  };

  return (
    <div className="min-h-screen bg-brand-ivory text-brand-black flex flex-col justify-between">
      {/* Brand Header */}
      <BrandHeader />

      {/* Main Content */}
      <main className="flex-grow">
        
        {/* HERO SECTION */}
        <section className="bg-brand-black text-brand-ivory py-16 md:py-24 px-4 relative overflow-hidden">
          {/* Subtle grid accent */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#C8A96A08_1px,transparent_1px),linear-gradient(to_bottom,#C8A96A08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
            <span className="text-brand-gold text-xs font-bold tracking-widest uppercase border border-brand-gold/25 px-4 py-1.5 rounded-full bg-brand-gold/5">
              Memoir — Custom Songs by BeatRoute
            </span>
            
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-brand-ivory font-light leading-tight">
              Every Story Deserves <br />
              <span className="font-serif italic text-brand-gold font-normal">Its Own Song.</span>
            </h1>
            
            <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
              We write, compose, and record fully customized studio-quality songs tailored to your personal memories, anniversaries, weddings, and milestones. Memoir by BeatRoute Band.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <a 
                href="#packages"
                className="bg-brand-gold hover:bg-brand-gold-muted text-brand-black text-xs font-bold uppercase tracking-widest px-7 py-3.5 rounded-xl shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer animate-fade-in"
              >
                Explore Plans
              </a>
              <a 
                href="#booking-section"
                className="bg-transparent hover:bg-brand-burgundy/15 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-widest px-7 py-3.5 rounded-xl transition-all cursor-pointer"
              >
                Start Customizing
              </a>
            </div>
          </div>
        </section>

        {/* PERSONAL NOTE FROM THE BAND */}
        <section className="px-4 -mt-10 relative z-20">
          <PersonalNote />
        </section>

        {/* PRICING & PLAN SELECTOR */}
        <section className="bg-brand-ivory">
          <PackageSelector 
            selectedPackage={selectedPackage} 
            onSelectPackage={handleSelectPackage} 
          />
        </section>

        {/* BOOKING FORM SECTION */}
        <section id="booking-section" className="bg-gray-50 border-t border-b border-gray-150 py-16 px-4">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <span className="text-brand-burgundy text-xs font-bold tracking-widest uppercase">Intake Questionnaire</span>
            <h2 className="font-serif text-3xl text-brand-black mt-2 font-bold">Configure Your Custom Track</h2>
            <p className="text-xs text-gray-500 max-w-md mx-auto mt-2 leading-relaxed">
              Answer the prompts below. Our lyricists and composers will use your story notes to write completely custom music.
            </p>
          </div>
          
          <BookingWizard 
            selectedPackage={selectedPackage} 
            onSelectPackage={handleSelectPackage} 
          />
        </section>

        {/* WHY SECTION (Social Proof & Brand Values) */}
        <section className="py-20 px-4 bg-brand-ivory max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-burgundy/5 text-brand-burgundy border border-brand-gold/20">
              <Music size={22} className="text-brand-gold" />
            </div>
            <h3 className="font-serif text-lg font-bold text-brand-black">100% Tailored Composition</h3>
            <p className="text-xs text-gray-650 leading-relaxed">
              We never use templates or generic loops. Every lyric line, melody, vocal harmony, and instrumentation choice is custom-crafted around your specific memories.
            </p>
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-burgundy/5 text-brand-burgundy border border-brand-gold/20">
              <Check size={22} className="text-brand-gold" />
            </div>
            <h3 className="font-serif text-lg font-bold text-brand-black">Lyric Approvals First</h3>
            <p className="text-xs text-gray-650 leading-relaxed">
              We compile your story into a draft PDF. You review and approve the draft lyrics before we enter the studio to record final vocals and instrument tracking.
            </p>
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-burgundy/5 text-brand-burgundy border border-brand-gold/20">
              <ArrowRight size={22} className="text-brand-gold" />
            </div>
            <h3 className="font-serif text-lg font-bold text-brand-black">Professional Production</h3>
            <p className="text-xs text-gray-650 leading-relaxed">
              All tracks are mixed and mastered using premium studio gear, ensuring clean radio-ready outputs suitable for streaming, sharing, or playing on massive sound systems.
            </p>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-brand-black text-brand-ivory border-t border-brand-gold/15 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Image 
                src="/memoir-logo-horizontal.png" 
                alt="Memoir by BeatRoute Band" 
                width={180} 
                height={45} 
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-[10px] text-gray-400 max-w-xs">
              Hand-crafting custom studio songs, acoustics, and cinematic compositions for life&apos;s special memories.
            </p>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-xs text-gray-300">
            <a 
              href="https://wa.me/918148066421" 
              target="_blank" 
              className="flex items-center gap-2 hover:text-brand-gold transition-colors whitespace-nowrap flex-shrink-0"
            >
              <Phone size={14} className="text-brand-gold" />
              <span>+91 81480 66421</span>
            </a>
            <a 
              href="https://www.instagram.com/beat.route_/" 
              target="_blank" 
              className="flex items-center gap-2 hover:text-brand-gold transition-colors whitespace-nowrap flex-shrink-0"
            >
              <Instagram size={14} className="text-brand-gold" />
              <span>@beat.route_</span>
            </a>
            <a 
              href="mailto:beatroutetheband@gmail.com" 
              className="flex items-center gap-2 hover:text-brand-gold transition-colors whitespace-nowrap flex-shrink-0"
            >
              <Mail size={14} className="text-brand-gold" />
              <span>beatroutetheband@gmail.com</span>
            </a>
          </div>

          <div className="text-[10px] text-gray-550 flex flex-col items-center md:items-end gap-1">
            <span>&copy; {new Date().getFullYear()} Memoir by BeatRoute Band. All rights reserved.</span>
            <Link href="/admin" className="hover:text-brand-gold text-[9px] uppercase tracking-wider text-gray-650 transition-colors">
              Admin Access
            </Link>
          </div>

        </div>
      </footer>
    </div>
  );
}
