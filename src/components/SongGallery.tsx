"use client";

import { useState } from "react";
import { Play, Pause, Music, Heart } from "lucide-react";

interface SongSample {
  id: string;
  title: string;
  occasion: string;
  tier: "Basic" | "Pro" | "Ultimate";
  lang: string;
  desc: string;
  story: string;
  quote: string;
  gradient: string;
}

const customSongs: SongSample[] = [
  {
    id: "g1",
    title: "Nisha's Walkway",
    occasion: "Wedding Entrance",
    tier: "Pro",
    lang: "Tamil",
    desc: "A warm guitar-piano melody woven with acoustic violin layers.",
    story: "Woven around how they met in the college library 6 years ago, culminating in their wedding walkway entrance.",
    quote: "“The flute and violin notes captured our story so perfectly. There wasn't a dry eye in the wedding hall!”",
    gradient: "from-amber-650 to-orange-800"
  },
  {
    id: "g2",
    title: "Chai & Conversations",
    occasion: "Father's 60th Birthday",
    tier: "Basic",
    lang: "Hindi",
    desc: "Nostalgic acoustic guitar arpeggios with a warm male vocal.",
    story: "Reflecting on his childhood stories, his daily cup of black coffee, and his lifelong dedication to his family.",
    quote: "“Dad kept playing it on loop all evening. It was the most personal and touching gift we could ever give him.”",
    gradient: "from-rose-800 to-indigo-955"
  },
  {
    id: "g3",
    title: "The London Rain",
    occasion: "Proposal Surprise",
    tier: "Ultimate",
    lang: "English",
    desc: "A cinematic orchestral arrangement with duet vocals.",
    story: "An epic arrangement describing their surprise proposal in London under the rain, tracing their journey from best friends.",
    quote: "“Absolutely breathtaking production. The duet voices made it feel like a professional soundtrack!”",
    gradient: "from-purple-800 to-brand-burgundy"
  }
];

export default function SongGallery() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const togglePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  return (
    <div className="bg-brand-black text-brand-ivory border border-brand-gold/20 rounded-2xl p-6 md:p-8 max-w-5xl mx-auto shadow-xl relative overflow-hidden">
      
      {/* Subtle Background Art */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#5A243540_0%,transparent_50%)] pointer-events-none"></div>

      <div className="text-center md:text-left mb-8 md:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-brand-gold text-[10px] uppercase font-bold tracking-widest block mb-1">Portfolio</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-ivory">Recent Song Deliveries</h2>
          <p className="text-xs text-gray-400 mt-1 max-w-lg">
            Explore original custom songs we have produced for clients. Every track is completely unique.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-brand-gold bg-brand-gold/5 border border-brand-gold/20 px-3 py-1.5 rounded-xl self-center md:self-auto">
          <Heart size={13} className="fill-current" />
          <span>Crafted with love by BeatRoute</span>
        </div>
      </div>

      {/* Grid of Song Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {customSongs.map((song) => {
          const isPlaying = playingId === song.id;
          return (
            <div 
              key={song.id}
              className="bg-zinc-900 border border-zinc-800/80 rounded-xl p-5 hover:border-brand-gold/30 transition-all duration-300 flex flex-col justify-between group hover:scale-[1.01]"
            >
              <div>
                {/* Visual Album Art Cover & Vinyl peeking animation */}
                <div className="relative w-full aspect-square bg-zinc-950 rounded-lg overflow-hidden mb-4 flex items-center justify-center shadow-md">
                  {/* Vinyl Disk peeking out slightly on card hover */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center transition-all duration-500 group-hover:translate-x-16 z-0 shadow-lg opacity-40 group-hover:opacity-100 group-hover:rotate-180">
                    <div className="w-16 h-16 rounded-full border-4 border-zinc-900 bg-brand-burgundy/40"></div>
                  </div>
                  
                  {/* Front Cover Cover Art */}
                  <div className={`absolute inset-3 rounded-md bg-gradient-to-tr ${song.gradient} p-4 flex flex-col justify-between z-10 shadow-inner`}>
                    <div className="flex justify-between items-start">
                      <span className="bg-black/35 text-[8px] font-bold text-brand-gold border border-brand-gold/25 px-2 py-0.5 rounded uppercase tracking-wider">
                        {song.tier}
                      </span>
                      <Music size={14} className="text-brand-ivory/60" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm sm:text-base font-bold text-brand-ivory leading-tight line-clamp-1">{song.title}</h4>
                      <p className="text-[9px] text-gray-200 tracking-wider uppercase font-medium mt-0.5">{song.occasion}</p>
                    </div>
                  </div>

                  {/* Play Button Overlay */}
                  <button 
                    onClick={() => togglePlay(song.id)}
                    className="absolute bottom-6 right-6 w-11 h-11 rounded-full bg-brand-gold hover:bg-brand-gold-muted text-brand-black flex items-center justify-center shadow-lg transition-transform duration-350 hover:scale-105 active:scale-95 z-20 cursor-pointer"
                  >
                    {isPlaying ? (
                      <div className="flex gap-0.5 items-end justify-center w-4 h-4">
                        <div className="w-0.7 bg-brand-black h-3 animate-bounce"></div>
                        <div className="w-0.7 bg-brand-black h-4 animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-0.7 bg-brand-black h-2.5 animate-bounce [animation-delay:0.1s]"></div>
                      </div>
                    ) : (
                      <Play size={18} className="translate-x-0.5 fill-current text-brand-black" />
                    )}
                  </button>
                </div>

                {/* Tags */}
                <div className="flex gap-2 mb-3">
                  <span className="text-[9px] bg-zinc-800 text-gray-300 font-semibold px-2 py-0.5 rounded">
                    {song.lang}
                  </span>
                  <span className="text-[9px] bg-brand-burgundy/10 text-brand-gold border border-brand-burgundy/20 font-semibold px-2 py-0.5 rounded">
                    {song.occasion}
                  </span>
                </div>

                <p className="text-[11px] text-gray-400 leading-relaxed mb-4">{song.desc}</p>
                
                {/* Relationship history context */}
                <p className="text-[10px] text-zinc-500 leading-normal border-t border-zinc-800/80 pt-3 mb-4">
                  <span className="text-[9px] font-bold text-gray-450 uppercase tracking-wider block mb-1">Behind the song:</span>
                  {song.story}
                </p>
              </div>

              {/* Client Quote */}
              <div className="bg-zinc-950/60 rounded-lg p-3 text-[10px] text-brand-gold-muted leading-relaxed font-serif italic border-l border-brand-gold/30">
                {song.quote}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
