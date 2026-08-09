"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Calendar, HelpCircle, CheckCircle, ChevronDown, FileText, MessageCircle } from "lucide-react";
import { bookingService } from "@/services/bookingService";

const languages = ["Tamil", "Telugu", "Hindi", "Malayalam", "English", "Bengali", "Kannada"];
const occasions = [
  "Birthday", "Anniversary", "Proposal", "Wedding", 
  "Siblings", "Spouses", "Baby Showers", "Friendship", "Other"
];
const countries = ["India", "International (Outside India)"];
const statesOfIndia = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi (NCR)",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
  "Other State"
];


interface Addon {
  id: string;
  name: string;
  price: number;
  desc: string;
}

const addonsList: Addon[] = [
  { id: "live_instruments", name: "Extra Live Instruments", price: 3000, desc: "Recording with live violin, flute, or percussion sessions" },
  { id: "duet_vocals", name: "Additional Vocalist (Duet)", price: 2500, desc: "Male/Female duet pairing for richer storytelling" },
  { id: "rush_delivery", name: "Rush 48-Hour Delivery", price: 3000, desc: "Prioritized express mixing, mastering, and dispatch" }
];

const planPrices = {
  basic: 7000,
  pro: 10000,
  ultimate: 15000,
  custom: 0
};

const planDetails = {
  basic: { title: "Basic", priceDisplay: "₹7,000", tag: "Acoustic Solo", desc: "1-min song • Acoustic guitar/piano • 7-day delivery" },
  pro: { title: "Pro", priceDisplay: "₹10,000", tag: "Most Popular", desc: "Up to 2-min song • Dual instruments • Studio mix & master • 5-day delivery" },
  ultimate: { title: "Ultimate", priceDisplay: "₹15,000", tag: "Full Production", desc: "Up to 3-min song • Multi-instrument • Duet option • Priority 3-day delivery" },
  custom: { title: "Custom", priceDisplay: "Enquire", tag: "Tailored Scale", desc: "Custom length & band/orchestral scale" }
};

interface BookingWizardProps {
  selectedPackage: 'basic' | 'pro' | 'ultimate' | 'custom' | null;
  onSelectPackage: (pkg: 'basic' | 'pro' | 'ultimate' | 'custom') => void;
}

