'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast";
export default function CreateProjectButton({ googleId }: { googleId: string }) {
  const [showForm, setShowForm] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateProject = async () => {
    if (!projectName) {
      alert("Project name is required.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: projectName, googleId }),
      });

      if (response.ok) {
        const project = await response.json();
        toast.success('new project created')
        setShowForm(false);
        setProjectName("");
      } else {
        const error = await response.json();
      }
    } catch (error) {
      console.error("Error creating project:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 p-2 rounded-md hover:bg-blue-700 text-white">
        Create Project
      </button>

      {showForm && (
        <div className="absolute top-28 right-16 w-[250px] bg-gray-900 rounded-lg p-4 flex flex-col gap-3 ">
          <h2>Create a New Project</h2>
          <Input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project Name"
            
          />
          <div className="w-full flex justify-start gap-2 text-[12px] font-extralight">

            <button className="hover:opacity-85 duration-300" onClick={handleCreateProject} disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </button>
            <button onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
