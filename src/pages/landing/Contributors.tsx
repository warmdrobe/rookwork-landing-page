import { useState, useEffect } from "react";
import { FiGithub, FiLinkedin, FiGlobe } from "react-icons/fi";
import ScrollReveal from "./ScrollReveal";
import TranTrongTan from "../../assets/contributors/TranTrongTan.jpg";
import NguyenVanDat from "../../assets/contributors/NguyenVanDat.jpg";
import ChauThanhDat from "../../assets/contributors/ChauThanhDat.jpg";
import NguyenAnKhang from "../../assets/contributors/NguyenAnKhang.jpg";
import PhamHoangTuanKha from "../../assets/contributors/PhamHoangTuanKha.jpg";
interface Contributor {
  name: string;
  role: string;
  bio: string;
  image: string;
  portfolio: string;
  github: string;
  linkedin: string;
}

const contributors: Contributor[] = [
  {
    name: "Nguyen Van Dat",
    role: "Backend Developer",
    bio: "My coding philosophy is simple: I absorb the complex data flows behind the scenes to deliver you the smoothest experience possible.",
    image: NguyenVanDat,
    portfolio: "",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Tran Trong Tan",
    role: "Project Lead & Software Engineer",
    bio: "a Software Engineer and leader of Rookwork. also a member of Warmdrobe.",
    image: TranTrongTan,
    portfolio: "https://tanas2k4.github.io/Portfolio/",
    github: "https://github.com/TanAs2k4",
    linkedin: "https://www.linkedin.com/in/t%E1%BA%A5n-tr%E1%BA%A7n-78b8b5379/",
  },
  {
    name: "Pham Hoang Tuan Kha",
    role: "Software Engineer",
    bio: "Software engineer at Endava and is a member of Warmdrobe.",
    image: PhamHoangTuanKha,
    portfolio: "https://khar34.dev/",
    github: "https://github.com/khar34",
    linkedin: "https://www.linkedin.com/in/phamhoangtuankha/",
  },
  {
    name: "Nguyen An Khang",
    role: "Cloud Engineer",
    bio: "Manages backend APIs, databases, and secure hosting infrastructure. Specialized in high performance systems.",
    image: NguyenAnKhang,
    portfolio: "",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Chau Thanh Dat",
    role: "Solutions Architect",
    bio: "Provide an overall and optimized architectural plan for the project.",
    image: ChauThanhDat,
    portfolio: "",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
];

export default function Contributors() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [cardsPerPage, setCardsPerPage] = useState<number>(5);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(contributors.length / cardsPerPage);

  // Keep currentPage inside valid range when cardsPerPage changes
  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(Math.max(0, totalPages - 1));
    }
  }, [cardsPerPage, totalPages, currentPage]);

  // Auto play every 3 seconds
  useEffect(() => {
    if (isPaused || totalPages <= 1) return;

    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 3000);

    return () => clearInterval(timer);
  }, [totalPages, isPaused]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <section
      id="about"
      className="py-20 bg-gray-50 border-t border-gray-200 relative overflow-hidden scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* Section Heading */}
        <ScrollReveal animation="slide-up" duration={800}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-7xl font-medium font-heading text-gray-900 mt-4 tracking-tight">
              Meet Our Contributors
            </h2>
            <p className="text-gray-500 text-sm md:text-base mt-4 font-light leading-relaxed">
              The team building Rookwork — one workspace, everything your team
              needs to work together.
            </p>
          </div>
        </ScrollReveal>

        {/* Contributor Cards Grid with transition animation */}
        <ScrollReveal
          animation="slide-up"
          duration={800}
          delay={150}
          className="w-full"
        >
          <div
            className="overflow-hidden w-full max-w-5xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <div
                  key={pageIndex}
                  className="w-full shrink-0 flex justify-center gap-8 px-4"
                >
                  {contributors
                    .slice(pageIndex * cardsPerPage, (pageIndex + 1) * cardsPerPage)
                    .map((member, index) => (
                      <div
                        key={index}
                        className="group relative overflow-hidden aspect-3/4 bg-[#121620] transition-all duration-300 w-full max-w-sm sm:w-[320px] md:w-75 lg:w-[320px] shrink-0"
                      >
                        {/* Profile Image */}
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Gradient Bottom Overlay (Visible in normal state) */}
                        <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none"></div>

                        {/* Contributor Info (Visible in normal state) */}
                        <div className="absolute bottom-0 left-0 w-full p-6 text-white transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-4 pointer-events-none">
                          <p className="text-[#FF6B4A] font-bold text-xs uppercase tracking-wider mb-1">
                            {member.role}
                          </p>
                          <h3 className="text-xl font-bold font-heading mb-1">
                            {member.name}
                          </h3>
                          <p className="text-gray-300 text-xs font-light line-clamp-2 leading-relaxed">
                            {member.bio}
                          </p>
                        </div>

                        {/* Smooth Glassmorphic Layer 1 (Fades in statically to prevent GPU layout blur lag) */}
                        <div className="absolute inset-0 bg-[#121620]/65 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none z-10" />

                        {/* Smooth Glassmorphic Layer 2 (Content slides in from the left) */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center transform -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0 z-20">
                          <div className="text-white mb-6">
                            <h3 className="text-2xl font-bold font-heading mb-1">
                              {member.name}
                            </h3>
                            <p className="text-[#FF6B4A] text-sm font-semibold mb-3">
                              {member.role}
                            </p>
                            <p className="text-purple-50 text-xs leading-relaxed max-w-xs font-light">
                              {member.bio}
                            </p>
                          </div>

                          {/* Social Icons / Access Buttons */}
                          <div className="flex gap-4">
                            <a
                              href={member.portfolio}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-gray-800 flex items-center justify-center transition-all duration-200 transform hover:scale-110 "
                              title="Portfolio"
                            >
                              <FiGlobe className="w-5 h-5" />
                            </a>
                            <a
                              href={member.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-gray-800 flex items-center justify-center transition-all duration-200 transform hover:scale-110 "
                              title="GitHub"
                            >
                              <FiGithub className="w-5 h-5" />
                            </a>
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white text-white hover:text-gray-800 flex items-center justify-center transition-all duration-200 transform hover:scale-110 "
                              title="LinkedIn"
                            >
                              <FiLinkedin className="w-5 h-5" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Page Switcher Navigation (Dot Indicators) - Only shown if total pages > 1 */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-12">
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => handlePageChange(pageIndex)}
                className={`h-2.5 rounded-full cursor-pointer transition-all duration-300 ${currentPage === pageIndex
                  ? "bg-gray-600 w-6"
                  : "bg-gray-300 hover:bg-gray-400 w-2.5"
                  }`}
                aria-label={`Go to page ${pageIndex + 1}`}
                title={`Page ${pageIndex + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
