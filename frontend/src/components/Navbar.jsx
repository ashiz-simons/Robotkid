import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // enable smooth scrolling globally
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  // highlight nav links based on scroll position
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => sections.forEach((sec) => observer.unobserve(sec));
  }, []);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      const navbarHeight = 80;
      const offsetTop = target.offsetTop - navbarHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setMenuOpen(false);
    }
  };

  const navItems = ["Home", "About", "Projects", "Skills", "Contact"];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#FAFAF8]/95 backdrop-blur-lg shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-extrabold text-red-600 tracking-wide hover:scale-105 transition-transform duration-300">
          Robotkid
        </h1>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-10 text-gray-800 font-medium">
          {navItems.map((item) => {
            const id = item.toLowerCase();
            const isActive = activeSection === id;
            return (
              <li key={item}>
                <a
                  href={`#${id}`}
                  onClick={(e) => handleLinkClick(e, `#${id}`)}
                  className={`transition-all duration-200 ${
                    isActive
                      ? "text-red-600 underline underline-offset-4 font-semibold"
                      : "hover:text-red-600"
                  }`}
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-800 focus:outline-none"
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#FAFAF8] shadow-lg border-t border-red-100"
          >
            <ul className="flex flex-col items-center py-4 space-y-4 text-gray-800 font-medium">
              {navItems.map((item) => {
                const id = item.toLowerCase();
                const isActive = activeSection === id;
                return (
                  <li key={item}>
                    <a
                      href={`#${id}`}
                      onClick={(e) => handleLinkClick(e, `#${id}`)}
                      className={`block transition-all duration-200 ${
                        isActive
                          ? "text-red-600 underline underline-offset-4 font-semibold"
                          : "hover:text-red-600"
                      }`}
                    >
                      {item}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
