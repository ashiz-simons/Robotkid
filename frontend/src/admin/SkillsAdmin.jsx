// src/admin/SkillsAdmin.jsx
import React, { useEffect, useState } from "react";
import API from "../api/axiosInstance";

const SkillsAdmin = () => {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({ name: "", level: 80, icon: "FaStar" });
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    const res = await API.get("/skills");
    setSkills(res.data);
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (editingId) await API.put(`/skills/${editingId}`, form);
    else await API.post("/skills", form);
    setForm({ name: "", level: 80, icon: "FaStar" });
    setEditingId(null);
    await load();
  };

  const startEdit = (s) => {
    setForm({ name: s.name, level: s.level, icon: s.icon || "FaStar" });
    setEditingId(s._id || s.id);
  };

  const remove = async (id) => {
    if (!confirm("Delete skill?")) return;
    await API.delete(`/skills/${id}`);
    await load();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-red-600 mb-4">Manage Skills</h2>

      <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow mb-6">
        <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Skill name" className="w-full border p-3 rounded mb-3"/>
        <input value={form.level} onChange={e=>setForm({...form,level:e.target.value})} placeholder="Level (0-100)" className="w-full border p-3 rounded mb-3"/>
        <input value={form.icon} onChange={e=>setForm({...form,icon:e.target.value})} placeholder="Icon (FaReact)" className="w-full border p-3 rounded mb-3"/>
        <div className="flex gap-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800" type="submit">{editingId ? "Update" : "Add"}</button>
          {editingId && <button type="button" onClick={()=>{ setEditingId(null); setForm({name:"",level:80,icon:"FaStar"}) }} className="px-4 py-2 border rounded">Cancel</button>}
        </div>
      </form>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map(s => (
          <div key={s._id || s.id} className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold">{s.name}</h3>
            <p className="text-sm text-gray-600">Level: {s.level}%</p>
            <div className="flex gap-2 mt-3">
              <button onClick={() => startEdit(s)} className="text-blue-600">Edit</button>
              <button onClick={() => remove(s._id || s.id)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsAdmin;
