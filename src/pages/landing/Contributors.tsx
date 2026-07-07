import { useState } from "react";
import { FiGithub, FiLinkedin, FiGlobe } from "react-icons/fi";
import ScrollReveal from "./ScrollReveal";
import TranTrongTan from "../../assets/contributors/TranTrongTan.jpg";
import NguyenVanDat from "../../assets/contributors/NguyenVanDat.jpg";
import ChauThanhDat from "../../assets/contributors/ChauThanhDat.jpg";
import NguyenAnKhang from "../../assets/contributors/NguyenAnKhang.jpg";
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
    portfolio: "https://mainguyen.design",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Tran Trong Tan",
    role: "Project Lead & Software Engineer",
    bio: "Lead Architect of Rookwork. Passionate about building seamless collaborative experiences and automating workflows.",
    image: TranTrongTan,
    portfolio: "https://tanas2k4.github.io/Portfolio/",
    github: "https://github.com/TanAs2k4",
    linkedin: "https://www.linkedin.com/in/t%E1%BA%A5n-tr%E1%BA%A7n-78b8b5379/",
  },

  {
    name: "Nguyen An Khang",
    role: "Cloud Engineer",
    bio: "Manages backend APIs, databases, and secure hosting infrastructure. Specialized in high performance systems.",
    image: NguyenAnKhang,
    portfolio: "https://khanhle.tech",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Chau Thanh Dat",
    role: "Solutions Architect",
    bio: "Provide an overall and optimized architectural plan for the project.",
    image: ChauThanhDat,
    portfolio: "https://huyhoang.consulting",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
];

export default function Contributors() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const CARDS_PER_PAGE = 3;
  const totalPages = Math.ceil(contributors.length / CARDS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsTransitioning(false);
    }, 300); // Synced with CSS transition duration (300ms)
  };

  // Extract members for current page
  const currentMembers = contributors.slice(
    currentPage * CARDS_PER_PAGE,
    (currentPage + 1) * CARDS_PER_PAGE,
  );

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
            className={`transition-[opacity,transform] duration-300 ease-in-out transform will-change-transform-opacity flex flex-wrap justify-center gap-8 max-w-5xl mx-auto ${
              isTransitioning
                ? "opacity-0 scale-98 translate-y-1"
                : "opacity-100 scale-100 translate-y-0"
            }`}
          >
            {currentMembers.map((member, index) => (
              <div
                key={index}
                className="group relative overflow-hidden  aspect-3/4 bg-[#121620] transition-all duration-300 w-full max-w-sm sm:w-[320px] md:w-75 lg:w-[320px] shrink-0 mx-auto md:mx-0"
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
        </ScrollReveal>

        {/* Page Switcher Navigation (Dot Indicators) - Only shown if total pages > 1 */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 mt-12">
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <button
                key={pageIndex}
                onClick={() => handlePageChange(pageIndex)}
                className={`h-2.5 rounded-full cursor-pointer transition-all duration-300 ${
                  currentPage === pageIndex
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
