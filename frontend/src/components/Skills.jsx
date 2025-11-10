import React, { useEffect, useState } from "react";
import * as Icons from "react-icons/fa";
import { motion } from "framer-motion";
import API from "../api/axiosInstance";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch skills from backend
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await API.get("/skills");
        setSkills(res.data);
      } catch (error) {
        console.error("❌ Error loading skills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading)
    return (
      <section
        id="skills"
        className="py-20 bg-[#FAFAF8] text-gray-900 flex justify-center items-center"
      >
        <p>Loading skills...</p>
      </section>
    );

  return (
    <section id="skills" className="py-20 bg-[#FAFAF8] text-gray-900 transition-all">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-12 text-red-700">
          My <span className="text-red-500">Skills</span>
        </h2>

        {skills.length === 0 ? (
          <p>No skills added yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => {
              const IconComponent = Icons[skill.icon] || Icons.FaStar; // fallback icon
              return (
                <motion.div
                  key={skill.id}
                  className="bg-white border border-red-100 p-6 rounded-2xl shadow-md hover:shadow-xl flex flex-col items-center justify-center transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <IconComponent className="text-5xl mb-4 text-red-500" />
                  <h3 className="text-xl font-semibold mb-2">{skill.name}</h3>

                  <div className="w-full bg-red-100 rounded-full h-2 mt-2">
                    <motion.div
                      className="bg-red-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1 }}
                    ></motion.div>
                  </div>
                  <p className="text-sm mt-2 text-gray-700 font-medium">
                    {skill.level}%
                  </p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
