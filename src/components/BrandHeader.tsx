"use client";

import Link from "next/link";
import Image from "next/image";
import { Music } from "lucide-react";

interface BrandHeaderProps {
  isAdmin?: boolean;
}

export default function BrandHeader({ isAdmin = false }: BrandHeaderProps) {
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      e.preventDefault();
      const heroElement = document.getElementById("hero");
      if (heroElement) {
        heroElement.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <header className="bg-[#0A0A0D]/90 backdrop-blur-md text-brand-ivory border-b border-brand-gold/20 py-3.5 px-6 sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Brand Logos: Memoir + BeatRoute */}
        <Link 
          href="/#hero" 
          onClick={handleLogoClick}
          className="flex items-center gap-3.5 hover:opacity-90 transition-opacity cursor-pointer"
        >
          <Image 
            src="/memoir.png" 
            alt="Memoir Logo" 
            width={160} 
            height={50} 
            className="h-9 w-auto object-contain brightness-105"
            priority
          />
          <div className="h-4 w-px bg-brand-gold/30"></div>
          <Image 
            src="/logo.png" 
            alt="BeatRoute Logo" 
            width={110} 
            height={36} 
            className="h-6 w-auto object-contain opacity-90"
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          {isAdmin ? (
            <>
              <Link 
                href="/" 
                className="text-xs sm:text-sm font-medium tracking-wider text-brand-ivory hover:text-brand-gold transition-colors flex items-center gap-1.5"
              >
                <Music size={15} className="text-brand-gold" />
                User Portal
              </Link>
              <span className="bg-brand-gold/10 text-brand-gold border border-brand-gold/30 px-3 py-1 rounded-full text-[10px] tracking-widest font-bold uppercase shadow-sm">
                Admin Area
              </span>
            </>
          ) : (
            <>
              <a 
                href="#packages" 
                className="text-xs sm:text-sm font-semibold tracking-wider text-brand-gold hover:text-brand-ivory transition-colors px-4 py-2 rounded-xl bg-brand-gold/10 border border-brand-gold/25 hover:border-brand-gold/50 cursor-pointer"
              >
                View Plans
              </a>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
