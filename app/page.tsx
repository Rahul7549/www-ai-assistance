"use client";

import Link from "next/link";
import { useAuth } from "@/app/lib/auth-context";
import {
  MessagesSquare,
  Mic,
  FileText,
  ShieldCheck,
  Search,
  Sparkles,
  ArrowRight,
  Check,
} from "lucide-react";

const FEATURES = [
  {
    icon: MessagesSquare,
    title: "Grounded in your knowledge",
    desc: "Retrieval-augmented answers drawn from your own documents — cited and relevant, not guesses from the open web.",
  },
  {
    icon: Mic,
    title: "Voice-native",
    desc: "Speak naturally and hear considered answers back. Switch between typing and talking whenever you like.",
  },
  {
    icon: FileText,
    title: "Understands your files",
    desc: "Drop in PDFs, Word docs and more. PersonaAI reads, indexes and reasons over them in seconds.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    desc: "Token-based authentication and encrypted storage. Your conversations and documents stay yours.",
  },
  {
    icon: Search,
    title: "Smart retrieval",
    desc: "Semantic search over your knowledge base surfaces the right passage for every question.",
  },
  {
    icon: Sparkles,
    title: "A personality that fits",
    desc: "Give your assistant a name, a look, a voice and a tone — tuned in seconds, changed anytime.",
  },
];

