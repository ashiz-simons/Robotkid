import React, { useEffect, useState } from "react";
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = "http://localhost:5000/api/projects";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(API_BASE);
        setProjects(res.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section className="flex justify-center items-center h-60 bg-[#FAFAF8]">
        <p className="text-gray-500 animate-pulse">Loading projects...</p>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="bg-[#FAFAF8] py-20 px-6 md:px-12 lg:px-24"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-red-700">
        Featured <span className="text-red-500">Projects</span>
      </h2>

      {projects.length === 0 ? (
        <p className="text-center text-gray-600">
          No projects found. Please add some via the admin dashboard.
        </p>
      ) : (
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-red-100 rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 font-semibold hover:underline hover:underline-offset-4"
                  >
                    View Project →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Projects;
