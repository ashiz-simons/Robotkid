import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("message", formData.message);
      if (formData.file) formDataToSend.append("file", formData.file);

      await axios.post("http://localhost:5000/api/messages", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "", file: null });
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
    }
  };

  return (
    <section id="contact" className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-xl mx-auto bg-white border border-red-100 p-8 rounded-2xl shadow-lg">
        <h2 className="text-red-600 text-3xl font-bold mb-6 text-center">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full border-red-300 border p-3 rounded-lg"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full border-red-300 border p-3 rounded-lg"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full border-red-300 border p-3 rounded-lg"
            rows="5"
            required
          />
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="bg-red-200 border-red-500 text-red-900 w-full border p-3 rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-white hover:text-red-600 border-2 border-red-500"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
