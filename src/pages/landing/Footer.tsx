import { useState } from "react";
import { FiTwitter, FiGithub, FiLinkedin, FiCheck } from "react-icons/fi";
import WarmdrobeLogo from "../../assets/warmdrobe-no-background.png";

export default function Footer() {
  const [emailInput, setEmailInput] = useState<string>("");
  const [subscribed, setSubscribed] = useState<boolean>(false);

  return (
    <footer
      id="footer"
      className="pt-8 pb-4 transition-colors duration-300 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12 text-left">
          {/* Column 1: Logo + description */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="pb-4">
              <img
                src={WarmdrobeLogo}
                alt="Warmdrobe Logo"
                className="h-10 object-contain"
              />
            </div>
            <p className="text-xs leading-relaxed max-w-sm mb-6 text-gray-500">
              A calm, unified collaborative workspace built to eliminate
              friction, automate routines, and help software and product teams
              focus on building.
            </p>

            <div className="flex flex-col">
              {/* Social icons */}
              <div className="flex gap-4 items-center">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#500088] transition-colors text-gray-550"
                >
                  <FiTwitter className="w-4.5 h-4.5" />
                </a>
                 <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#500088] transition-colors text-gray-555"
                >
                  <FiGithub className="w-4.5 h-4.5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#500088] transition-colors text-gray-555"
                >
                  <FiLinkedin className="w-4.5 h-4.5" />
                </a>
              </div>
              {/* Bottom Copyright */}
              <div className="pt-2">
                <span className="text-[10px] md:text-xs text-gray-400">
                  © 2026 Rookwork Inc. All rights reserved.
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Product */}
          <div className="md:col-span-2 flex flex-col items-start">
            <h4 className="text-xs font-bold uppercase tracking-wider mb-4 font-heading text-gray-800">
              Product
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-550">
              <li>
                <a
                  href="#features"
                  className="hover:text-[#500088] transition-colors"
                >
                  Kanban Boards
                </a>
              </li>
              <li>
                 <a
                  href="#features"
                  className="hover:text-[#500088] transition-colors"
                >
                  Timeline Calendar
                </a>
              </li>
              <li>
                 <a
                  href="#features"
                  className="hover:text-[#500088] transition-colors"
                >
                  Smart Workflows
                </a>
              </li>
              <li>
                 <a
                  href="#pricing"
                  className="hover:text-[#500088] transition-colors"
                >
                  Pricing Options
                </a>
              </li>
              <li>
                 <a
                  href="#download"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Coming soon!");
                  }}
                  className="hover:text-[#500088] transition-colors"
                >
                  Desktop App
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="md:col-span-5 flex flex-col items-start">
            <h4 className="text-xs font-bold uppercase tracking-wider mb-4 font-heading text-gray-850">
              Stay updated with Rookwork
            </h4>
            <p className="text-xs mb-4 leading-relaxed text-gray-500">
              Get productivity tips and product updates.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-md text-xs font-bold flex items-center gap-2">
                <FiCheck /> Thanks for subscribing!
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (emailInput.trim()) setSubscribed(true);
                }}
                className="flex gap-2 w-full"
              >
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 px-3 py-2.5 border-0 text-xs focus:outline-none focus:ring-1 focus:ring-[#500088] transition-all rounded-md bg-gray-100 text-gray-900 placeholder-gray-400"
                />
                <button
                  type="submit"
                  className="bg-[#500088] hover:bg-purple-800 text-white font-bold text-xs px-4 py-2.5 rounded-md transition-all active:scale-95 duration-150"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}