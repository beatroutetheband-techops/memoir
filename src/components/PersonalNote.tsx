"use client";

import { Heart, Music, Sparkles } from "lucide-react";

export default function PersonalNote() {
  return (
    <div className="bg-[#0A0A0D] text-brand-ivory border border-brand-gold/30 rounded-2xl p-8 md:p-12 max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
      {/* Background radial gradient accent (Warm Gold Ambient Glow) */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_top_right,rgba(200,169,106,0.12)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Letter Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-brand-gold text-[10px] uppercase font-bold tracking-widest bg-brand-gold/10 border border-brand-gold/25 px-3 py-1 rounded-full">
              From Our Hearts to Yours
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-ivory leading-tight">
            Why We Write <br className="hidden sm:inline" />
            <span className="italic gold-gradient-text font-normal">Custom Songs.</span>
          </h2>

          <div className="space-y-4 text-sm sm:text-base font-light text-gray-300 leading-relaxed">
            <p>
              Every love story, every childhood memory, and every milestone has its own rhythm. 
              When we created <strong>Memoir by BeatRoute</strong>, we didn't want to build another generic music service. We wanted to build a bridge between human emotions and timeless sound.
            </p>
            <p>
              When you share your story with us, our musicians sit down to translate the feelings behind your words into sound. We compose and produce a tailored melody that captures your exact memories.
            </p>
            <p>
              Every lyric is penned by hand, every vocal is captured live in our studio, and every mix is polished with care. Because a letter can be misplaced and a gift can be forgotten. But a song?
            </p>
            <p className="font-serif italic text-lg text-brand-gold font-medium pt-2">
              &quot;A song lives forever.&quot;
            </p>
          </div>

          {/* Signature */}
          <div className="pt-4 flex items-center gap-4 border-t border-brand-gold/15">
            <div className="w-10 h-10 rounded-full bg-zinc-900 border border-brand-gold/40 flex items-center justify-center text-brand-gold font-serif font-bold text-xs shadow-md">
              M
            </div>
            <div>
              <p className="text-xs font-semibold text-brand-ivory">The Memoir &amp; BeatRoute Artists</p>
            </div>
          </div>
        </div>

        {/* Our Promise & Checklist Column - Revamped Container with Elevated Warm Slate/Gold Tone */}
        <div className="lg:col-span-5 bg-[linear-gradient(180deg,#1A1A24_0%,#111117_100%)] border border-brand-gold/35 rounded-xl p-6 md:p-8 space-y-6 shadow-2xl relative">
          <h3 className="font-serif text-lg font-bold text-brand-gold flex items-center gap-2 border-b border-brand-gold/20 pb-3">
            <Sparkles size={16} className="text-brand-gold animate-pulse" />
            <span className="gold-gradient-text">Our Creative Promise</span>
          </h3>

          <div className="space-y-5">
            <div className="flex gap-4 items-start">
              <div className="mt-1 flex-shrink-0 w-7 h-7 rounded-lg bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center text-brand-gold shadow-sm">
                <Music size={14} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-brand-ivory mb-1">Handcrafted Melodies</h4>
                <p className="text-[11px] text-gray-300 leading-relaxed font-light">
                  Real instruments and live vocals. Your song is created from scratch by professional artists.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="mt-1 flex-shrink-0 w-7 h-7 rounded-lg bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center text-brand-gold shadow-sm">
                <Heart size={14} className="fill-current" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-brand-ivory mb-1">Empathy First</h4>
                <p className="text-[11px] text-gray-300 leading-relaxed font-light">
                  We read every story detail. We match the genre, tempo, and vocal tone to the emotion of your message.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="mt-1 flex-shrink-0 w-7 h-7 rounded-lg bg-brand-gold/15 border border-brand-gold/30 flex items-center justify-center text-brand-gold shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <div>
                <h4 className="text-xs font-bold text-brand-ivory mb-1">Keep It Simple</h4>
                <p className="text-[11px] text-gray-300 leading-relaxed font-light">
                  No hidden fees. Revisions are built-in, and we send you the lyric draft to check before we record.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <a 
              href="#booking-section"
              className="w-full py-3 gold-gradient-btn text-brand-black text-[11px] font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <span>Let&apos;s Write Your Song</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
