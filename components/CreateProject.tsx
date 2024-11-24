'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast";
import { useCreateProject } from "@/hooks/useCreateProject";
import { IoIosAdd } from "react-icons/io";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "./ui/button";
export default function CreateProjectButton({ googleId }: { googleId: string }) {
  const [projectName, setProjectName] = useState("");
  const createProjectMutation = useCreateProject(googleId);
  const handleCreateProject = () => {
    if (!projectName) {
      toast.error('project name is requiered !')
      return
    }
    createProjectMutation.mutate({ name: projectName, googleId }, {
      onSuccess: () => {
        setProjectName('');
      },
    });
  }
  return (
    <Popover>
      <PopoverTrigger  asChild>
        <Button variant="outline"><IoIosAdd /></Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="w-[250px] rounded-lg p-4 flex flex-col gap-4 ">
          <h4>Create a New Project</h4>
          <Input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project Name" />
          <div className="w-full flex justify-start gap-2 text-[12px] font-extralight">
            <button className="hover:opacity-85 duration-300 mt-4" onClick={handleCreateProject} disabled={createProjectMutation.isPending}>
              {createProjectMutation.isPending ? 'Creating...' : 'Create'}
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
