import React from "react";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <header className="w-full border-b bg-white/70 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight">VitePortfolio</div>
          <nav className="flex items-center gap-3">
            <button
              className="px-4 py-2 rounded-xl border hover:shadow transition"
              onClick={() => navigate("/demo")}
            >
              Demo
            </button>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-4 py-2 rounded-xl border hover:shadow transition">Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-90 transition">Sign Up</button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-4 py-2 rounded-xl bg-black text-white hover:opacity-90 transition"
              >
                Go to Dashboard
              </button>
            </SignedIn>
          </nav>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Create a <span className="text-purple-600">Beautiful</span> Portfolio in Minutes
        </h1>
        <p className="mt-5 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Sign in with your social accounts and we'll auto-generate a customizable portfolio from your profile.
        </p>

        <div className="mt-10 flex items-center justify-center gap-3">
          <SignedOut>
            <SignUpButton mode="modal">
              <button className="px-6 py-3 rounded-2xl bg-black text-white hover:opacity-90 transition">
                Get Started Free
              </button>
            </SignUpButton>
            <SignInButton mode="modal">
              <button className="px-6 py-3 rounded-2xl border hover:shadow transition">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <button
            className="px-6 py-3 rounded-2xl border hover:shadow transition"
            onClick={() => navigate("/demo")}
          >
            Try Demo
          </button>
          <SignedIn>
            <button
              className="px-6 py-3 rounded-2xl bg-black text-white hover:opacity-90 transition"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </button>
          </SignedIn>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6 text-left">
          <Feature title="Drag & Drop Editing" desc="Use our visual editor to customize sections, colors, and layouts." />
          <Feature title="Social Sign-In" desc="Import your name, avatar, and links to auto-fill your portfolio." />
          <Feature title="One-Click Publish" desc="Get a shareable URL to add to your resume or LinkedIn." />
        </div>
      </section>
    </main>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-6 rounded-2xl border bg-white/60 backdrop-blur">
      <div className="font-semibold">{title}</div>
      <p className="text-gray-600 mt-2">{desc}</p>
    </div>
  );
}