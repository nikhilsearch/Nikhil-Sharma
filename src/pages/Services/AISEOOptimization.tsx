import React, { useCallback, useEffect, useMemo, useRef } from "react";
import anime from "animejs";

/**
 * GradientSolutionsApp
 * ------------------------------------------------------------
 * A React port of your gradient-themed page with Tailwind CSS,
 * dark/light mode toggle (class strategy), and Anime.js hover effects.
 *
 * Drop-in usage:
 * - Tailwind set with darkMode: 'class'
 * - Ensure your index.html includes <html class="scroll-smooth"> (Tailwind resets ok)
 * - Tailwind build available globally
 * - Anime.js installed: `npm i animejs`
 *
 * If using Vite:
 *   - Save as src/App.tsx (or App.jsx) and render normally.
 *
 * Notes:
 * - We apply the dark class on <html> to utilize Tailwind's class strategy.
 * - Hover animations are handled via React event handlers that call Anime.js.
 */

export default function GradientSolutionsApp() {
  // -------------------------------
  // THEME: manage <html> dark class
  // -------------------------------
  const getInitialTheme = useCallback((): "dark" | "light" => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;
    // Fallback to system preference if no stored value
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }, []);

  const themeRef = useRef<"dark" | "light">("light");

  useEffect(() => {
    const initial = getInitialTheme();
    themeRef.current = initial;
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, [getInitialTheme]);

  const toggleTheme = useCallback(() => {
    const next = themeRef.current === "dark" ? "light" : "dark";
    themeRef.current = next;
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  }, []);

  // -----------------------------------
  // ANIMATION HELPERS (Anime.js)
  // -----------------------------------
  const animateButtonEnter = useCallback((el: HTMLElement) => {
    const isPrimary = el.dataset.variant === "primary";
    anime({
      targets: el,
      scale: [1, 1.05],
      backgroundColor: isPrimary ? ["#9333ea", "#8b5cf6"] : ["#a855f7", "#d946ef"],
      color: [getComputedStyle(el).color || "#ffffff", "#ffffff"],
      easing: "easeInOutQuad",
      duration: 300,
    });
  }, []);

  const animateButtonLeave = useCallback((el: HTMLElement) => {
    const isPrimary = el.dataset.variant === "primary";
    anime({
      targets: el,
      scale: [1.05, 1],
      backgroundColor: isPrimary ? ["#8b5cf6", "#7c3aed"] : ["#a855f7", "rgba(255,255,255,0)"],
      color: ["#ffffff", isPrimary ? "#ffffff" : "#a78bfa"],
      easing: "easeInOutQuad",
      duration: 300,
    });
  }, []);

  const animateCardEnter = useCallback((card: HTMLElement) => {
    const iconWrapper = card.querySelector<HTMLElement>("[data-icon-wrapper]");
    const heading = card.querySelector<HTMLElement>("h3");
    const paragraph = card.querySelector<HTMLElement>("p");

    const shadowBlur = 12;
    anime({
      targets: card,
      scale: 1.05,
      boxShadow: `0 0 ${shadowBlur}px rgba(126,58,238,0.5)`,
      easing: "easeInOutQuad",
      duration: 400,
    });

    if (iconWrapper) {
      anime({
        targets: iconWrapper,
        rotate: { value: 360, duration: 800, easing: "easeInCubic" },
        scale: [1, 1.1],
        backgroundColor: ["#9333ea", "#ec4899"],
        easing: "easeInOutQuad",
        duration: 400,
      });
    }
    if (heading) {
      anime({
        targets: heading,
        color: "#d870f6",
        easing: "easeInOutQuad",
        duration: 400,
      });
    }
    if (paragraph) {
      anime({
        targets: paragraph,
        color: "#e0e0e0",
        easing: "easeInOutQuad",
        duration: 400,
      });
    }
  }, []);

  const animateCardLeave = useCallback((card: HTMLElement) => {
    const iconWrapper = card.querySelector<HTMLElement>("[data-icon-wrapper]");
    const heading = card.querySelector<HTMLElement>("h3");
    const paragraph = card.querySelector<HTMLElement>("p");

    anime({
      targets: card,
      scale: 1,
      boxShadow: (card as any).dataset.originalShadow || getComputedStyle(card).boxShadow,
      easing: "easeInOutQuad",
      duration: 400,
    });

    if (iconWrapper) {
      anime({
        targets: iconWrapper,
        rotate: 0,
        scale: 1,
        backgroundColor: ["#a855f7", "#d946ef"],
        easing: "easeInOutQuad",
        duration: 400,
      });
    }
    if (heading) {
      anime({
        targets: heading,
        color: "#a78bfa",
        easing: "easeInOutQuad",
        duration: 400,
      });
    }
    if (paragraph) {
      anime({
        targets: paragraph,
        color: "#d1d5db",
        easing: "easeInOutQuad",
        duration: 400,
      });
    }
  }, []);

  // cache original shadows for cards on mount
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!cardsContainerRef.current) return;
    const cards = Array.from(cardsContainerRef.current.querySelectorAll<HTMLElement>("[data-card]"));
    cards.forEach((card) => {
      (card as any).dataset.originalShadow = getComputedStyle(card).boxShadow;
    });
  }, []);

  // data for features
  const features = useMemo(
    () => [
      {
        title: "Innovation",
        description: "Driving forward with cutting-edge solutions and creative thinking.",
        icon: (
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        ),
      },
      {
        title: "Reliability",
        description: "Dependable solutions that you can count on, always.",
        icon: (
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.615-1.172a9 9 0 11-11.23 0 9 9 0 0111.23 0zm-5.615 1.172c.438.438.66.977.66 1.549v.004a1.63 1.63 0 01-1.63 1.63H8.81a1.63 1.63 0 01-1.63-1.63v-.004c0-.572.222-1.11.66-1.549m3.826-1.727a2.773 2.773 0 00-2.35-.857c-.816 0-1.52.485-1.837.958" />
          </svg>
        ),
      },
      {
        title: "Agility",
        description: "Adapting quickly to market changes and your evolving needs.",
        icon: (
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        ),
      },
    ],
    []
  );

  return (
    <div className="font-sans bg-gradient-to-br from-purple-800 to-indigo-900 dark:bg-gradient-to-br dark:from-gray-900 dark:to-black text-white dark:text-gray-200 min-h-screen transition-colors duration-500">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-purple-300 dark:text-purple-400">Gradient Solutions</div>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-gray-500 hover:bg-purple-700 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            <svg className="w-6 h-6 text-purple-300 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 18v1M4.21 4.21l1.42 1.42m12.59 12.59l1.42 1.42M21 12h-1M4 12H3m18.36-2.79l-1.42-1.42M4.21 19.79l1.42-1.42M12 17.83V18M12 5.17V6M7.25 7.25L8.67 8.67M15.33 15.33l1.42 1.42" />
            </svg>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-purple-400 to-pink-600 dark:from-purple-300 dark:to-cyan-400">
          Unlock Your Potential
        </h1>
        <p className="text-xl md:text-2xl text-purple-200 dark:text-gray-300 mb-8">
          We provide innovative solutions tailored to your unique needs.
        </p>
        <div className="flex justify-center gap-4">
          <button
            data-variant="primary"
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 transition-colors duration-300"
            onMouseEnter={(e) => animateButtonEnter(e.currentTarget)}
            onMouseLeave={(e) => animateButtonLeave(e.currentTarget)}
          >
            Get Started
          </button>
          <button
            data-variant="ghost"
            className="px-8 py-3 bg-transparent border-2 border-purple-400 hover:bg-purple-600 dark:border-purple-500 dark:hover:bg-purple-700 text-purple-300 dark:text-purple-300 hover:text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 transition-colors duration-300"
            onMouseEnter={(e) => animateButtonEnter(e.currentTarget)}
            onMouseLeave={(e) => animateButtonLeave(e.currentTarget)}
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-br from-purple-400 to-pink-600 dark:from-purple-300 dark:to-cyan-400">
          Our Core Strengths
        </h2>
        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((f, idx) => (
            <article
              key={idx}
              data-card
              role="article"
              className="bg-white/10 dark:bg-gray-800/50 p-6 rounded-lg shadow-xl flex flex-col items-center text-center transform transition-transform duration-300 hover:shadow-2xl"
              onMouseEnter={(e) => animateCardEnter(e.currentTarget)}
              onMouseLeave={(e) => animateCardLeave(e.currentTarget)}
            >
              <div
                data-icon-wrapper
                className="mb-4 p-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-400 dark:to-cyan-400"
                aria-hidden
              >
                {f.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-purple-300 dark:text-purple-400">{f.title}</h3>
              <p className="text-gray-200 dark:text-gray-300">{f.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-lg mx-auto bg-white/5 dark:bg-gray-800/50 p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-br from-purple-400 to-pink-600 dark:from-purple-300 dark:to-cyan-400">
            Let\'s Connect
          </h2>
          <form onSubmit={(e) => { e.preventDefault(); alert("Thanks! We'll get back to you."); }}>
            <div className="mb-5 text-left">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-purple-300 dark:text-gray-400">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="John Doe"
                className="bg-gray-700/30 dark:bg-gray-800/70 border border-gray-600 dark:border-gray-700 text-white text-sm rounded-lg focus:ring-purple-500 dark:focus:ring-gray-700 focus:border-purple-500 dark:focus:border-gray-700 block w-full p-2.5 placeholder-gray-400"
              />
            </div>
            <div className="mb-5 text-left">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-purple-300 dark:text-gray-400">
                Your Email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="name@example.com"
                className="bg-gray-700/30 dark:bg-gray-800/70 border border-gray-600 dark:border-gray-700 text-white text-sm rounded-lg focus:ring-purple-500 dark:focus:ring-gray-700 focus:border-purple-700 dark:focus:border-gray-700 block w-full p-2.5 placeholder-gray-400"
              />
            </div>
            <div className="mb-6 text-left">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-purple-300 dark:text-gray-400">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Your message here..."
                className="bg-gray-700/30 dark:bg-gray-800/70 border border-gray-600 dark:border-gray-700 text-white text-sm rounded-lg focus:ring-purple-500 dark:focus:ring-gray-700 focus:border-purple-500 dark:focus:border-gray-700 block w-full p-2.5 placeholder-gray-400"
              />
            </div>
            <button
              type="submit"
              data-variant="primary"
              className="w-full px-5 py-3 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white font-semibold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 transition-colors duration-300"
              onMouseEnter={(e) => animateButtonEnter(e.currentTarget)}
              onMouseLeave={(e) => animateButtonLeave(e.currentTarget)}
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center text-purple-200 dark:text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Gradient Solutions. All rights reserved.</p>
      </footer>
    </div>
  );
}

/* -------------------------------------
   QUICK WIRING NOTES (Tailwind + Vite)
   -------------------------------------
1) Install deps:
   npm i -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p

2) tailwind.config.js (class strategy):
   module.exports = {
     content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
     darkMode: 'class',
     theme: { extend: {} },
     plugins: [],
   }

3) src/index.css:
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

4) Ensure <html> can receive the 'dark' class.
   The component toggles document.documentElement.classList.
*/