const STEPS = [
  { n: "01", title: "Create your account", desc: "One screen, and your assistant is ready with smart defaults." },
  { n: "02", title: "Add your knowledge", desc: "Upload documents and let PersonaAI index them for retrieval." },
  { n: "03", title: "Ask anything", desc: "Chat or talk — get grounded answers drawn from what matters to you." },
];

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050812] text-white">
      {/* Ambient background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(60rem 40rem at 70% -10%, rgba(99,102,241,0.18), transparent 60%), radial-gradient(50rem 35rem at 10% 10%, rgba(139,92,246,0.12), transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage: "radial-gradient(ellipse 70% 50% at 50% 0%, #000 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 50% at 50% 0%, #000 40%, transparent 100%)",
        }}
      />

      <div className="relative z-10">
        {/* NAV */}
        <header className="sticky top-0 z-30 border-b border-white/5 bg-[#050812]/70 backdrop-blur-xl">
          <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 md:px-8">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/20">
                <div className="h-2.5 w-2.5 rounded-sm bg-white/90" />
              </div>
              <span className="text-lg font-semibold tracking-tight">PersonaAI</span>
            </Link>

            <div className="hidden items-center gap-8 text-sm text-slate-400 md:flex">
              <a href="#features" className="transition-colors hover:text-white">Features</a>
              <a href="#how" className="transition-colors hover:text-white">How it works</a>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {user ? (
                <Link
                  href="/chat"
                  className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold shadow-lg shadow-indigo-600/20 transition-colors hover:bg-indigo-500"
                >
                  Open app <ArrowRight size={15} />
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/registration"
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold shadow-lg shadow-indigo-600/20 transition-colors hover:bg-indigo-500"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </nav>
        </header>

        {/* HERO */}
        <section className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 py-20 md:px-8 lg:grid-cols-2 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[12px] font-medium text-indigo-300">
              <Sparkles size={13} /> Conversational AI, grounded in your data
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Your AI assistant.
              <br />
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Grounded in your knowledge.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
              PersonaAI chats, searches, summarizes and talks — with answers drawn from your own
              documents, not the whole internet. Retrieval-augmented, voice-native, and private by design.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={user ? "/chat" : "/registration"}
                className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold shadow-lg shadow-indigo-600/25 transition-colors hover:bg-indigo-500"
              >
                {user ? "Open the app" : "Get started free"} <ArrowRight size={16} />
              </Link>
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-slate-200 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
              >
                Log in
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-slate-500">
              <span className="flex items-center gap-1.5"><Check size={14} className="text-indigo-400" /> No credit card</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-indigo-400" /> Ready in one screen</span>
              <span className="flex items-center gap-1.5"><Check size={14} className="text-indigo-400" /> Your data stays private</span>
            </div>
          </div>

          {/* Product preview mock */}
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-indigo-500/20 to-violet-500/10 blur-2xl" />
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1120] shadow-2xl">
              <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                <div className="ml-3 flex items-center gap-2">
                  <div className="h-5 w-5 rounded-md bg-gradient-to-br from-indigo-500 to-violet-500" />
                  <span className="text-xs font-medium text-slate-300">Nova</span>
                  <span className="text-[10px] text-emerald-400">● Online</span>
                </div>
              </div>
              <div className="space-y-4 p-5">
                <div className="ml-auto max-w-[80%] rounded-2xl rounded-tr-sm bg-indigo-600 px-4 py-2.5 text-sm">
                  Summarize the Q3 report and list the top 3 risks.
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 h-7 w-7 shrink-0 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500" />
                  <div className="max-w-[85%] space-y-2">
                    <div className="rounded-2xl rounded-tl-sm border border-white/5 bg-white/[0.03] px-4 py-2.5 text-sm text-slate-200">
                      Here&apos;s the gist, drawn from <span className="font-medium text-indigo-300">Q3-report.pdf</span>:
                      revenue is up 14%, with three risks to watch —
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-400">
                      <FileText size={13} className="text-indigo-400" /> Q3-report.pdf
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 border-t border-white/5 px-4 py-3">
                <div className="flex-1 rounded-xl border border-white/5 bg-white/[0.03] px-3.5 py-2 text-sm text-slate-500">
                  Message Nova…
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600">
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TECH STRIP */}
        <section className="border-y border-white/5 bg-white/[0.015]">
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 py-6 text-[13px] font-medium uppercase tracking-wider text-slate-500 md:px-8">
            <span>Retrieval-Augmented Generation</span>
            <span className="text-slate-700">•</span>
            <span>Semantic Vector Search</span>
            <span className="text-slate-700">•</span>
            <span>Voice Interaction</span>
            <span className="text-slate-700">•</span>
            <span>Document Understanding</span>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="mx-auto w-full max-w-7xl px-5 py-24 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-indigo-400">Features</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need in one assistant
            </h2>
            <p className="mt-4 text-slate-400">
              Built to turn your own documents and conversations into fast, grounded answers.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.04]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-indigo-500/10">
                  <Icon size={20} className="text-indigo-300" />
                </div>
                <h3 className="mt-5 text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="border-t border-white/5 bg-white/[0.015]">
          <div className="mx-auto w-full max-w-7xl px-5 py-24 md:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-indigo-400">How it works</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                From sign-up to grounded answers in minutes
              </h2>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {STEPS.map((s) => (
                <div key={s.n} className="relative rounded-2xl border border-white/10 bg-[#0b1120] p-7">
                  <span className="font-mono text-sm font-semibold text-indigo-400/80">{s.n}</span>
                  <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-7xl px-5 py-24 md:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-600/20 via-[#0b1120] to-[#0b1120] p-10 text-center md:p-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-[100px]"
            />
            <h2 className="relative text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to meet your assistant?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-slate-400">
              Create your account and start chatting in seconds. Personalize the look, voice and
              personality whenever you like.
            </p>
            <div className="relative mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={user ? "/chat" : "/registration"}
                className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-semibold shadow-lg shadow-indigo-600/25 transition-colors hover:bg-indigo-500"
              >
                {user ? "Open the app" : "Get started free"} <ArrowRight size={16} />
              </Link>
              {!user && (
                <Link
                  href="/login"
                  className="flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-slate-200 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
                >
                  Log in
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/5">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-slate-500 md:flex-row md:px-8">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500">
                <div className="h-2 w-2 rounded-sm bg-white/90" />
              </div>
              <span className="font-semibold text-slate-300">PersonaAI</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/login" className="transition-colors hover:text-white">Log in</Link>
              <Link href="/registration" className="transition-colors hover:text-white">Sign up</Link>
            </div>
            <span>© 2026 PersonaAI</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