export default function BookingWizard({ selectedPackage, onSelectPackage }: BookingWizardProps) {
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState({
    client_name: "",
    whatsapp: "",
    location: "Chennai, Tamil Nadu",
    language: "English",
    occasion: "Anniversary",
    occasion_date: "",
    relationship_history: "",
    favorite_memories: "",
    selected_addons: [] as string[]
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [country, setCountry] = useState<string>("India");
  const [selectedState, setSelectedState] = useState<string>("Tamil Nadu");
  const [customCountry, setCustomCountry] = useState<string>("");
  const [customState, setCustomState] = useState<string>("");

  // Sync state changes to form location string
  useEffect(() => {
    let locStr = "";
    if (country === "India") {
      const stateName = selectedState === "Other State" ? (customState.trim() || "Other State") : selectedState;
      locStr = `${stateName}, India`;
    } else {
      const countryName = customCountry.trim() || "International";
      locStr = customState.trim() ? `${customState.trim()}, ${countryName}` : countryName;
    }
    setForm(prev => ({ ...prev, location: locStr }));
  }, [country, selectedState, customCountry, customState]);

  const handleCountryChange = (c: string) => {
    setCountry(c);
    if (c === "India") {
      setSelectedState("Tamil Nadu");
    } else {
      setSelectedState("");
    }
    setCustomCountry("");
    setCustomState("");
  };

  const handleStateChange = (s: string) => {
    setSelectedState(s);
    setCustomState("");
  };



  // Calculate pricing breakdown
  const basePrice = selectedPackage ? planPrices[selectedPackage] : 0;
  const addonsPrice = form.selected_addons.reduce((acc, addonId) => {
    const addon = addonsList.find(a => a.id === addonId);
    return acc + (addon ? addon.price : 0);
  }, 0);
  const totalPrice = basePrice + addonsPrice;

  // Form field changes
  const handleChange = (field: string, val: any) => {
    setForm(prev => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  // Add-on selection toggle
  const handleToggleAddon = (id: string) => {
    const current = [...form.selected_addons];
    const index = current.indexOf(id);
    if (index === -1) {
      current.push(id);
    } else {
      current.splice(index, 1);
    }
    handleChange("selected_addons", current);
  };

  // Step Validation
  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!selectedPackage) {
      newErrors.package = "Please select a plan above to continue booking.";
      setErrors(newErrors);
      // Scroll to packages section
      document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" });
      return false;
    }

    if (step === 1) {
      if (!form.client_name.trim()) newErrors.client_name = "Name is required.";
      if (!form.whatsapp.trim()) {
        newErrors.whatsapp = "WhatsApp number is required.";
      } else if (!/^\+?[0-9\s-]{8,15}$/.test(form.whatsapp.replace(/\s+/g, ''))) {
        newErrors.whatsapp = "Please enter a valid phone number.";
      }
      
      // Location Validation
      if (country === "India") {
        if (selectedState === "Other State" && !customState.trim()) {
          newErrors.location = "Please enter your state name.";
        }
      } else {
        if (!customCountry.trim()) {
          newErrors.location = "Please enter your country name.";
        }
      }
    }

    if (step === 2) {
      if (!form.occasion_date) newErrors.occasion_date = "Occasion date is required.";
    }

    if (step === 3) {
      if (!form.relationship_history.trim() || form.relationship_history.length < 15) {
        newErrors.relationship_history = "Please describe the story (minimum 15 characters).";
      }
      if (!form.favorite_memories.trim() || form.favorite_memories.length < 15) {
        newErrors.favorite_memories = "Please describe your favorite memories (minimum 15 characters).";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
      setTimeout(() => {
        document.getElementById("booking-start")?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  };

  const handlePrev = () => {
    setStep(prev => prev - 1);
    setTimeout(() => {
      document.getElementById("booking-start")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    try {
      await bookingService.createBooking({
        client_name: form.client_name,
        whatsapp: form.whatsapp,
        location: form.location,
        package_name: selectedPackage!,
        language: form.language,
        occasion: form.occasion,
        occasion_date: form.occasion_date,
        relationship_history: form.relationship_history,
        favorite_memories: form.favorite_memories,
        selected_addons: form.selected_addons,
        total_price: selectedPackage === 'custom' ? 0 : totalPrice
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error("Booking error:", err);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-8 max-w-xl mx-auto shadow-sm text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 mb-6">
          <CheckCircle size={36} />
        </div>
        <h3 className="font-serif text-2xl font-bold text-brand-black mb-3">Booking Received!</h3>
        <p className="text-sm text-gray-500 max-w-sm mx-auto mb-8 leading-relaxed">
          Thank you for choosing Memoir by BeatRoute Band! We have received your song details. Our creative team will reach out to you via WhatsApp shortly to initiate the lyrics brainstorming.
        </p>
        <button 
          onClick={() => {
            setIsSubmitted(false);
            setStep(1);
            onSelectPackage('pro');
            setCountry("India");
            setSelectedState("Tamil Nadu");
            setCustomCountry("");
            setCustomState("");
            setForm({
              client_name: "",
              whatsapp: "",
              location: "Tamil Nadu, India",
              language: "English",
              occasion: "Anniversary",
              occasion_date: "",
              relationship_history: "",
              favorite_memories: "",
              selected_addons: []
            });
          }}
          className="gold-gradient-btn text-brand-black text-xs uppercase tracking-widest px-6 py-3 rounded-xl font-bold shadow-md cursor-pointer transition-transform hover:scale-[1.02]"
        >
          Book Another Song
        </button>
      </div>
    );
  }

  return (
    <div id="booking-start" className="bg-white border border-brand-gold/40 rounded-2xl max-w-3xl mx-auto overflow-hidden shadow-md">
      
      {/* Wizard Header Progress Bar */}
      <div className="bg-brand-black text-brand-ivory px-6 py-4 flex items-center justify-between border-b border-brand-gold/10">
        <div>
          <span className="text-brand-gold text-[9px] uppercase font-bold tracking-wider">Step {step} of 5</span>
          <h4 className="font-serif text-base font-bold tracking-wide">
            {step === 1 && "About You"}
            {step === 2 && "Song Configuration"}
            {step === 3 && "Tell Your Story"}
            {step === 4 && "Optional Upgrades"}
            {step === 5 && "Review & Confirm"}
          </h4>
        </div>
        {selectedPackage && (
          <div className="flex items-center gap-2 bg-brand-gold text-brand-black px-3 py-1.5 rounded-full text-xs font-bold shadow-md">
            <span className="w-2 h-2 rounded-full bg-brand-black animate-pulse"></span>
            <span className="uppercase tracking-wider">{planDetails[selectedPackage].title} Plan</span>
            <span className="opacity-70 font-normal">({planDetails[selectedPackage].priceDisplay})</span>
          </div>
        )}
      </div>

      {/* Prominent Selected Plan Banner */}
      {selectedPackage ? (
        <div className="bg-[#121217] text-brand-ivory px-6 py-4 border-b border-brand-gold/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-brand-gold text-brand-black flex items-center justify-center font-bold font-serif text-xl shadow-md flex-shrink-0">
              {selectedPackage.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="font-serif text-lg font-bold text-brand-ivory capitalize">
                  {planDetails[selectedPackage].title} Plan
                </span>
                <span className="bg-brand-gold/20 text-brand-gold border border-brand-gold/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  {planDetails[selectedPackage].tag}
                </span>
              </div>
              <p className="text-xs text-gray-300 font-light mt-0.5">
                {planDetails[selectedPackage].desc}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 self-end sm:self-center">
            <div className="text-right">
              <span className="text-[9px] text-gray-400 uppercase tracking-widest block font-bold">Selected Price</span>
              <span className="font-serif font-bold text-brand-gold text-lg">
                {planDetails[selectedPackage].priceDisplay}
              </span>
            </div>
            <a 
              href="#packages"
              className="text-[10px] bg-white/10 hover:bg-white/20 text-brand-ivory border border-white/25 px-3 py-1.5 rounded-lg uppercase tracking-wider font-semibold transition-colors cursor-pointer"
            >
              Change Plan
            </a>
          </div>
        </div>
      ) : (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-3.5 text-amber-300 text-xs font-semibold flex items-center justify-between">
          <span>⚠️ No Plan Selected. Please select a package to begin.</span>
          <a href="#packages" className="underline hover:text-white font-bold">Select Plan ↑</a>
        </div>
      )}

      {/* Progress Dots */}
      <div className="bg-gray-50 border-b border-brand-gold/20 py-3.5 px-6 flex justify-between">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div 
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                s === step 
                  ? "bg-[#0A0A0D] text-brand-gold border border-brand-gold scale-105 shadow-sm" 
                  : s < step 
                  ? "bg-brand-gold text-brand-black" 
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {s}
            </div>
            {s < 5 && (
              <div className={`h-0.5 flex-1 mx-3 ${s < step ? "bg-brand-gold" : "bg-gray-200"}`}></div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8">
        
        {/* Warning if no package selected */}
        {errors.package && (
          <div className="bg-rose-50 text-rose-600 border border-rose-100 rounded-xl p-3.5 text-xs font-semibold mb-6">
            {errors.package}
          </div>
        )}

        {/* STEP 1: CONTACT INFO */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-700">Full Name *</label>
              <input 
                type="text" 
                placeholder="Enter your name"
                value={form.client_name}
                onChange={(e) => handleChange("client_name", e.target.value)}
                className={`w-full border px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-shadow ${
                  errors.client_name ? "border-rose-300 focus:ring-1 focus:ring-rose-200" : "border-gray-350 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30"
                }`}
              />
              {errors.client_name && <span className="text-[10px] text-rose-500 font-medium">{errors.client_name}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-700">WhatsApp Phone Number *</label>
              <input 
                type="tel" 
                placeholder="e.g. +91 98765 43210"
                value={form.whatsapp}
                onChange={(e) => handleChange("whatsapp", e.target.value)}
                className={`w-full border px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-shadow ${
                  errors.whatsapp ? "border-rose-300 focus:ring-1 focus:ring-rose-200" : "border-gray-350 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30"
                }`}
              />
              {errors.whatsapp && <span className="text-[10px] text-rose-500 font-medium">{errors.whatsapp}</span>}
            </div>

            <div className="flex flex-col gap-3.5 border-t border-gray-100 pt-4">
              <span className="text-xs font-semibold text-gray-700">Your Location *</span>
              
              {/* Country Selection */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Country</label>
                <div className="relative">
                  <select 
                    value={country}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    className="w-full appearance-none border border-gray-350 pl-4 pr-10 py-2.5 rounded-xl text-sm bg-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 transition-shadow cursor-pointer"
                  >
                    {countries.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </div>

              {/* If India is chosen */}
              {country === "India" && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400">State *</label>
                  <div className="relative">
                    <select 
                      value={selectedState}
                      onChange={(e) => handleStateChange(e.target.value)}
                      className="w-full appearance-none border border-gray-350 pl-4 pr-10 py-2.5 rounded-xl text-sm bg-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 transition-shadow cursor-pointer"
                    >
                      {statesOfIndia.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Custom State Input (if 'Other State' selected) */}
              {country === "India" && selectedState === "Other State" && (
                <div className="flex flex-col gap-1.5 animate-fade-in">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Enter Your State Name *</label>
                  <input 
                    type="text" 
                    placeholder="Enter state name"
                    value={customState}
                    onChange={(e) => setCustomState(e.target.value)}
                    className="w-full border border-gray-350 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 transition-shadow"
                  />
                </div>
              )}

              {/* Outside India Inputs */}
              {country !== "India" && (
                <div className="flex flex-col gap-3.5 animate-fade-in">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Country Name *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. United Kingdom"
                      value={customCountry}
                      onChange={(e) => setCustomCountry(e.target.value)}
                      className="w-full border border-gray-350 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 transition-shadow"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400">State / Region (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. California / London"
                      value={customState}
                      onChange={(e) => setCustomState(e.target.value)}
                      className="w-full border border-gray-350 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30 transition-shadow"
                    />
                  </div>
                </div>
              )}

              {errors.location && <span className="text-[10px] text-rose-500 font-medium">{errors.location}</span>}
            </div>
          </div>
        )}

        {/* STEP 2: SONG CONFIG */}
        {step === 2 && (
          <div className="space-y-6">
            
            {/* Language Selection Grid */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-700">Language of Song *</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => handleChange("language", lang)}
                    className={`py-2 px-3 border text-xs rounded-xl font-medium cursor-pointer transition-all duration-200 ${
                      form.language === lang 
                        ? "bg-brand-black text-brand-gold border-brand-gold font-bold shadow-sm" 
                        : "bg-gray-50 border-gray-200 text-gray-600 hover:border-brand-gold/40"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion Selection Grid */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-gray-700">What occasion is the song for? *</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {occasions.map((occ) => (
                  <button
                    key={occ}
                    type="button"
                    onClick={() => handleChange("occasion", occ)}
                    className={`py-2 px-3 border text-xs rounded-xl font-medium cursor-pointer transition-all duration-200 ${
                      form.occasion === occ 
                        ? "bg-brand-black text-brand-gold border-brand-gold font-bold shadow-sm" 
                        : "bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-350"
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Requirement */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                <Calendar size={14} className="text-gray-400" />
                Requirement Occasion Date *
              </label>
              <input 
                type="date" 
                value={form.occasion_date}
                onChange={(e) => handleChange("occasion_date", e.target.value)}
                className={`w-full border px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-shadow ${
                  errors.occasion_date ? "border-rose-300 focus:ring-1 focus:ring-rose-200" : "border-gray-350 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30"
                }`}
              />
              {errors.occasion_date && <span className="text-[10px] text-rose-500 font-medium">{errors.occasion_date}</span>}
            </div>

          </div>
        )}

        {/* STEP 3: STORY INTAKE */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-700">
                1. Describe your relationship &amp; connection history *
              </label>
              <span className="text-[10px] text-gray-400 mb-1 leading-normal">
                How did you meet? What role do they play in your life? (Minimum 15 characters)
              </span>
              <textarea 
                rows={4}
                placeholder="e.g. We met during our college cultural fest. We have been together for 5 years now, sharing a love for rock music and long weekend rides..."
                value={form.relationship_history}
                onChange={(e) => handleChange("relationship_history", e.target.value)}
                className={`w-full border px-4 py-3 rounded-xl text-sm focus:outline-none transition-shadow resize-none ${
                  errors.relationship_history ? "border-rose-300 focus:ring-1 focus:ring-rose-200" : "border-gray-350 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30"
                }`}
              />
              {errors.relationship_history && <span className="text-[10px] text-rose-500 font-medium">{errors.relationship_history}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-700">
                2. Share specific stories, memories, or inside jokes *
              </label>
              <span className="text-[10px] text-gray-400 mb-1 leading-normal">
                What are the core details we should weave into the lyrics? (Minimum 15 characters)
              </span>
              <textarea 
                rows={4}
                placeholder="e.g. She always laughs when she is nervous. Our favorite memory is getting lost in London in the rain, eating street food..."
                value={form.favorite_memories}
                onChange={(e) => handleChange("favorite_memories", e.target.value)}
                className={`w-full border px-4 py-3 rounded-xl text-sm focus:outline-none transition-shadow resize-none ${
                  errors.favorite_memories ? "border-rose-300 focus:ring-1 focus:ring-rose-200" : "border-gray-350 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/30"
                }`}
              />
              {errors.favorite_memories && <span className="text-[10px] text-rose-500 font-medium">{errors.favorite_memories}</span>}
            </div>
          </div>
        )}

        {/* STEP 4: UPGRADES / ADDONS */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <span className="text-brand-gold text-[9px] uppercase font-bold tracking-wider block mb-1">Optional Upgrades</span>
              <h5 className="font-serif text-sm font-semibold text-gray-800">Enhance Your Song Production</h5>
              <p className="text-[11px] text-gray-500 italic mt-0.5 mb-4">Note: Optional upgrades below will be charged additionally apart from the base package plan.</p>
            </div>

            <div className="space-y-3.5">
              {addonsList.map((addon) => {
                const isChecked = form.selected_addons.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => handleToggleAddon(addon.id)}
                    className={`border rounded-xl p-3.5 flex items-center justify-between cursor-pointer transition-all duration-200 ${
                      isChecked 
                        ? "bg-brand-gold/10 border-brand-gold" 
                        : "bg-white border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center">
                        <input 
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // Handled by div click
                          className="accent-brand-gold h-4 w-4 rounded pointer-events-none"
                        />
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-bold text-gray-850 block">{addon.name}</span>
                        <span className="text-[10px] text-gray-400 block leading-normal mt-0.5">{addon.desc}</span>
                      </div>
                    </div>
                    <span className="text-xs font-sans font-semibold tracking-wide text-brand-gold-muted flex-none pl-3">
                      +₹{addon.price.toLocaleString("en-IN")}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: REVIEW & PREVIEW */}
        {step === 5 && (
          <div className="space-y-6">
            
            {/* Intro Notice */}
            <div className="bg-brand-gold/10 border border-brand-gold/25 rounded-xl p-4">
              <h5 className="font-serif text-sm font-bold text-brand-black flex items-center gap-2">
                <FileText size={16} className="text-brand-gold-muted" />
                <span>Review Your Song Booking Details</span>
              </h5>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                Please double-check your information below before confirming. You can go back to any step to make edits.
              </p>
            </div>

            {/* Complete Song Specifications Preview */}
            <div className="bg-brand-ivory border border-brand-gold/25 rounded-xl p-5 space-y-4 shadow-xs">
              <h5 className="font-serif text-sm font-bold text-brand-black border-b border-brand-gold/15 pb-2 flex justify-between items-center">
                <span>Client &amp; Contact Preview</span>
                <span className="text-[10px] tracking-wider uppercase font-sans text-brand-gold-muted font-bold">Personal Details</span>
              </h5>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-gray-400 block mb-0.5 font-medium">Full Name</span>
                  <span className="font-bold text-gray-800">{form.client_name || "Not specified"}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5 font-medium">WhatsApp Number</span>
                  <span className="font-bold text-gray-800">{form.whatsapp || "Not specified"}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5 font-medium">Location</span>
                  <span className="font-bold text-gray-800">{form.location || "Not specified"}</span>
                </div>
              </div>

              <h5 className="font-serif text-sm font-bold text-brand-black border-b border-brand-gold/15 pb-2 pt-2 flex justify-between items-center">
                <span>Song Configuration</span>
                <span className="text-[10px] tracking-wider uppercase font-sans text-brand-gold-muted font-bold">Track Setup</span>
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-gray-400 block mb-0.5 font-medium">Occasion</span>
                  <span className="font-bold text-brand-gold-muted">{form.occasion}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5 font-medium">Language</span>
                  <span className="font-bold text-gray-800">{form.language}</span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5 font-medium">Delivery Date</span>
                  <span className="font-bold text-gray-800">{form.occasion_date || "Not specified"}</span>
                </div>
              </div>

              {/* Story Notes Preview */}
              <h5 className="font-serif text-sm font-bold text-brand-black border-b border-brand-gold/15 pb-2 pt-2">
                Story &amp; Memories Notes Preview
              </h5>

              <div className="space-y-3 text-xs bg-white/80 p-3.5 rounded-lg border border-gray-200/80">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">Relationship Story:</span>
                  <p className="text-gray-700 leading-relaxed italic font-serif">"{form.relationship_history}"</p>
                </div>
                <div className="border-t border-gray-150 pt-2">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block mb-1">Memories &amp; Lyrics Notes:</span>
                  <p className="text-gray-700 leading-relaxed italic font-serif">"{form.favorite_memories}"</p>
                </div>
              </div>
            </div>

            {/* Price Calculations */}
            <div className="bg-brand-black text-brand-ivory rounded-xl p-5 space-y-3.5 shadow-md">
              <h5 className="font-serif text-sm font-bold text-brand-gold border-b border-brand-gold/20 pb-2 flex justify-between items-center">
                <span>Price &amp; Upgrades Summary</span>
                <span className="text-[10px] text-gray-400 uppercase font-sans tracking-wider">{selectedPackage} Plan</span>
              </h5>
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-300 font-medium">Base Package: {selectedPackage?.toUpperCase()} PLAN</span>
                  <span className="font-semibold text-brand-ivory">{selectedPackage === 'custom' ? "Custom Pricing" : `₹${basePrice.toLocaleString("en-IN")}`}</span>
                </div>
                
                {form.selected_addons.length > 0 ? (
                  <div className="space-y-1.5 pl-3 border-l border-brand-gold/30">
                    <span className="text-[10px] text-brand-gold font-bold uppercase block mb-1">Selected Upgrades</span>
                    {form.selected_addons.map((addonId) => {
                      const ad = addonsList.find(a => a.id === addonId)!;
                      return (
                        <div key={addonId} className="flex justify-between text-[11px] text-gray-300">
                          <span>+ {ad.name}</span>
                          <span>+₹{ad.price.toLocaleString("en-IN")}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-[11px] text-gray-400 italic">No extra upgrades selected</div>
                )}

                <div className="border-t border-brand-gold/20 pt-3 flex justify-between items-baseline font-bold">
                  <span className="text-sm">Total Estimated Quote</span>
                  <span className="text-xl text-brand-gold font-serif">
                    {selectedPackage === 'custom' ? "Enquiry Requested" : `₹${totalPrice.toLocaleString("en-IN")}`}
                  </span>
                </div>
              </div>
            </div>

            {/* PROMINENT NEXT STEPS NOTICE */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3.5 text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MessageCircle size={20} />
              </div>
              <div>
                <h6 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  What Happens Once You Confirm?
                </h6>
                <p className="text-xs text-emerald-800 leading-relaxed mt-1">
                  After you submit your booking, our creative team will review your story and <strong>reach back out to you on WhatsApp ({form.whatsapp || "your phone number"})</strong> shortly to verify your details, brainstorm lyric ideas, and confirm production timelines!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="border-t border-gray-100 pt-5 mt-6 flex justify-between gap-4">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="px-4 py-2.5 border border-gray-200 hover:border-gray-350 text-gray-600 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ChevronLeft size={14} />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2.5 bg-brand-black hover:bg-brand-black/90 text-brand-ivory rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              Continue
              <ChevronRight size={14} />
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-2.5 gold-gradient-btn text-brand-black rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md hover:scale-[1.01] cursor-pointer"
            >
              Confirm &amp; Book Song
              <ChevronRight size={14} />
            </button>
          )}
        </div>

      </form>
    </div>
  );
}
