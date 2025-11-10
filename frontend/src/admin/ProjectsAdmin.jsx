import React, { useEffect, useState } from "react";
import API from "../api/axiosInstance";

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);

  // ✅ Load all projects
  const loadProjects = async () => {
    try {
      const res = await API.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("❌ Error loading projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // ✅ Add project
  const handleAdd = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("link", link || ""); // ✅ ensure not undefined
    if (image) formData.append("image", image);

    try {
      await API.post("/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // reload all projects
      await loadProjects();

      setTitle("");
      setDescription("");
      setLink("");
      setImage(null);
    } catch (err) {
      console.error("❌ Error adding project:", err);
    }
  };

  // ✅ Delete project
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await API.delete(`/projects/${id}`);
      setProjects(projects.filter((p) => p.id !== id)); // ✅ correct key
    } catch (err) {
      console.error("❌ Error deleting project:", err);
    }
  };

  if (loading) return <p>Loading projects...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-red-700 mb-4">Manage Projects</h2>

      {/* ✅ Add new project form */}
      <form
        onSubmit={handleAdd}
        className="bg-white p-4 rounded-xl shadow mb-6 space-y-3"
      >
        <h3 className="text-lg font-semibold">Add New Project</h3>

        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />

        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />

        <input
          type="url"
          placeholder="Project Link (optional)"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 w-full rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Project
        </button>
      </form>

      {/* ✅ Display existing projects */}
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <div
              key={p.id}
              className="bg-white p-4 rounded-xl shadow flex flex-col justify-between"
            >
              <div>
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="rounded-lg mb-2 h-40 w-full object-cover"
                  />
                )}
                <h3 className="font-bold text-lg">{p.title}</h3>
                <p className="text-gray-700">{p.description}</p>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline mt-2 inline-block"
                  >
                    View Project
                  </a>
                )}
              </div>

              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-600 text-white px-3 py-1 mt-3 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsAdmin;
