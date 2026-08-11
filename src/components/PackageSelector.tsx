"use client";

import { Check } from "lucide-react";

interface Package {
  id: 'basic' | 'pro' | 'ultimate' | 'custom';
  name: string;
  price: string;
  isPopular?: boolean;
  desc: string;
  bullets: string[];
}

const packages: Package[] = [
  {
    id: 'basic',
    name: "Basic",
    price: "₹7,000",
    desc: "A beautiful, acoustic song to capture your core memories.",
    bullets: [
      "1-minute original song length",
      "Acoustic guitar or piano backing",
      "Solo vocalist (Male or Female)",
      "Personalized lyrics & melody",
      "Delivery within 7 days",
      "Lyric approval before recording"
    ]
  },
  {
    id: 'pro',
    name: "Pro",
    price: "₹10,000",
    isPopular: true,
    desc: "Enhanced arrangement with deeper musical layering.",
    bullets: [
      "Up to 2-minute original song",
      "Layered with dual instruments",
      "Solo vocalist (Male or Female)",
      "Professional mixing & mastering",
      "Delivery within 5 days",
      "One round of song revisions"
    ]
  },
  {
    id: 'ultimate',
    name: "Ultimate",
    price: "₹15,000",
    desc: "Full studio cinematic production for the ultimate gift.",
    bullets: [
      "Up to 3-minute original song",
      "Rich multi-instrument arrangement",
      "Male/Female duet option",
      "Premium studio production",
      "Priority 3-day delivery",
      "Two rounds of song revisions"
    ]
  },
  {
    id: 'custom',
    name: "Custom",
    price: "Enquire",
    desc: "Tailored to your specific scale, vision and style.",
    bullets: [
      "Custom song length & structure",
      "Full band or orchestral production",
      "Multi-vocalist / choir backing",
      "Special instrument requests",
      "Express priority delivery options",
      "Unlimited revisions & support"
    ]
  }
];

interface PackageSelectorProps {
  selectedPackage: string | null;
  onSelectPackage: (id: Package['id']) => void;
}

export default function PackageSelector({ selectedPackage, onSelectPackage }: PackageSelectorProps) {
  return (
    <div id="packages" className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-14">
        <span className="text-brand-gold-muted text-xs font-bold tracking-widest uppercase bg-brand-gold/10 border border-brand-gold/25 px-3.5 py-1 rounded-full">
          Choose Your Package
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-brand-black mt-3 font-bold">Select the Perfect Soundtrack</h2>
        <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {packages.map((pkg) => {
          const isSelected = selectedPackage === pkg.id;

          return (
            <div
              key={pkg.id}
              className={`rounded-2xl p-6.5 transition-all duration-300 relative flex flex-col justify-between border ${
                isSelected
                  ? "gold-gradient-btn text-brand-black border-brand-gold shadow-xl gold-glow"
                  : "bg-white text-brand-black border-gray-200 hover:border-brand-gold/50 hover:shadow-sm"
              }`}
            >
              {pkg.isPopular && (
                <span className="absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-[#0A0A0D] text-white text-[9px] font-bold tracking-widest py-1 px-3.5 rounded-full uppercase shadow-md border border-brand-gold/30">
                  Most Popular
                </span>
              )}

              <div>
                {/* Header */}
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-serif text-xl font-bold text-brand-black">
                    {pkg.name}
                  </h3>
                  <span className={`font-sans text-lg ${isSelected ? "font-extrabold text-brand-black" : "font-bold text-brand-gold-muted"}`}>
                    {pkg.price}
                  </span>
                </div>
                
                <p className={`text-xs mb-6 leading-relaxed font-medium ${isSelected ? "text-zinc-900" : "text-gray-500"}`}>
                  {pkg.desc}
                </p>

                {/* Bullets */}
                <ul className="space-y-3.5 mb-8">
                  {pkg.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs">
                      <Check 
                        size={14} 
                        className={`flex-none mt-0.5 ${isSelected ? "text-brand-black" : "text-brand-gold-muted"}`} 
                      />
                      <span className={`font-medium ${isSelected ? "text-zinc-900" : "text-gray-700"}`}>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Select Button */}
              <button
                type="button"
                onClick={() => onSelectPackage(pkg.id)}
                className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[#0A0A0D] text-white shadow-md border border-brand-gold/40"
                    : "bg-zinc-950 hover:bg-brand-black text-white shadow-sm"
                }`}
              >
                {isSelected ? "Selected" : pkg.id === 'custom' ? "Enquire Now" : "Select Plan"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
