import { useState, useEffect } from "react";

import { FiMenu, FiX } from "react-icons/fi";
import Logo from "../../assets/logo-black-no-background.png";
import { HiOutlineDownload } from "react-icons/hi";
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-18 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#121620]/95 backdrop-blur-md border-b border-white/10"
          : "bg-[#121620]"
      }`}
    >
      <div className="max-w-7xl h-full mx-auto px-6 md:px-8 flex items-center justify-between text-white">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <img src={Logo} alt="Rookwork Logo" className="w-max h-36" />
        </div>

        {/* Links Center (Desktop) */}
        <div className="hidden md:flex font-light items-center gap-10">
          <a
            href="#home"
            className="text-sm  text-gray-300 hover:text-[#FF6B4A] transition-colors duration-200"
          >
            Product
          </a>
          <a
            href="#features"
            className="text-sm  text-gray-300 hover:text-[#FF6B4A] transition-colors duration-200"
          >
            Demo
          </a>
          <a
            href="#pricing"
            className="text-sm text-gray-300 hover:text-[#FF6B4A] transition-colors duration-200"
          >
            Pricing
          </a>
          <a
            href="#about"
            className="text-sm text-gray-300 hover:text-[#FF6B4A] transition-colors duration-200"
          >
            About Us
          </a>
        </div>

        {/* Actions Right (Desktop) */}
        <div className="hidden md:flex items-center gap-5">
          <a
            href="#download"
            onClick={(e) => {
              e.preventDefault();
              alert("Coming soon!");
            }}
            className="text-sm border border-gray-600 py-1.5 px-2.5 rounded-md bg-purple-800 text-white hover:text-white transition-colors duration-200"
          >
            Download App
            <HiOutlineDownload size={16} className="inline-block ml-1.5" />
          </a>

          
        </div>

        {/* Mobile hamburger menu button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md bg-[#1d2333] text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <FiX className="w-5 h-5" />
            ) : (
              <FiMenu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      {mobileMenuOpen && (
        <div className="absolute top-18 text-center left-0 w-full flex flex-col p-6 gap-4 z-40 bg-[#121620] text-white border-t border-gray-800">
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="text-base py-1 hover:text-purple-400 transition-colors duration-200"
          >
            Product
          </a>
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className=" text-base py-1 hover:text-purple-400 transition-colors duration-200"
          >
            Demo
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className=" text-base py-1 hover:text-purple-400 transition-colors duration-200"
          >
            Pricing
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className=" text-base py-1 hover:text-purple-400 transition-colors duration-200"
          >
            About Us
          </a>
          <div className="flex flex-col gap-1">
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                alert("Coming soon!");
              }}
              className="border-2 py-2 rounded-md text-base hover:bg-white/5 transition-colors"
            >
              Download App
              <HiOutlineDownload size={16} className="inline-block ml-4" />
            </button>
            
          </div>
        </div>
      )}
    </nav>
  );
}
