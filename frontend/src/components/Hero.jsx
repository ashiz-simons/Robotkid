import React from "react";
import heroBg from "../assets/Porto.png"; // ✅ Correct local import

const Hero = () => {
  return (
    <section
      id="home"
      className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      ></div>

      {/* Red + Milk gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-blue-700/40 to-[#FAFAF8]/90"></div>

      {/* Content */}
      <div className="relative z-10 px-4">
        <h2 className="text-5xl md:text-7xl font-bold text-[#FAFAF8] mb-4 drop-shadow-lg">
          Hi, I'm{" "}
          <span className="text-red-400 font-extrabold tracking-wide">
            Robotkid
          </span>
        </h2>

        <p className="text-lg md:text-2xl text-[#FAFAF8]/90 mb-8 max-w-xl mx-auto leading-relaxed">
          A Creative{" "}
          <span className="font-semibold text-[#FAFAF8]">Graphics Designer</span>{" "}
          &<span className="font-semibold text-[#FAFAF8]"> Frontend Developer</span> — 
          crafting bold, modern, and meaningful digital experiences.
        </p>

        <a
          href="#projects"
          className="bg-red-600 text-[#FAFAF8] px-8 py-3 rounded-full text-lg font-medium hover:bg-[#FAFAF8] hover:text-red-600 transition-all border-2 border-red-600 shadow-md hover:shadow-xl"
        >
          View My Work
        </a>
      </div>

      {/* Bottom fade for smooth transition */}
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[#FAFAF8] to-transparent"></div>
    </section>
  );
};

export default Hero;
