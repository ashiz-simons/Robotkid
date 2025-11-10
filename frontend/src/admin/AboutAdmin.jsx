// src/admin/AboutAdmin.jsx
import React, { useEffect, useState } from "react";
import API from "../api/axiosInstance";

const AboutAdmin = () => {
  const [profile, setProfile] = useState({ name: "", bio: "", avatar: "" });

  useEffect(() => {
    (async () => {
      try {
        const res = await API.get("/profile");
        setProfile(res.data);
      } catch {
        // If no endpoint, skip
      }
    })();
  }, []);

  const save = async () => {
    try {
      await API.post("/profile", profile);
      alert("Saved");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-red-600 mb-4">Edit About</h2>
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <input value={profile.name} onChange={(e)=>setProfile({...profile,name:e.target.value})} className="w-full border p-3 rounded" placeholder="Name"/>
        <input value={profile.avatar} onChange={(e)=>setProfile({...profile,avatar:e.target.value})} className="w-full border p-3 rounded" placeholder="Avatar URL"/>
        <textarea value={profile.bio} onChange={(e)=>setProfile({...profile,bio:e.target.value})} className="w-full border p-3 rounded" placeholder="Bio" rows={6}/>
        <div className="flex gap-2">
          <button onClick={save} className="bg-red-600 text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default AboutAdmin;
