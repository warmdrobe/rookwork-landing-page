import { useState, useEffect, useRef } from "react";
import ScrollReveal from "./ScrollReveal";

import { FiCheck, FiArrowRight, FiCalendar, FiX } from "react-icons/fi";

import {
  FaSlack,
  FaGithub as FaGithubBrand,
  FaFigma,
  FaGoogleDrive,
  FaChrome,
  FaCrown,
} from "react-icons/fa";

// ==========================================
// SCROLL-TRIGGERED NUMBER COUNTER COMPONENT
// ==========================================
interface MetricItemProps {
  value: number;
  suffix: string;
  label: string;
}

const MetricItem = ({ value, suffix, label }: MetricItemProps) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = value;
          const duration = 1800; // ms
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutProgress = progress * (2 - progress);
            const currentCount = Math.floor(
              easeOutProgress * (end - start) + start,
            );
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, [value]);

  const isUptime = label.toLowerCase().includes("uptime");
  const displayValue = isUptime
    ? (count / 10).toFixed(1)
    : count.toLocaleString();

  return (
    <div ref={elementRef} className="text-center p-6 rounded-md">
      <div className="text-4xl md:text-5xl font-bold font-mono tracking-tight text-gray-700">
        {displayValue}
        {suffix}
      </div>
      <div className="mt-2 text-xs md:text-sm font-medium tracking-wide uppercase text-gray-500">
        {label}
      </div>
    </div>
  );
};

