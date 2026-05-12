/*
 * TenderPulse Landing Page — "The Edge" Design
 * Swiss Brutalist meets Corporate Modernism
 * Pure white + jet black + single orange-red (#e84118) accent
 * Typography: Instrument Serif (display) + Geist (body)
 */

import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronRight,
  Clock,
  FileText,
  Radar,
  Shield,
  Target,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";

// --- Animation variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as any } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// --- Data ---
const STRIPE_LINKS = {
  starter: "https://buy.stripe.com/8x28wO5N8cSC05ReF09sk0v",
  pro: "https://buy.stripe.com/aFaaEWgrMaKu7yj9kG9sk0w",
  enterprise: "https://buy.stripe.com/bJedR82AW9GqdWH1Se9sk0x",
};

const STATS = [
  { value: "2,400+", label: "Sources monitored daily" },
  { value: "47,000", label: "Opportunities scanned this month" },
  { value: "92%", label: "Qualification accuracy" },
  { value: "3.2x", label: "Average win-rate improvement" },
];

const FEATURES = [
  {
    num: "01",
    title: "Continuous Monitoring",
    desc: "TenderPulse scans SAM.gov, state procurement portals, municipal bid boards, and 2,400+ agency-specific platforms every day. Opportunities matching your NAICS codes, geographic reach, and capability profile are flagged within hours of publication — not days.",
    icon: Radar,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212168091/kxCCCcUn47VDsoViWYy4UR/feature-scanning-7FpN8dnpxBw2bVNzbi2vPW.webp",
  },
  {
    num: "02",
    title: "Intelligent Qualification",
    desc: "Every opportunity is scored against your past performance, certifications, clearance levels, revenue thresholds, and socioeconomic status. You receive a fit score from 0–100 with specific compliance risks flagged, so your BD team focuses only on winnable contracts.",
    icon: Target,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212168091/kxCCCcUn47VDsoViWYy4UR/feature-qualification-hnXgyVnSxhAYNDDdJJQ26p.webp",
  },
  {
    num: "03",
    title: "First-Draft Proposals",
    desc: "For your highest-scoring opportunities, TenderPulse generates structured proposal outlines including compliance matrices, recommended teaming partners, win themes, and past performance narratives — cutting your response time from weeks to days.",
    icon: FileText,
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663212168091/kxCCCcUn47VDsoViWYy4UR/feature-proposal-GbPsQNzhxMG9JxsxZRzeLb.webp",
  },
];

const PLANS = [
  {
    name: "Starter",
    price: "$497",
    period: "/mo",
    desc: "For firms entering the government market",
    features: [
      "5 qualified RFP alerts per week",
      "Opportunity fit scoring (0–100)",
      "Deadline tracking & reminders",
      "Compliance risk flags",
      "SAM.gov + state portal coverage",
      "Weekly intelligence brief",
    ],
    cta: "Start Winning",
    link: STRIPE_LINKS.starter,
    popular: false,
  },
  {
    name: "Pro",
    price: "$997",
    period: "/mo",
    desc: "For active bidders scaling their pipeline",
    features: [
      "15 qualified RFP alerts per week",
      "Everything in Starter, plus:",
      "Draft response outlines",
      "Competitive intelligence briefs",
      "Teaming partner suggestions",
      "Bid/no-bid decision support",
      "Priority email support",
    ],
    cta: "Scale Your Pipeline",
    link: STRIPE_LINKS.pro,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$2,497",
    period: "/mo",
    desc: "For firms that win contracts consistently",
    features: [
      "Unlimited qualified RFP alerts",
      "Everything in Pro, plus:",
      "Full first-draft proposals",
      "Compliance matrices",
      "Past performance narratives",
      "Win theme development",
      "Dedicated account manager",
      "Custom source monitoring",
    ],
    cta: "Dominate Your Market",
    link: STRIPE_LINKS.enterprise,
    popular: false,
  },
];

