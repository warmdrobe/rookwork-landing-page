import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-in" | "slide-up" | "slide-left" | "slide-right" | "scale-in";
  duration?: number; // duration in ms
  delay?: number; // delay in ms
  threshold?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  animation = "slide-up",
  duration = 800,
  delay = 0,
  threshold = 0.15,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const getTransitionStyle = () => {
    return {
      transitionDuration: `${duration}ms`,
      transitionDelay: `${delay}ms`,
    };
  };

  const getAnimationClasses = () => {
    switch (animation) {
      case "fade-in":
        return isVisible ? "opacity-100" : "opacity-0";
      case "slide-up":
        return isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12";
      case "slide-left":
        return isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12";
      case "slide-right":
        return isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12";
      case "scale-in":
        return isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95";
      default:
        return "";
    }
  };

  return (
    <div
      ref={domRef}
      style={getTransitionStyle()}
      className={`transition-all ease-out will-change-[transform,opacity] ${getAnimationClasses()} ${className}`}
    >
      {children}
    </div>
  );
}