export default function PricingSection() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "yearly",
  );

  return (
    <>
      {/* Metrics Bar */}
      <section className=" mx-auto py-8 relative z-10 bg-white">
        <ScrollReveal animation="slide-up" duration={800}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-md">
            <MetricItem value={50} suffix="+" label="Users Active" />
            <MetricItem value={200} suffix="+" label="Workspaces onboarding" />
            <MetricItem value={999} suffix="%" label="uptime SLA" />
            <MetricItem value={40} suffix="%" label="faster delivery" />
          </div>
        </ScrollReveal>
      </section>

      {/* Pricing Plans */}
      <section
        id="pricing"
        className="max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-28 relative z-10 scroll-mt-20"
      >
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-7xl font-medium tracking-tight font-heading mb-4">
            Calm pricing, scaling with your team
          </h2>
          <p className="text-base md:text-lg text-gray-600 mb-8">
            Choose a plan that fits your current needs. Simple pricing, no hidden fees.
          </p>

          {/* Toggle switcher */}
          <div className="inline-flex items-center justify-center gap-3 p-1.5 rounded-md bg-gray-100 select-none">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all duration-300 ${
                billingPeriod === "monthly"
                  ? "bg-white text-gray-900 border border-gray-200"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`px-4 py-2 text-xs font-semibold rounded-md transition-all duration-300 flex items-center gap-1 ${
                billingPeriod === "yearly"
                  ? "bg-white text-gray-900 border border-gray-200"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Yearly
              <span className="text-[9px] bg-[#FF6B4A]/10 text-[#FF6B4A] px-1.5 py-0.5 rounded-md uppercase tracking-wider font-extrabold">
                -25%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-3xl mx-auto">
          {/* Starter Card */}
          <ScrollReveal animation="slide-up" duration={800} delay={0} className="flex h-full">
            <div className="p-8 border-2 border-gray-200  hover:bg-gray-100 rounded-md text-left flex flex-col justify-between transition-all duration-300 bg-white relative overflow-hidden group h-full w-full">
            {/* Subtle top indicator bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 " />
            
            <div>
              <h3 className="text-xl font-bold font-heading mb-2 text-gray-800">Starter</h3>
              <p className="text-xs leading-relaxed mb-6 text-gray-500">
                Great for individuals and small teams getting organized.
              </p>
              <div className="flex items-baseline mb-3 font-mono select-none">
                <span className="text-5xl font-extrabold tracking-tight text-gray-800">$0</span>
                <span className="text-sm ml-2 text-gray-400 font-sans font-medium">/ month</span>
              </div>
              <div className="h-4 select-none mb-6">
                {/* Empty spacer to align structurally with Pro card */}
              </div>
              <div className="h-px bg-gray-100 mb-6" />
              <ul className="space-y-4 mb-8 text-xs font-semibold text-gray-700">
                <li className="flex items-center gap-3">
                  <FiCheck className="text-emerald-500 w-5 h-5 shrink-0" />{" "}
                  Up to 5 team members
                </li>
                <li className="flex items-center gap-3">
                  <FiCheck className="text-emerald-500 w-5 h-5 shrink-0" />{" "}
                  Basic Kanban Board & Task Lists
                </li>
                <li className="flex items-center gap-3">
                  <FiCheck className="text-emerald-500 w-5 h-5 shrink-0" />{" "}
                  5 GB secure storage
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <FiX className="text-gray-400 w-5 h-5 shrink-0" />{" "}
                  <span className="line-through">Timelines & Gantt Views</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400">
                  <FiX className="text-gray-400 w-5 h-5 shrink-0" />{" "}
                  <span className="line-through">Automation rules & Priority support</span>
                </li>
              </ul>
            </div>
            <a
              href="https://www.rookwork.asia/register"
              className="w-full py-4 border-2  rounded-md text-[13px] font-bold text-center bg-gray-100 hover:bg-gray-200 text-gray-800 transition-all"
            >
              Get Started Free
            </a>
            </div>
          </ScrollReveal>

          {/* Pro Card (Premium Dark Card) */}
          <ScrollReveal animation="slide-up" duration={800} delay={150} className="flex h-full">
            <div className="p-8 rounded-md text-left flex flex-col justify-between transition-all duration-300 bg-[#121620]/90 text-white relative overflow-hidden group h-full w-full">
            {/* Custom Ribbon at Corner */}
            <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none select-none">
              <div className="absolute top-6 -right-6 w-32 bg-[#FF6B4A] text-white text-[9px] font-extrabold uppercase py-1 text-center rotate-45 flex items-center justify-center gap-1">
                <FaCrown className="w-2.5 h-2.5 text-white" />
                <span>Best Value</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading mb-2 text-[#FF6B4A]">
                Pro
              </h3>
              <p className="text-xs leading-relaxed mb-6 text-gray-450 font-medium">
                For scaling teams that need automation and advanced views.
              </p>
              <div className="flex items-baseline mb-3 font-mono select-none">
                <span className="text-5xl font-extrabold tracking-tight text-white">
                  {billingPeriod === "yearly" ? "$9" : "$12"}
                </span>
                <span className="text-sm ml-2 text-gray-400 font-sans font-medium">/ user / month</span>
              </div>
              <div className="h-4 select-none mb-6">
                {billingPeriod === "yearly" && (
                  <span className="text-[10px] text-purple-300 font-medium">Billed annually ($108/year)</span>
                )}
              </div>
              <div className="h-px bg-white/10 mb-6" />
              <ul className="space-y-4 mb-8 text-xs font-semibold text-gray-200">
                <li className="flex items-center gap-3">
                  <FiCheck className="text-purple-400 w-5 h-5 shrink-0" />{" "}
                  Unlimited team members
                </li>
                <li className="flex items-center gap-3">
                  <FiCheck className="text-purple-400 w-5 h-5 shrink-0" />{" "}
                  Timelines & Gantt Views
                </li>
                <li className="flex items-center gap-3">
                  <FiCheck className="text-purple-400 w-5 h-5 shrink-0" />{" "}
                  100+ automation rules
                </li>
                <li className="flex items-center gap-3">
                  <FiCheck className="text-purple-400 w-5 h-5 shrink-0" />{" "}
                  50 GB secure storage
                </li>
                <li className="flex items-center gap-3">
                  <FiCheck className="text-purple-400 w-5 h-5 shrink-0" />{" "}
                  Priority support & Custom webhooks
                </li>
              </ul>
            </div>
            <a
              href="https://www.rookwork.asia/register"
              className="w-full py-4 rounded-md text-xs font-bold text-center bg-[#FF6B4A] hover:bg-[#ff5733] text-white transition-all border border-transparent"
            >
              Start 14-Day Free Trial
            </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Integrations Grid */}
      <section
        id="integrations"
        className="py-20 transition-colors duration-300 bg-gray-50 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-7xl font-medium tracking-tight font-heading mb-4">
            Connects with your favorite tools
          </h2>
          <p className="text-base md:text-lg transition-colors max-w-xl mx-auto mb-12 text-gray-600">
            Rookwork integrates natively with the tools you already use to bring
            context, updates, and assets together.
          </p>

          {/* App Icons Grid */}
          <ScrollReveal animation="scale-in" duration={800}>
            <div className="flex flex-wrap items-center justify-center gap-6 max-w-3xl mx-auto">
            {/* Slack */}
            <div
              className="p-5 rounded-md flex items-center justify-center text-3xl transition-all duration-300 hover:scale-105 "
              title="Slack"
            >
              <FaSlack className="text-[#E01E5A]" />
            </div>

            {/* GitHub */}
            <div
              className="p-5 rounded-md flex items-center justify-center text-3xl transition-all duration-300 hover:scale-105 "
              title="GitHub"
            >
              <FaGithubBrand className="text-gray-900" />
            </div>

            {/* Figma */}
            <div
              className="p-5 rounded-md flex items-center justify-center text-3xl transition-all duration-300 hover:scale-105 "
              title="Figma"
            >
              <FaFigma className="text-[#F24E1E]" />
            </div>

            {/* Google Drive */}
            <div
              className="p-5 rounded-md flex items-center justify-center text-3xl transition-all duration-300 hover:scale-105 "
              title="Google Drive"
            >
              <FaGoogleDrive className="text-[#34A853]" />
            </div>

            {/* Calendar */}
            <div
              className="p-5 rounded-md flex items-center justify-center text-3xl transition-all duration-300 hover:scale-105 "
              title="Google Calendar"
            >
              <FiCalendar className="text-blue-500" />
            </div>

            {/* Chrome */}
            <div
              className="p-5 rounded-md flex items-center justify-center text-3xl transition-all duration-300 hover:scale-105 "
              title="Chrome Extension"
            >
              <FaChrome className="text-[#4285F4]" />
            </div>
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA / Conversion Section */}
      <section className=" mx-auto items-center bg-purple-900 py-20 relative z-10">
        <ScrollReveal animation="slide-up" duration={800} className="w-full">
          <div className="relative rounded-md py-16 text-gray-200 text-center">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-7xl font-bold font-heading mb-4 tracking-tight leading-tight [text-shadow:0_2px_8px_rgba(0,0,0,0.15)]">
              Ready to get your team organized?
            </h2>
            <p className="text-[#DFE1FF] text-sm md:text-base mb-8 max-w-lg mx-auto">
              Join thousands of teams shipping better work, faster, with
              Rookwork.
            </p>
            <a
              href="https://www.rookwork.asia/register"
              className="inline-flex items-center gap-2  bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-8 py-4 rounded-md transition-all active:scale-95 duration-150"
            >
              Get Started Free
              <FiArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
        </ScrollReveal>
      </section>
    </>
  );
}