// --- Components ---

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setScrolled(window.scrollY > 20);
    });
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? "bg-white/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-edge-accent rounded-sm flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-edge-dark">TenderPulse</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-edge-dark transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-edge-dark transition-colors">
              Pricing
            </a>
            <a href="#sample" className="text-sm font-medium text-gray-600 hover:text-edge-dark transition-colors">
              Sample Report
            </a>
            <a
              href={STRIPE_LINKS.pro}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-edge-accent hover:bg-[#c0341a] text-white rounded-sm px-5 h-9 text-sm font-semibold">
                Get Started <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </a>
          </div>

          {/* Mobile CTA */}
          <div className="md:hidden">
            <a href={STRIPE_LINKS.pro} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-edge-accent hover:bg-[#c0341a] text-white rounded-sm text-sm font-semibold">
                Get Started
              </Button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative pt-28 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#0f0f0f 1px, transparent 1px), linear-gradient(90deg, #0f0f0f 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <AnimatedSection>
            <motion.div variants={fadeUp} className="mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-edge-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-edge-accent animate-pulse" />
                Procurement Intelligence
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-edge-dark mb-6"
            >
              Your competitors
              <br />
              <span className="text-edge-accent italic">already found</span>
              <br />
              that RFP.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg text-gray-600 leading-relaxed max-w-lg mb-8"
            >
              TenderPulse monitors 2,400+ government and corporate procurement sources, qualifies
              opportunities against your capabilities, and delivers first-draft proposals — so you
              respond faster and win more contracts.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
              <a href={STRIPE_LINKS.pro} target="_blank" rel="noopener noreferrer">
                <Button className="bg-edge-accent hover:bg-[#c0341a] text-white rounded-sm px-8 h-12 text-base font-semibold w-full sm:w-auto">
                  Start Winning Bids <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
              <a href="#sample">
                <Button
                  variant="outline"
                  className="border-gray-300 text-edge-dark hover:bg-gray-50 rounded-sm px-8 h-12 text-base font-medium w-full sm:w-auto"
                >
                  See Sample Report
                </Button>
              </a>
            </motion.div>
          </AnimatedSection>

          {/* Right: Hero image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] as any, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-sm overflow-hidden shadow-2xl border border-gray-200">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663212168091/kxCCCcUn47VDsoViWYy4UR/hero-dashboard-h29Cc7fitAynSfabbV845m.webp"
                alt="TenderPulse procurement intelligence dashboard showing RFP opportunities, win rates, and pipeline analytics"
                className="w-full h-auto"
                loading="eager"
              />
            </div>
            {/* Floating stat badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-sm shadow-lg border border-gray-200 px-4 py-3">
              <div className="text-xs text-gray-500 font-medium">This week</div>
              <div className="text-2xl font-bold text-edge-dark">47 <span className="text-sm font-medium text-edge-accent">new matches</span></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="py-12 border-y border-gray-200 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <AnimatedSection key={i}>
              <motion.div variants={fadeUp} className="text-center lg:text-left">
                <div className="text-3xl lg:text-4xl font-bold text-edge-dark tracking-tight">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1 font-medium">{stat.label}</div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="max-w-2xl mb-16 lg:mb-24">
            <span className="text-xs font-semibold tracking-widest uppercase text-edge-accent mb-3 block">
              How It Works
            </span>
            <h2 className="font-display text-4xl lg:text-5xl text-edge-dark leading-[1.05] mb-4">
              From opportunity to proposal<br />
              <span className="italic text-edge-accent">in hours, not weeks.</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Three automated stages replace the manual grind of procurement research, qualification,
              and proposal drafting.
            </p>
          </motion.div>
        </AnimatedSection>

        <div className="space-y-24 lg:space-y-32">
          {FEATURES.map((feature, i) => (
            <AnimatedSection key={i}>
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <motion.div variants={fadeUp}>
                    <span className="section-number">{feature.num}</span>
                  </motion.div>
                  <motion.h3 variants={fadeUp} className="text-2xl lg:text-3xl font-bold text-edge-dark mt-2 mb-4">
                    {feature.title}
                  </motion.h3>
                  <motion.p variants={fadeUp} className="text-gray-600 leading-relaxed text-lg">
                    {feature.desc}
                  </motion.p>
                </div>
                <motion.div
                  variants={fadeUp}
                  className={`relative ${i % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <div className="rounded-sm overflow-hidden shadow-xl border border-gray-200">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-auto"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section
      className="relative py-20 lg:py-28 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(15,15,15,0.85), rgba(15,15,15,0.7)), url(https://d2xsxph8kpxj0f.cloudfront.net/310519663212168091/kxCCCcUn47VDsoViWYy4UR/social-proof-bg-4bJ3dnBDYA3dMdqFKRbowV.webp)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="max-w-3xl">
            <div className="font-display text-3xl lg:text-5xl text-white leading-[1.1] mb-6 italic">
              "We went from tracking opportunities in a spreadsheet to winning a $4.2M Navy IT
              contract within 90 days of switching to TenderPulse."
            </div>
            <div className="flex items-center gap-4">
              <div className="w-px h-10 bg-edge-accent" />
              <div>
                <div className="text-white font-semibold">Director of Business Development</div>
                <div className="text-gray-400 text-sm">Mid-Atlantic IT Services Firm, 85 employees</div>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function ValueProps() {
  const props = [
    {
      icon: Clock,
      title: "Never Miss a Deadline",
      desc: "Automated alerts ensure you see every matching opportunity within hours of publication, with countdown reminders as due dates approach.",
    },
    {
      icon: Shield,
      title: "Compliance Confidence",
      desc: "Every opportunity is checked against your certifications, clearances, set-aside eligibility, and geographic reach before it reaches your desk.",
    },
    {
      icon: BarChart3,
      title: "Win-Rate Intelligence",
      desc: "Understand which agencies, contract types, and verticals yield the highest win rates for firms like yours — then focus your pipeline accordingly.",
    },
    {
      icon: Zap,
      title: "Respond 5x Faster",
      desc: "First-draft proposals with compliance matrices, win themes, and past performance narratives cut your response time from weeks to days.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase text-edge-accent mb-3 block">
              The Competitive Edge
            </span>
            <h2 className="font-display text-4xl lg:text-5xl text-edge-dark leading-[1.05]">
              Stop reacting.<br />
              <span className="italic text-edge-accent">Start winning.</span>
            </h2>
          </motion.div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {props.map((prop, i) => (
            <AnimatedSection key={i}>
              <motion.div
                variants={fadeUp}
                className="bg-white border border-gray-200 rounded-sm p-8 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="w-10 h-10 bg-edge-accent/10 rounded-sm flex items-center justify-center mb-4">
                  <prop.icon className="w-5 h-5 text-edge-accent" />
                </div>
                <h3 className="text-xl font-bold text-edge-dark mb-2">{prop.title}</h3>
                <p className="text-gray-600 leading-relaxed">{prop.desc}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function SampleReport() {
  const opportunities = [
    { name: "DUSN (M) ITD IT Related Services", agency: "Dept of the Navy", value: "$5M–$15M", deadline: "May 29, 2026", score: 92 },
    { name: "Enterprise Cybersecurity & Monitoring", agency: "FCC / USAC", value: "$3M–$10M", deadline: "Jun 10, 2026", score: 88 },
    { name: "Dept of State ITSS", agency: "Dept of State", value: "$2M–$8M", deadline: "Jun 2026 (est.)", score: 85 },
    { name: "DOE NNSA SCIF Construction", agency: "GSA / DOE", value: "$10M–$20M", deadline: "Q1 2027 (est.)", score: 83 },
    { name: "GSA SE Construction IDIQ", agency: "GSA PBS", value: "IDIQ Vehicle", deadline: "Fall 2026", score: 81 },
  ];

  return (
    <section id="sample" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="max-w-2xl mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-edge-accent mb-3 block">
              Sample Intelligence Brief
            </span>
            <h2 className="font-display text-4xl lg:text-5xl text-edge-dark leading-[1.05] mb-4">
              This is what your<br />
              <span className="italic text-edge-accent">Monday morning</span> looks like.
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              A preview from our weekly opportunity intelligence brief — real opportunities sourced
              from SAM.gov and federal procurement portals, qualified against a sample IT services
              and construction contractor profile.
            </p>
          </motion.div>
        </AnimatedSection>

        <AnimatedSection>
          <motion.div variants={fadeUp} className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-lg">
            {/* Report header */}
            <div className="bg-edge-dark px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-edge-accent rounded-sm flex items-center justify-center">
                  <Zap className="w-3 h-3 text-white" />
                </div>
                <span className="text-white font-semibold text-sm">TenderPulse Weekly Brief</span>
              </div>
              <span className="text-gray-400 text-xs">May 5–12, 2026 | Pro Tier</span>
            </div>

            {/* Summary bar */}
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex flex-wrap gap-6 text-sm">
              <span><strong className="text-edge-dark">47</strong> <span className="text-gray-500">opportunities scanned</span></span>
              <span><strong className="text-edge-dark">9</strong> <span className="text-gray-500">qualified matches</span></span>
              <span><strong className="text-edge-accent">3</strong> <span className="text-gray-500">urgent deadlines</span></span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left">
                    <th className="px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Opportunity</th>
                    <th className="px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Agency</th>
                    <th className="px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Est. Value</th>
                    <th className="px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Deadline</th>
                    <th className="px-6 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider">Fit Score</th>
                  </tr>
                </thead>
                <tbody>
                  {opportunities.map((opp, i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-edge-dark">{opp.name}</td>
                      <td className="px-6 py-4 text-gray-600">{opp.agency}</td>
                      <td className="px-6 py-4 text-gray-600">{opp.value}</td>
                      <td className="px-6 py-4 text-gray-600">{opp.deadline}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 font-bold ${
                            opp.score >= 85 ? "text-green-600" : opp.score >= 75 ? "text-amber-600" : "text-gray-500"
                          }`}
                        >
                          {opp.score}/100
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <span className="text-xs text-gray-500">
                Showing 5 of 9 qualified opportunities. Full brief includes detailed analysis, compliance risks, and recommended approach for each.
              </span>
              <a href={STRIPE_LINKS.starter} target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="bg-edge-accent hover:bg-[#c0341a] text-white rounded-sm text-xs font-semibold">
                  Get Your First Brief <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </a>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-edge-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase text-edge-accent mb-3 block">
              Pricing
            </span>
            <h2 className="font-display text-4xl lg:text-5xl text-white leading-[1.05] mb-4">
              One missed RFP costs more<br />
              <span className="italic text-edge-accent">than a year of TenderPulse.</span>
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              Choose the plan that matches your pursuit volume. All plans include access to our
              full source network and qualification engine.
            </p>
          </motion.div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {PLANS.map((plan, i) => (
            <AnimatedSection key={i}>
              <motion.div
                variants={fadeUp}
                className={`relative rounded-sm p-8 ${
                  plan.popular
                    ? "bg-white text-edge-dark ring-2 ring-edge-accent"
                    : "bg-white/5 text-white border border-white/10"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-8 bg-edge-accent text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
                    Most Popular
                  </div>
                )}

                <h3 className={`text-lg font-bold mb-1 ${plan.popular ? "text-edge-dark" : "text-white"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 ${plan.popular ? "text-gray-500" : "text-gray-400"}`}>
                  {plan.desc}
                </p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className={`text-4xl font-bold ${plan.popular ? "text-edge-dark" : "text-white"}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.popular ? "text-gray-500" : "text-gray-400"}`}>
                    {plan.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? "text-edge-accent" : "text-edge-accent"}`} />
                      <span className={plan.popular ? "text-gray-700" : "text-gray-300"}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a href={plan.link} target="_blank" rel="noopener noreferrer" className="block">
                  <Button
                    className={`w-full rounded-sm h-11 font-semibold ${
                      plan.popular
                        ? "bg-edge-accent hover:bg-[#c0341a] text-white"
                        : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    }`}
                  >
                    {plan.cta} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <motion.p variants={fadeUp} className="text-center text-gray-500 text-sm mt-8">
            All plans are month-to-month. No long-term contracts. Cancel anytime.
          </motion.p>
        </AnimatedSection>
      </div>
    </section>
  );
}

function WhoItsFor() {
  const segments = [
    { title: "IT Services Firms", desc: "Federal and state IT contractors pursuing managed services, cybersecurity, and software development contracts." },
    { title: "Construction Subcontractors", desc: "General contractors and specialty subs bidding on federal renovation, SCIF, and infrastructure projects." },
    { title: "Government Consultants", desc: "Management and professional services firms competing for advisory and support contracts." },
    { title: "Grant Consultants", desc: "Organizations pursuing federal and state grant opportunities across education, healthcare, and research." },
  ];

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <motion.div variants={fadeUp} className="max-w-2xl mb-16">
            <span className="text-xs font-semibold tracking-widest uppercase text-edge-accent mb-3 block">
              Built For
            </span>
            <h2 className="font-display text-4xl lg:text-5xl text-edge-dark leading-[1.05]">
              Firms that compete<br />
              <span className="italic text-edge-accent">on contracts.</span>
            </h2>
          </motion.div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {segments.map((seg, i) => (
            <AnimatedSection key={i}>
              <motion.div
                variants={fadeUp}
                className="border-t-2 border-edge-accent pt-6"
              >
                <h3 className="text-lg font-bold text-edge-dark mb-2">{seg.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{seg.desc}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <motion.div variants={fadeUp}>
            <h2 className="font-display text-4xl lg:text-6xl text-edge-dark leading-[1] mb-6">
              The next RFP is already<br />
              <span className="italic text-edge-accent">being published.</span>
            </h2>
          </motion.div>
          <motion.p variants={fadeUp} className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
            Your competitors are scanning for it right now. Start receiving qualified, scored
            opportunities matched to your capabilities — before anyone else.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={STRIPE_LINKS.pro} target="_blank" rel="noopener noreferrer">
              <Button className="bg-edge-accent hover:bg-[#c0341a] text-white rounded-sm px-8 h-12 text-base font-semibold">
                Start Your First Week Free <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <a href="mailto:bids@thefuturefocus.net">
              <Button
                variant="outline"
                className="border-gray-300 text-edge-dark hover:bg-gray-100 rounded-sm px-8 h-12 text-base font-medium"
              >
                Talk to Sales
              </Button>
            </a>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-edge-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-edge-accent rounded-sm flex items-center justify-center">
                <Zap className="w-3 h-3 text-white" />
              </div>
              <span className="text-white font-bold">TenderPulse</span>
            </div>
            <p className="text-gray-500 text-sm">
              Procurement intelligence and automation.<br />
              A product of <a href="https://thefuturefocus.net" className="text-gray-400 hover:text-white transition-colors">The Future Focus</a>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 text-sm text-gray-500">
            <a href="mailto:bids@thefuturefocus.net" className="hover:text-white transition-colors">
              bids@thefuturefocus.net
            </a>
            <a href="#features" className="hover:text-white transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#sample" className="hover:text-white transition-colors">Sample Report</a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-xs text-gray-600">
          &copy; {new Date().getFullYear()} TenderPulse. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// --- Main Page ---
export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <SocialProof />
      <ValueProps />
      <SampleReport />
      <Pricing />
      <WhoItsFor />
      <CTA />
      <Footer />
    </div>
  );
}
