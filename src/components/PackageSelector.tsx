"use client";

import { Check, Info } from "lucide-react";

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
    <div id="packages" className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <span className="text-brand-gold text-xs font-bold tracking-widest uppercase">Choose Your Package</span>
        <h2 className="font-serif text-3xl sm:text-4xl text-brand-black mt-2 font-bold">Select the Perfect Soundtrack</h2>
        <div className="w-16 h-0.5 bg-brand-gold mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`rounded-2xl p-6 transition-all duration-300 relative flex flex-col justify-between border ${
              pkg.isPopular
                ? "bg-brand-burgundy text-brand-ivory border-brand-gold shadow-lg"
                : selectedPackage === pkg.id
                ? "bg-white text-brand-black border-brand-burgundy ring-2 ring-brand-burgundy/20"
                : "bg-white text-brand-black border-gray-200 hover:border-brand-gold/50"
            }`}
          >
            {pkg.isPopular && (
              <span className="absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-brand-gold text-brand-black text-[9px] font-bold tracking-widest py-1 px-3 rounded-full uppercase">
                Most Popular
              </span>
            )}

            <div className="w-100%">
              {/* Header */}
              <div className="flex justify-between items-baseline mb-2">
                <h3 className={`font-serif text-xl font-bold ${pkg.isPopular ? "text-brand-ivory" : "text-brand-black"}`}>
                  {pkg.name}
                </h3>
                <span className={`font-serif text-lg font-bold ${pkg.isPopular ? "text-brand-gold" : "text-brand-burgundy"}`}>
                  {pkg.price}
                </span>
              </div>
              
              <p className={`text-xs mb-6 leading-relaxed ${pkg.isPopular ? "text-gray-300" : "text-gray-500"}`}>
                {pkg.desc}
              </p>

              {/* Bullets */}
              <ul className="space-y-3.5 mb-8">
                {pkg.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs">
                    <Check 
                      size={14} 
                      className={`flex-none mt-0.5 ${pkg.isPopular ? "text-brand-gold" : "text-brand-gold-muted"}`} 
                    />
                    <span className={pkg.isPopular ? "text-gray-200" : "text-gray-700"}>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Select Button */}
            <button
              type="button"
              onClick={() => onSelectPackage(pkg.id)}
              className={`w-full py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                pkg.isPopular
                  ? "bg-brand-gold hover:bg-brand-gold-muted text-brand-black"
                  : selectedPackage === pkg.id
                  ? "bg-brand-burgundy hover:bg-brand-burgundy-light text-brand-ivory"
                  : "bg-gray-100 hover:bg-brand-burgundy hover:text-brand-ivory text-brand-black"
              }`}
            >
              {selectedPackage === pkg.id ? "Selected" : pkg.id === 'custom' ? "Enquire Now" : "Select Plan"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
