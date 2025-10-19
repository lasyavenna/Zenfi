"use client";

import { useState } from "react";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface AuthFormProps {
  onAuthSuccess: () => void;
}

export default function AuthForm({ onAuthSuccess }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const credentials = { email, password };
    let authFunction;

    if (isLogin) {
      authFunction = supabase.auth.signInWithPassword(credentials);
    } else {
      authFunction = supabase.auth.signUp({
        ...credentials,
        options: {
          data: { full_name: name },
        },
      });
    }

    try {
      const { error: authError, data } = await authFunction;

      if (authError) {
        setError(authError.message);
      } else if (data.user) {
        onAuthSuccess();
      } else {
        setError("Please check your email to confirm your account.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans relative">
      {/* 🐼 Full background handled by globals.css — no blur */}

      {/* Auth card */}
      <div className="relative w-full max-w-md bg-white/30 rounded-3xl p-8 shadow-2xl border border-white/40">
        <div className="flex items-center justify-center gap-3 mb-6">

        <div className="w-30 h-30 -mr-1">
        <img
          src="/trans_panda.jpg"
          alt="Panda"
          className="w-full h-full object-contain"
        />
      </div>





        <h1 className="text-4xl font-bold text-black -ml-2">ZenFi</h1>

        </div>

        <h2 className="text-3xl font-bold text-center mb-7 text-black">
          {isLogin ? "Welcome Back!" : "Create Account"}
        </h2>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-800 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-600" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 pl-10 bg-white/80 rounded-xl border border-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-black/60 text-black"
                required={!isLogin}
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-600" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 pl-10 bg-white/80 rounded-xl border border-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-black/60 text-black"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-600" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 pl-10 bg-white/80 rounded-xl border border-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-black/60 text-black"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 p-4 text-white font-bold rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg transition-all duration-300"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                {isLogin ? "Sign In" : "Sign Up"}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-black/80 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 font-semibold text-purple-700 hover:underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}
