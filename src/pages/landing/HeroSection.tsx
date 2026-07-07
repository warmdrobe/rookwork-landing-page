import { useState, useEffect } from "react";

import { FiArrowRight, FiPlay } from "react-icons/fi";
import { FaTasks, FaBook } from "react-icons/fa";
import { CiDesktop } from "react-icons/ci";
import BrowserCoCoc from "../../assets/coccoc_browser.svg?react";
import BrowserSafari from "../../assets/safari-icon.svg?react";
import BrowserFirefox from "../../assets/firefox-browser-icon.svg?react";
export default function HeroSection() {
  // ==========================================
  // HERO KANBAN MOCKUP ANIMATION
  // ==========================================
  const [kanbanCards, setKanbanCards] = useState({
    todo: [
      {
        id: "k1",
        title: "Refactor core router",
        tag: "Tech",
        priority: "High",
        type: "task",
        assigneeName: "Leo",
        assigneeAvt: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face"
      },
      { 
        id: "k2", 
        title: "Write API specs", 
        tag: "Docs", 
        priority: "Medium",
        type: "story",
        assigneeName: "Sarah",
        assigneeAvt: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=50&h=50&fit=crop&crop=face"
      },
    ],
    progress: [
      {
        id: "k3",
        title: "UI polish (Bento grid)",
        tag: "Design",
        priority: "High",
        type: "task",
        assigneeName: "Jenny",
        assigneeAvt: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face"
      },
    ],
    done: [
      { 
        id: "k4", 
        title: "Setup PostgreSQL DB", 
        tag: "Ops", 
        priority: "Done",
        type: "task",
        assigneeName: "Alex",
        assigneeAvt: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
      },
    ],
  });

  const [cursorPos, setCursorPos] = useState({ x: 82, y: 78 }); // % position
  const [cursorGrabbing, setCursorGrabbing] = useState(false);
  const [animationCardId, setAnimationCardId] = useState<string | null>(null);

  useEffect(() => {
    let phase = 0;

    const interval = setInterval(() => {
      phase = (phase + 1) % 6;

      if (phase === 0) {
        setKanbanCards({
          todo: [
            {
              id: "k1",
              title: "Refactor core router",
              tag: "Tech",
              priority: "High",
              type: "task",
              assigneeName: "Leo",
              assigneeAvt: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face"
            },
            {
              id: "k2",
              title: "Write API specs",
              tag: "Docs",
              priority: "Medium",
              type: "story",
              assigneeName: "Sarah",
              assigneeAvt: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=50&h=50&fit=crop&crop=face"
            },
          ],
          progress: [
            {
              id: "k3",
              title: "UI polish (Bento grid)",
              tag: "Design",
              priority: "High",
              type: "task",
              assigneeName: "Jenny",
              assigneeAvt: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face"
            },
          ],
          done: [
            {
              id: "k4",
              title: "Setup PostgreSQL DB",
              tag: "Ops",
              priority: "Done",
              type: "task",
              assigneeName: "Alex",
              assigneeAvt: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
            },
          ],
        });
        setCursorPos({ x: 82, y: 78 });
        setCursorGrabbing(false);
        setAnimationCardId(null);
      } else if (phase === 1) {
        setCursorPos({ x: 18, y: 55 });
      } else if (phase === 2) {
        setCursorGrabbing(true);
        setAnimationCardId("k2");
      } else if (phase === 3) {
        setCursorPos({ x: 50, y: 65 });
      } else if (phase === 4) {
        setCursorGrabbing(false);
        setKanbanCards((prev) => {
          const cardToMove = prev.todo.find((c) => c.id === "k2");
          if (!cardToMove) return prev;
          return {
            ...prev,
            todo: prev.todo.filter((c) => c.id !== "k2"),
            progress: [...prev.progress, { ...cardToMove, priority: "Medium" }],
          };
        });
        setAnimationCardId(null);
      } else if (phase === 5) {
        setCursorPos({ x: 82, y: 78 });
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Custom Styles for Dot Grid Pattern */}
      <style>{`
        .dot-grid {
          background-image: radial-gradient(rgba(80, 0, 136, 0.08) 1px, transparent 1px);
          background-size: 24px 24px;
        }
      `}</style>

      {/* Hero Dark Container */}
      <div className="bg-[#121620] pt-28 pb-16 relative overflow-hidden">
        {/* Decorative subtle ambient lights */}
        <div className="absolute top-[22%] left-1/2 -translate-x-1/2 w-[40%] aspect-square rounded-full bg-[#500088]/15 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] aspect-square rounded-full bg-[#FF6B4A]/5 blur-[100px] pointer-events-none" />

        {/* Center Content Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 flex flex-col items-center text-center">
          {/* Main Centered Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading tracking-tight leading-[1.2] mb-6 text-white [text-shadow:0_0_20px_rgba(255,255,255,0.15)] max-w-4xl">
            We love to make everything
            <br className="hidden md:block" /> at work{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-450 to-[#FF6B4A]">
              amazing
            </span>{" "}
            &{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#FF6B4A] via-orange-400 to-amber-400">
              simple
            </span>
          </h1>

          {/* Centered Description */}
          <p className="text-sm md:text-base mb-8 max-w-2xl text-gray-300 leading-relaxed">
            Rookwork brings your tasks, calendar, docs, and chat together in a
            unified, calm workspace. No clutter. No noise. Just focused work.
          </p>

          {/* Centered Badges */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-8 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            <span className="flex items-center gap-1.5">
              <BrowserCoCoc className="w-3.5 h-3.5 text-zinc-700" />
              <BrowserSafari className="w-3.5 h-3.5 text-zinc-700" />
              <BrowserFirefox className="w-3.5 h-3.5 text-zinc-700" />
              Web Browser
            </span>
            <button 
              onClick={() => alert("Coming soon!")}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <CiDesktop className="w-3.5 h-3.5 text-gray-200" />
               Desktop App
            </button>
          </div>

          {/* Side-by-side CTA buttons */}
          <div className="flex flex-row items-center justify-center gap-4 w-full max-w-md mb-14">
            {/* Outline Button: Watch Demo */}
            <a
              href="#features"
              className="border-2 border-gray-100 hover:border-gray-200 hover:bg-white/5 text-white px-6 py-3 rounded-md transition-all active:scale-95 flex items-center justify-center gap-2 text-[13px] flex-1"
            >
              <FiPlay className="w-3.5 h-3.5" />
              Watch Demo
            </a>

            {/* Solid Button: Get Started */}
            <a
              href="/register"
              className="bg-purple-700 hover:bg-purple-600 text-white font-medium px-6 py-3.5 rounded-md transition-all active:scale-95 flex items-center justify-center gap-2 text-xs flex-1 group"
            >
              Get Started
              <FiArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Centered Large Mockup Dashboard */}
          <div className="w-full max-w-4xl mx-auto rounded-lg overflow-hidden border-2 border-gray-100 bg-white">
            {/* Browser Header Bar */}
            <div className="px-4 py-3 flex items-center justify-between bg-gray-100/90 border-b border-gray-200">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 bg-red-400 rounded-full" />
                <span className="w-2.5 h-2.5 bg-amber-400 rounded-full" />
                <span className="w-2.5 h-2.5 bg-green-400 rounded-full" />
              </div>
              <div className="px-4 py-0.5 rounded text-[10px] font-mono select-none w-1/2 text-center truncate bg-white text-gray-400 border border-gray-150">
                workspace.rookwork.com/marketing
              </div>
              <div className="w-12" />
            </div>

            {/* Simulated Kanban Content */}
            <div className="p-5 grid grid-cols-3 gap-4 relative select-none dot-grid min-h-75">
              {/* Kanban Column 1: Todo */}
              <div className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-gray-100/50 pb-3">
                {/* Column header */}
                <div className="flex items-center justify-between px-3.5 pt-3 pb-2 select-none">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-gray-450" />
                    <span className="text-[11px] font-bold text-gray-700 tracking-wide truncate">
                      To Do
                    </span>
                    <span className="text-[9px] bg-gray-200/80 text-gray-500 rounded-full px-1.5 py-0.5 font-medium shrink-0">
                      {kanbanCards.todo.length}
                    </span>
                  </div>
                </div>

                {/* Colored accent line directly below the status name/header */}
                <div className="h-0.5 mx-3.5 rounded-full bg-gray-400 mb-1" />

                {/* Cards Area */}
                <div className="flex-1 px-3.5 space-y-2">
                  {kanbanCards.todo.map((card) => (
                    <div
                      key={card.id}
                      className={`p-3.5 rounded-lg text-left transition-all duration-300 border border-gray-200 shadow-sm flex flex-col gap-2 ${
                        animationCardId === card.id
                          ? "opacity-0"
                          : "bg-white text-gray-800"
                      }`}
                    >
                      {/* Icon and Title */}
                      <div className="flex items-start gap-2">
                        {card.type === "story" ? (
                          <FaBook size={10} className="text-blue-500 mt-0.5 shrink-0" />
                        ) : (
                          <FaTasks size={10} className="text-[#500088] mt-0.5 shrink-0" />
                        )}
                        <span className="text-[12px] font-semibold flex-1 leading-tight truncate text-gray-800">
                          {card.title}
                        </span>
                      </div>

                      {/* Meta info (Assignee name and avatar + date) */}
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-1.5">
                          <img 
                            src={card.assigneeAvt} 
                            alt={card.assigneeName} 
                            className="w-5 h-5 rounded-full object-cover border border-gray-100 shrink-0" 
                          />
                          <span className="text-[10px] text-gray-500 font-medium">
                            {card.assigneeName}
                          </span>
                        </div>
                        <span className="text-[9px] text-gray-400 font-mono">
                          03 Jul
                        </span>
                      </div>

                      {/* Priority dash bar at bottom */}
                      <div className="flex gap-0.5 h-1 mt-1.5 select-none">
                        {["low", "medium", "high", "urgent"].map((p, i) => {
                          const prioritiesArray = ["low", "medium", "high", "urgent"];
                          const cardPriority = card.priority.toLowerCase();
                          const active = cardPriority === "done" 
                            ? i <= prioritiesArray.indexOf("low")
                            : i <= prioritiesArray.indexOf(cardPriority);
                          const colorClass = cardPriority === "done" 
                            ? "bg-green-500" 
                            : p === "low" ? "bg-green-500"
                            : p === "medium" ? "bg-yellow-500"
                            : p === "high" ? "bg-orange-500"
                            : "bg-purple-500";
                          return (
                            <div
                              key={p}
                              className={`flex-1 rounded-sm h-1 ${active ? colorClass : "bg-gray-200"}`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kanban Column 2: In Progress */}
              <div className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-gray-100/50 pb-3">
                {/* Column header */}
                <div className="flex items-center justify-between px-3.5 pt-3 pb-2 select-none">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-blue-500" />
                    <span className="text-[11px] font-bold text-gray-700 tracking-wide truncate">
                      In Progress
                    </span>
                    <span className="text-[9px] bg-gray-200/80 text-gray-500 rounded-full px-1.5 py-0.5 font-medium shrink-0">
                      {kanbanCards.progress.length}
                    </span>
                  </div>
                </div>

                {/* Colored accent line directly below the status name/header */}
                <div className="h-0.5 mx-3.5 rounded-full bg-blue-500 mb-1" />

                {/* Cards Area */}
                <div className="flex-1 px-3.5 space-y-2">
                  {kanbanCards.progress.map((card) => (
                    <div
                      key={card.id}
                      className="p-3.5 rounded-lg text-left transition-all duration-300 border border-gray-200 shadow-sm flex flex-col gap-2 bg-white text-gray-800"
                    >
                      {/* Icon and Title */}
                      <div className="flex items-start gap-2">
                        {card.type === "story" ? (
                          <FaBook size={10} className="text-blue-500 mt-0.5 shrink-0" />
                        ) : (
                          <FaTasks size={10} className="text-[#500088] mt-0.5 shrink-0" />
                        )}
                        <span className="text-[12px] font-semibold flex-1 leading-tight truncate text-gray-800">
                          {card.title}
                        </span>
                      </div>

                      {/* Meta info (Assignee name and avatar + date) */}
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-1.5">
                          <img 
                            src={card.assigneeAvt} 
                            alt={card.assigneeName} 
                            className="w-5 h-5 rounded-full object-cover border border-gray-100 shrink-0" 
                          />
                          <span className="text-[10px] text-gray-500 font-medium">
                            {card.assigneeName}
                          </span>
                        </div>
                        <span className="text-[9px] text-gray-400 font-mono">
                          03 Jul
                        </span>
                      </div>

                      {/* Priority dash bar at bottom */}
                      <div className="flex gap-0.5 h-1 mt-1.5 select-none">
                        {["low", "medium", "high", "urgent"].map((p, i) => {
                          const prioritiesArray = ["low", "medium", "high", "urgent"];
                          const cardPriority = card.priority.toLowerCase();
                          const active = cardPriority === "done" 
                            ? i <= prioritiesArray.indexOf("low")
                            : i <= prioritiesArray.indexOf(cardPriority);
                          const colorClass = cardPriority === "done" 
                            ? "bg-green-500" 
                            : p === "low" ? "bg-green-500"
                            : p === "medium" ? "bg-yellow-500"
                            : p === "high" ? "bg-orange-500"
                            : "bg-purple-500";
                          return (
                            <div
                              key={p}
                              className={`flex-1 rounded-sm h-1 ${active ? colorClass : "bg-gray-200"}`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kanban Column 3: Done */}
              <div className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-gray-100/50 pb-3">
                {/* Column header */}
                <div className="flex items-center justify-between px-3.5 pt-3 pb-2 select-none">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-emerald-500" />
                    <span className="text-[11px] font-bold text-gray-700 tracking-wide truncate">
                      Done
                    </span>
                    <span className="text-[9px] bg-gray-200/80 text-gray-500 rounded-full px-1.5 py-0.5 font-medium shrink-0">
                      {kanbanCards.done.length}
                    </span>
                  </div>
                </div>

                {/* Colored accent line directly below the status name/header */}
                <div className="h-0.5 mx-3.5 rounded-full bg-emerald-500 mb-1" />

                {/* Cards Area */}
                <div className="flex-1 px-3.5 space-y-2">
                  {kanbanCards.done.map((card) => (
                    <div
                      key={card.id}
                      className="p-3.5 rounded-lg text-left transition-all duration-300 border border-gray-200 shadow-sm flex flex-col gap-2 bg-white text-gray-400 opacity-65"
                    >
                      {/* Icon and Title */}
                      <div className="flex items-start gap-2">
                        {card.type === "story" ? (
                          <FaBook size={10} className="text-blue-500 mt-0.5 shrink-0 opacity-65" />
                        ) : (
                          <FaTasks size={10} className="text-[#500088] mt-0.5 shrink-0 opacity-65" />
                        )}
                        <span className="text-[12px] font-semibold flex-1 leading-tight truncate line-through text-gray-500">
                          {card.title}
                        </span>
                      </div>

                      {/* Meta info (Assignee name and avatar + date) */}
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-1.5">
                          <img 
                            src={card.assigneeAvt} 
                            alt={card.assigneeName} 
                            className="w-5 h-5 rounded-full object-cover border border-gray-100 shrink-0 opacity-65" 
                          />
                          <span className="text-[10px] text-gray-450 font-medium">
                            {card.assigneeName}
                          </span>
                        </div>
                        <span className="text-[9px] text-gray-400 font-mono">
                          02 Jul
                        </span>
                      </div>

                      {/* Priority dash bar at bottom */}
                      <div className="flex gap-0.5 h-1 mt-1.5 select-none">
                        {["low", "medium", "high", "urgent"].map((p, i) => {
                          const prioritiesArray = ["low", "medium", "high", "urgent"];
                          const cardPriority = card.priority.toLowerCase();
                          const active = cardPriority === "done" 
                            ? i <= prioritiesArray.indexOf("low")
                            : i <= prioritiesArray.indexOf(cardPriority);
                          const colorClass = cardPriority === "done" 
                            ? "bg-green-500" 
                            : p === "low" ? "bg-green-500"
                            : p === "medium" ? "bg-yellow-500"
                            : p === "high" ? "bg-orange-500"
                            : "bg-purple-500";
                          return (
                            <div
                              key={p}
                              className={`flex-1 rounded-sm h-1 ${active ? colorClass : "bg-gray-200"}`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ==================== DRAGGING CARD SIMULATION PREVIEW ==================== */}
              {animationCardId === "k2" && (
                <div
                  className="absolute p-3.5 rounded-lg text-left pointer-events-none transition-all duration-600 ease-in-out z-20 bg-white text-gray-800 border border-gray-200 shadow-sm flex flex-col gap-2 w-38"
                  style={{
                    left: `${cursorPos.x}%`,
                    top: `${cursorPos.y}%`,
                    transform: "translate(-50%, -50%) rotate(2deg)",
                  }}
                >
                  {/* Icon and Title */}
                  <div className="flex items-start gap-2">
                    <FaBook size={10} className="text-blue-500 mt-0.5 shrink-0" />
                    <span className="text-[12px] font-semibold flex-1 leading-tight truncate text-gray-800">
                      Write API specs
                    </span>
                  </div>

                  {/* Meta info (Assignee name and avatar + date) */}
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1.5">
                      <img 
                        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=50&h=50&fit=crop&crop=face" 
                        alt="Sarah" 
                        className="w-5 h-5 rounded-full object-cover border border-gray-100 shrink-0" 
                      />
                      <span className="text-[10px] text-gray-500 font-medium">
                        Sarah
                      </span>
                    </div>
                    <span className="text-[9px] text-gray-400 font-mono">
                      03 Jul
                    </span>
                  </div>

                  {/* Priority dash bar at bottom */}
                  <div className="flex gap-0.5 h-1 mt-1.5 select-none">
                    {["low", "medium", "high", "urgent"].map((p, i) => {
                      const prioritiesArray = ["low", "medium", "high", "urgent"];
                      const cardPriority = "medium";
                      const active = i <= prioritiesArray.indexOf(cardPriority);
                      const colorClass = p === "low" ? "bg-green-500"
                        : p === "medium" ? "bg-yellow-500"
                        : p === "high" ? "bg-orange-500"
                        : "bg-purple-500";
                      return (
                        <div
                          key={p}
                          className={`flex-1 rounded-sm h-1 ${active ? colorClass : "bg-gray-200"}`}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ==================== SIMULATED MOUSE CURSOR ==================== */}
              <div
                className="absolute w-5 h-5 pointer-events-none transition-all duration-600 ease-in-out z-30 flex items-center justify-center"
                style={{
                  left: `${cursorPos.x}%`,
                  top: `${cursorPos.y}%`,
                  transform: "translate(-3px, -3px)",
                }}
              >
                <svg
                  className="w-5 h-5 transition-transform duration-200"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d={
                      cursorGrabbing
                        ? "M12 2C10.9 2 10 2.9 10 4V11H4C2.9 11 2 11.9 2 13C2 14.1 2.9 15 4 15H10V20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20V15H20C21.1 15 22 14.1 22 13C22 11.9 21.1 11 20 11H14V4C14 2.9 13.1 2 12 2Z"
                        : "M5.5 2V18.5L10 14L15.5 24L18.5 22.5L13 12.5L19.5 12L5.5 2Z"
                    }
                    fill={cursorGrabbing ? "#FF6B4A" : "#111827"}
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Logo Cloud Monochrome Footer */}
          <div className="w-full mt-16 pt-12 border-t border-white/5 flex flex-col items-center">
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-6 text-gray-500">
              Powering collaborative teams at
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-40 text-gray-300">
              <span className="font-heading font-black tracking-widest text-base select-none">
                NIKE
              </span>
              <span className="font-heading font-black tracking-tight text-lg select-none">
                NETFLIX
              </span>
              <span className="font-heading font-black tracking-tighter text-xl select-none">
                SLACK
              </span>
              <span className="font-heading font-extrabold tracking-wider text-base select-none">
                SPOTIFY
              </span>
              <span className="font-bold text-lg select-none font-mono">
                REDUX
              </span>
              <span className="font-heading font-black tracking-widest text-base select-none">
                AIRBNB
              </span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
