import React from "react";

const About = () => {
  return (
    <section
      id="about"
      className="bg-[#FAFAF8] py-20 px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-center"
    >
      {/* Profile Image */}
      <div className="w-40 h-40 md:w-60 md:h-60 mb-8 md:mb-0 md:mr-12 rounded-full overflow-hidden shadow-xl border-4 border-red-400">
        <img
          src="src\assets\RBK.jpg"
          alt="Robotkid profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bio Section */}
      <div className="max-w-xl text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-red-900">
          About <span className="text-red-500">Me</span>
        </h2>

        <p className="text-gray-700 leading-relaxed mb-6">
          I'm <span className="font-semibold text-red-700">Robotkid</span>, a
          passionate graphics designer and frontend developer. I specialize in
          crafting clean, modern, and emotionally engaging designs that connect
          people with ideas. I believe in blending creativity with technology to
          build experiences that feel both beautiful and functional.
        </p>

        <a
          href="#projects"
          className="bg-red-600 text-[#FAFAF8] px-6 py-3 rounded-lg text-lg shadow-md hover:bg-[#FAFAF8] hover:text-red-600 border-2 border-red-600 transition-all transform hover:scale-105"
        >
          See My Projects
        </a>
      </div>
    </section>
  );
};

export default About;
