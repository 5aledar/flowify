'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast";
import { useCreateProject } from "@/hooks/useCreateProject";
import { IoIosAdd } from "react-icons/io";
export default function CreateProjectButton({ googleId }: { googleId: string }) {
  const [showForm, setShowForm] = useState(false);
  const [projectName, setProjectName] = useState("");
  const createProjectMutation = useCreateProject(googleId);
  const handleCreateProject = () => {
    if (!projectName) {
      toast.error('project name is requiered !')
      return
    }
    createProjectMutation.mutate({ name: projectName, googleId }, {
      onSuccess: () => {
        setShowForm(false);
        setProjectName('');
      },
    });
  }
  return (
    <div>
      <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 p-2 rounded-md hover:bg-blue-700 text-white">
      <IoIosAdd size={18}/>
      </button>

      {showForm && (
        <div className="absolute top-28 right-16 w-[250px] dark:bg-gray-900 bg-gray-50 rounded-lg p-4 flex flex-col gap-3 ">
          <h2>Create a New Project</h2>
          <Input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project Name"

          />
          <div className="w-full flex justify-start gap-2 text-[12px] font-extralight">
            <button className="hover:opacity-85 duration-300" onClick={handleCreateProject} disabled={createProjectMutation.isPending}>
              {createProjectMutation.isPending ? 'Creating...' : 'Create'}
            </button>
            <button onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
