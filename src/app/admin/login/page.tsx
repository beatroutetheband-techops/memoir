"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Shield, Key, AlertCircle } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (username === "admin" && password === "admin123") {
      sessionStorage.setItem("beatroute_admin_authenticated", "true");
      router.push("/admin");
    } else {
      setError("Invalid username or password. (Hint: admin / admin123)");
    }
  };

  return (
    <div className="min-h-screen bg-brand-black flex flex-col justify-center items-center px-4 relative">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#C8A96A04_1px,transparent_1px),linear-gradient(to_bottom,#C8A96A04_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        
        {/* Header Logo */}
        <div className="text-center">
          <Image 
            src="/logo.png" 
            alt="BeatRoute Logo" 
            width={160} 
            height={50} 
            className="mx-auto h-12 w-auto object-contain mb-3"
            priority
          />
          <span className="text-brand-gold text-[10px] uppercase font-bold tracking-widest block">
            Production Admin Portal
          </span>
        </div>

        {/* Login Card */}
        <div className="bg-zinc-900 border border-brand-gold/20 rounded-2xl p-6 md:p-8 shadow-xl">
          <h2 className="font-serif text-xl font-semibold text-brand-ivory mb-6 flex items-center gap-2">
            <Shield size={20} className="text-brand-gold" />
            Security Sign In
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-rose-950/40 text-rose-300 border border-rose-900/50 rounded-xl p-3.5 text-xs flex items-start gap-2.5">
                <AlertCircle size={16} className="flex-none mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-brand-gold px-4 py-2.5 rounded-xl text-sm text-brand-ivory focus:outline-none focus:ring-1 focus:ring-brand-gold/30"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-brand-gold px-4 py-2.5 rounded-xl text-sm text-brand-ivory focus:outline-none focus:ring-1 focus:ring-brand-gold/30"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-gold hover:bg-brand-gold-muted text-brand-black text-xs font-bold uppercase tracking-wider py-3 rounded-xl shadow-md transition-colors cursor-pointer mt-2 flex items-center justify-center gap-2"
            >
              <Key size={14} />
              Verify Credentials
            </button>
          </form>
        </div>

        <p className="text-[10px] text-gray-500 text-center">
          Authorized personnel only. Access logging is active.
        </p>

      </div>
    </div>
  );
}
