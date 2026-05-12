/**
 * AI Persona Cloning Landing Page — "Dark Authority" Executive Aesthetic
 * Design: Near-black bg, warm off-white text, muted gold accents
 * Typography: Instrument Serif (display) + DM Sans (body)
 * Layout: Full-width cinematic sections, left-aligned content, dramatic vertical rhythm
 */

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Check, Zap, Users, Clock, Shield, ChevronRight } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663212168091/fZ2R3Vy8wEcvzJN5JjgwEC/hero-abstract-YmviDQXwKuuii5QoYgTAvm.webp";
const NETWORK_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663212168091/fZ2R3Vy8wEcvzJN5JjgwEC/section-network-BxvESo8DV32pzWPF2QLrpA.webp";
const AEC_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663212168091/fZ2R3Vy8wEcvzJN5JjgwEC/section-aec-JCsmhw8jSSzme36anTYEnG.webp";
const PROCESS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663212168091/fZ2R3Vy8wEcvzJN5JjgwEC/section-process-HS6MF5d5hLm2N8GftD8Tue.webp";

// Stripe payment links
const STRIPE_LINKS = {
  starter_build: "https://buy.stripe.com/cNiaEWcbw6ue3i38gC9sk0y",
  starter_monthly: "https://buy.stripe.com/4gMeVc3F05qa5qbcwS9sk0z",
  growth_build: "https://buy.stripe.com/fZuaEW8ZkaKu3i340m9sk0A",
  growth_monthly: "https://buy.stripe.com/14AcN47VgbOyf0LaoK9sk0B",
  enterprise_build: "https://buy.stripe.com/eVqcN42AW19Uf0L40m9sk0C",
  enterprise_monthly: "https://buy.stripe.com/dRm28q2AW19UcSDdAW9sk0D",
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0C0F14] text-[#E8E4DD] overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0C0F14]/80 backdrop-blur-xl border-b border-white/5">
        <div className="container flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#B8956A] flex items-center justify-center">
              <span className="text-[#0C0F14] font-bold text-sm">FF</span>
            </div>
            <span className="font-medium text-sm tracking-wide">FUTURE FOCUS</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-[#E8E4DD]/70">
            <a href="#how-it-works" className="hover:text-[#B8956A] transition-colors duration-200">Process</a>
            <a href="#pricing" className="hover:text-[#B8956A] transition-colors duration-200">Pricing</a>
            <a href="#results" className="hover:text-[#B8956A] transition-colors duration-200">Results</a>
          </div>
          <a href="#pricing">
            <Button className="bg-[#B8956A] text-[#0C0F14] hover:bg-[#C9A67B] text-sm font-medium px-5 transition-all duration-200 active:scale-[0.97]">
              Get Started
            </Button>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt=""
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C0F14] via-[#0C0F14]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C0F14] via-transparent to-[#0C0F14]/40" />
        </div>

        <div className="container relative z-10">
          <motion.div
            className="max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.p
              variants={fadeUp}
              className="text-[#B8956A] text-sm font-medium tracking-widest uppercase mb-6"
            >
              AI-Powered Business Development for AEC
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8"
            >
              Your top rainmakers<br />
              <span className="italic text-[#B8956A]">can't be in every room.</span><br />
              Now they can.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-[#E8E4DD]/70 max-w-xl mb-10 leading-relaxed"
            >
              Clone your best business developers into digital personas that pursue
              opportunities, build relationships, and win work around the clock —
              without adding headcount.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <a href="#pricing">
                <Button className="bg-[#B8956A] text-[#0C0F14] hover:bg-[#C9A67B] text-base font-medium px-8 py-6 transition-all duration-200 active:scale-[0.97]">
                  See Pricing <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
              <a href="#how-it-works">
                <Button variant="outline" className="border-[#B8956A]/30 text-[#E8E4DD] hover:bg-[#B8956A]/10 text-base px-8 py-6 transition-all duration-200">
                  How It Works
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="border-y border-white/5 py-8 bg-[#0C0F14]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <p className="text-3xl font-serif text-[#B8956A]">$2.4B+</p>
              <p className="text-sm text-[#E8E4DD]/50 mt-1">In AEC proposals supported</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/10" />
            <div>
              <p className="text-3xl font-serif text-[#B8956A]">24/7</p>
              <p className="text-sm text-[#E8E4DD]/50 mt-1">Business development coverage</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/10" />
            <div>
              <p className="text-3xl font-serif text-[#B8956A]">3x</p>
              <p className="text-sm text-[#E8E4DD]/50 mt-1">More opportunities pursued</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/10" />
            <div>
              <p className="text-3xl font-serif text-[#B8956A]">ENR 500</p>
              <p className="text-sm text-[#E8E4DD]/50 mt-1">Firms trust our approach</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              <motion.p variants={fadeUp} className="text-[#B8956A] text-sm font-medium tracking-widest uppercase mb-4">
                The Problem
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl leading-tight mb-6">
                Your firm wins work on <span className="italic text-[#B8956A]">relationships.</span><br />
                But relationships don't scale.
              </motion.h2>
              <motion.div variants={fadeUp} className="space-y-4 text-[#E8E4DD]/70 text-lg leading-relaxed">
                <p>
                  Your top BD people are maxed out. They can only attend so many conferences,
                  nurture so many relationships, and respond to so many RFPs.
                </p>
                <p>
                  Meanwhile, competitors are pursuing the opportunities your team doesn't
                  have bandwidth for. Every missed touchpoint is revenue left on the table.
                </p>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <img
                src={AEC_IMG}
                alt="Modern construction at scale"
                className="rounded-lg w-full aspect-video object-cover"
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-[#0C0F14]/60 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="results" className="py-24 md:py-32 relative">
        <div className="absolute inset-0 opacity-20">
          <img src={NETWORK_IMG} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-[#0C0F14]/80" />
        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="max-w-3xl mb-16"
          >
            <motion.p variants={fadeUp} className="text-[#B8956A] text-sm font-medium tracking-widest uppercase mb-4">
              The Solution
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl leading-tight mb-6">
              Digital persona clones that <span className="italic text-[#B8956A]">capture expertise,</span> not just data.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#E8E4DD]/70 text-lg leading-relaxed">
              We don't build chatbots. We build digital replicas of your top performers —
              their tone, their relationship intelligence, their strategic instincts —
              deployed as AI-powered business development systems that operate 24/7.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="w-5 h-5" />,
                title: "Capture Expertise",
                desc: "We interview your rainmakers, analyze their communication patterns, and encode their relationship-building approach into a digital persona.",
              },
              {
                icon: <Users className="w-5 h-5" />,
                title: "Scale Relationships",
                desc: "Your persona clone engages prospects, nurtures existing relationships, and identifies opportunities with the same tone and instincts as your best people.",
              },
              {
                icon: <Clock className="w-5 h-5" />,
                title: "Operate 24/7",
                desc: "While your team sleeps, your digital personas are building pipeline — responding to inquiries, following up on leads, and positioning for RFPs.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-8 hover:border-[#B8956A]/30 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded bg-[#B8956A]/10 flex items-center justify-center text-[#B8956A] mb-5">
                  {item.icon}
                </div>
                <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                <p className="text-[#E8E4DD]/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 md:py-32">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="max-w-2xl mb-16"
          >
            <motion.p variants={fadeUp} className="text-[#B8956A] text-sm font-medium tracking-widest uppercase mb-4">
              The Process
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl leading-tight">
              From interview to deployment<br />
              <span className="italic text-[#B8956A]">in 14 days.</span>
            </motion.h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "Deep-Dive Interview",
                  desc: "We conduct structured sessions with your top BD people — capturing their communication style, relationship strategies, and industry knowledge.",
                },
                {
                  step: "02",
                  title: "Persona Architecture",
                  desc: "Our team builds the digital persona model — encoding tone, expertise, decision-making patterns, and relationship intelligence.",
                },
                {
                  step: "03",
                  title: "Training & Calibration",
                  desc: "The persona is trained on your firm's past proposals, client communications, and market positioning to ensure authentic representation.",
                },
                {
                  step: "04",
                  title: "Deployment & Optimization",
                  desc: "Your digital persona goes live — engaging prospects, nurturing relationships, and feeding qualified opportunities to your team.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0">
                    <span className="text-[#B8956A]/40 font-serif text-3xl">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                    <p className="text-[#E8E4DD]/60 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <img
                src={PROCESS_IMG}
                alt="AI processing visualization"
                className="rounded-lg w-full aspect-[3/2] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You're NOT Getting */}
      <section className="py-24 md:py-32 border-y border-white/5">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.p variants={fadeUp} className="text-[#B8956A] text-sm font-medium tracking-widest uppercase mb-4">
              Let's Be Clear
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl leading-tight mb-12">
              This is <span className="italic">not</span> a chatbot.
            </motion.h2>
            <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-8 text-left">
              <div className="space-y-4">
                <h3 className="text-[#E8E4DD]/40 text-sm font-medium tracking-widest uppercase">What we don't build</h3>
                <ul className="space-y-3 text-[#E8E4DD]/50">
                  {["Generic AI chatbots", "FAQ automation", "Template-based responses", "One-size-fits-all solutions"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8E4DD]/20" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="text-[#B8956A] text-sm font-medium tracking-widest uppercase">What we build</h3>
                <ul className="space-y-3 text-[#E8E4DD]/90">
                  {[
                    "Digital replicas of your top performers",
                    "Relationship-aware BD systems",
                    "Industry-specific intelligence engines",
                    "Revenue-generating persona clones",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-[#B8956A] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 md:py-32">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-[#B8956A] text-sm font-medium tracking-widest uppercase mb-4">
              Investment
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl leading-tight mb-4">
              Scale your BD team<br />
              <span className="italic text-[#B8956A]">without the headcount.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#E8E4DD]/60 text-lg max-w-xl mx-auto">
              One-time build fee + monthly operation. No long-term contracts.
              Cancel anytime.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Starter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-8 flex flex-col"
            >
              <h3 className="text-lg font-medium mb-2">Starter</h3>
              <p className="text-[#E8E4DD]/50 text-sm mb-6">1 persona clone</p>
              <div className="mb-6">
                <p className="text-3xl font-serif text-[#E8E4DD]">$3,500</p>
                <p className="text-sm text-[#E8E4DD]/50">one-time build</p>
                <p className="text-2xl font-serif text-[#E8E4DD] mt-2">+ $1,500<span className="text-base text-[#E8E4DD]/50">/mo</span></p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "1 digital persona clone",
                  "Deep-dive interview session",
                  "14-day deployment",
                  "Monthly optimization",
                  "Performance reporting",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#E8E4DD]/70">
                    <Check className="w-4 h-4 text-[#B8956A] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href={STRIPE_LINKS.starter_build} target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="outline" className="w-full border-[#B8956A]/30 text-[#E8E4DD] hover:bg-[#B8956A]/10 py-5 transition-all duration-200 active:scale-[0.97]">
                  Get Started <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </a>
            </motion.div>

            {/* Growth — Featured */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#B8956A]/[0.06] border border-[#B8956A]/30 rounded-lg p-8 flex flex-col relative"
            >
              <div className="absolute -top-3 left-8 bg-[#B8956A] text-[#0C0F14] text-xs font-medium px-3 py-1 rounded-full">
                Most Popular
              </div>
              <h3 className="text-lg font-medium mb-2">Growth</h3>
              <p className="text-[#E8E4DD]/50 text-sm mb-6">3 persona clones</p>
              <div className="mb-6">
                <p className="text-3xl font-serif text-[#E8E4DD]">$7,500</p>
                <p className="text-sm text-[#E8E4DD]/50">one-time build</p>
                <p className="text-2xl font-serif text-[#E8E4DD] mt-2">+ $3,000<span className="text-base text-[#E8E4DD]/50">/mo</span></p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "3 digital persona clones",
                  "Team interview sessions",
                  "14-day deployment",
                  "Weekly optimization",
                  "Priority support",
                  "Cross-persona coordination",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#E8E4DD]/70">
                    <Check className="w-4 h-4 text-[#B8956A] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href={STRIPE_LINKS.growth_build} target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full bg-[#B8956A] text-[#0C0F14] hover:bg-[#C9A67B] py-5 font-medium transition-all duration-200 active:scale-[0.97]">
                  Get Started <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </a>
            </motion.div>

            {/* Enterprise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-8 flex flex-col"
            >
              <h3 className="text-lg font-medium mb-2">Enterprise</h3>
              <p className="text-[#E8E4DD]/50 text-sm mb-6">Unlimited personas</p>
              <div className="mb-6">
                <p className="text-3xl font-serif text-[#E8E4DD]">$15,000</p>
                <p className="text-sm text-[#E8E4DD]/50">one-time build</p>
                <p className="text-2xl font-serif text-[#E8E4DD] mt-2">+ $5,000<span className="text-base text-[#E8E4DD]/50">/mo</span></p>
                <p className="text-xs text-[#B8956A] mt-1">+ 20% revenue share</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Unlimited persona clones",
                  "Full team deployment",
                  "7-day priority build",
                  "Daily optimization",
                  "Dedicated account manager",
                  "Custom integrations",
                  "Revenue share alignment",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#E8E4DD]/70">
                    <Check className="w-4 h-4 text-[#B8956A] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href={STRIPE_LINKS.enterprise_build} target="_blank" rel="noopener noreferrer" className="block">
                <Button variant="outline" className="w-full border-[#B8956A]/30 text-[#E8E4DD] hover:bg-[#B8956A]/10 py-5 transition-all duration-200 active:scale-[0.97]">
                  Get Started <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Built for AEC */}
      <section className="py-24 md:py-32 border-t border-white/5">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="max-w-3xl mb-16"
          >
            <motion.p variants={fadeUp} className="text-[#B8956A] text-sm font-medium tracking-widest uppercase mb-4">
              Purpose-Built
            </motion.p>
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-5xl leading-tight">
              Designed exclusively for<br />
              <span className="italic text-[#B8956A]">architecture, engineering & construction.</span>
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Shield className="w-5 h-5" />, title: "RFP Intelligence", desc: "Personas trained on proposal language, evaluation criteria, and win strategies specific to AEC procurement." },
              { icon: <Users className="w-5 h-5" />, title: "Relationship Mapping", desc: "Understands the complex stakeholder networks in owner organizations, GCs, and design teams." },
              { icon: <Zap className="w-5 h-5" />, title: "Market Awareness", desc: "Continuously monitors project pipelines, bond measures, and capital programs in your markets." },
              { icon: <Clock className="w-5 h-5" />, title: "Pursuit Coordination", desc: "Coordinates go/no-go decisions, teaming strategies, and pursuit timelines across your BD team." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-6"
              >
                <div className="w-10 h-10 rounded bg-[#B8956A]/10 flex items-center justify-center text-[#B8956A] mb-4">
                  {item.icon}
                </div>
                <h3 className="font-medium mb-2">{item.title}</h3>
                <p className="text-sm text-[#E8E4DD]/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C0F14] via-[#B8956A]/[0.04] to-[#0C0F14]" />
        <div className="container relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-6xl leading-tight mb-6">
              Ready to clone your<br />
              <span className="italic text-[#B8956A]">best rainmaker?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#E8E4DD]/60 text-lg max-w-xl mx-auto mb-10">
              Join the AEC firms already using digital persona clones to win more work
              without adding headcount.
            </motion.p>
            <motion.div variants={fadeUp}>
              <a href={STRIPE_LINKS.starter_build} target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#B8956A] text-[#0C0F14] hover:bg-[#C9A67B] text-lg font-medium px-10 py-7 transition-all duration-200 active:scale-[0.97]">
                  Start Your Build — $3,500 <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#B8956A] flex items-center justify-center">
                <span className="text-[#0C0F14] font-bold text-xs">FF</span>
              </div>
              <span className="text-sm text-[#E8E4DD]/50">Future Focus Agents</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-[#E8E4DD]/40">
              <a href="https://thefuturefocus.net" className="hover:text-[#B8956A] transition-colors">thefuturefocus.net</a>
              <a href="mailto:hello@thefuturefocus.net" className="hover:text-[#B8956A] transition-colors">hello@thefuturefocus.net</a>
            </div>
            <p className="text-xs text-[#E8E4DD]/30">
              &copy; {new Date().getFullYear()} Future Focus Agents. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
