"use client";

import Link from "next/link";
import Image from "next/image";
import { Music, Shield } from "lucide-react";

interface BrandHeaderProps {
  isAdmin?: boolean;
}

export default function BrandHeader({ isAdmin = false }: BrandHeaderProps) {
  return (
    <header className="bg-brand-black text-brand-ivory border-b border-brand-gold/20 py-4 px-6 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 hover:opacity-90 transition-opacity">
          <Image 
            src="/logo.png" 
            alt="BeatRoute Logo" 
            width={120} 
            height={36} 
            className="h-9 w-auto object-contain"
            priority
          />
          <div className="hidden sm:block h-6 w-px bg-brand-gold/30"></div>
          <div className="hidden sm:flex flex-col">
            <span className="font-serif text-sm tracking-widest text-brand-gold font-bold uppercase">Custom Songs</span>
            <span className="text-[10px] text-gray-400 tracking-wider">by BeatRoute Band</span>
          </div>
        </Link>

        <nav className="flex items-center gap-6">
          {isAdmin ? (
            <>
              <Link 
                href="/" 
                className="text-xs sm:text-sm font-medium tracking-wider hover:text-brand-gold transition-colors flex items-center gap-1.5"
              >
                <Music size={15} />
                User Portal
              </Link>
              <span className="bg-brand-gold/10 text-brand-gold border border-brand-gold/30 px-2.5 py-0.5 rounded text-[10px] tracking-widest font-semibold uppercase">
                Admin Area
              </span>
            </>
          ) : (
            <>
              <a 
                href="#packages" 
                className="text-xs sm:text-sm font-medium tracking-wider hover:text-brand-gold transition-colors"
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
