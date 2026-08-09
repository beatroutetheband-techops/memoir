"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Shield, Key, AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push("/admin");
      }
    });
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) {
        setError(signInError.message || "Invalid credentials. Please verify your email and password.");
      } else if (data.session) {
        router.push("/admin");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black flex flex-col justify-center items-center px-4 relative">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#C8A96A04_1px,transparent_1px),linear-gradient(to_bottom,#C8A96A04_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="w-full max-w-md space-y-6 relative z-10">
        
        {/* Header Logo */}
        <div className="text-center">
          <Image 
            src="/memoir.png" 
            alt="Memoir by BeatRoute Logo" 
            width={200} 
            height={60} 
            className="mx-auto h-12 w-auto object-contain mb-3 brightness-105"
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

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-rose-950/40 text-rose-300 border border-rose-900/50 rounded-xl p-3.5 text-xs flex items-start gap-2.5">
                <AlertCircle size={16} className="flex-none mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Admin Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@beatroute.com"
                className="w-full bg-zinc-950 border border-zinc-800 focus:border-brand-gold px-4 py-2.5 rounded-xl text-sm text-brand-ivory focus:outline-none focus:ring-1 focus:ring-brand-gold/30"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Password</label>
              <div className="relative w-full">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-950 border border-zinc-800 focus:border-brand-gold pl-4 pr-11 py-2.5 rounded-xl text-sm text-brand-ivory focus:outline-none focus:ring-1 focus:ring-brand-gold/30"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-gold transition-colors p-1 cursor-pointer focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-gold hover:bg-brand-gold-muted text-brand-black text-xs font-bold uppercase tracking-wider py-3 rounded-xl shadow-md transition-colors cursor-pointer mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Verifying Session...
                </>
              ) : (
                <>
                  <Key size={14} />
                  Sign In to Control Room
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-[10px] text-gray-500 text-center">
          Authorized personnel only. Access control active.
        </p>

      </div>
    </div>
  );
}
