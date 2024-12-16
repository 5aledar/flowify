'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import { useCreateProject } from '@/hooks/useCreateProject';
import { IoIosAdd } from 'react-icons/io';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from './ui/button';

export default function CreateProjectButton({ email }: { email: string }) {
  const [projectName, setProjectName] = useState('');
  const [popoverOpen, setPopoverOpen] = useState(false);
  const createProjectMutation = useCreateProject(email);

  const handleCreateProject = () => {
    if (!projectName) {
      toast.error('Project name is required!');
      return;
    }
    createProjectMutation.mutate(
      { name: projectName, email },
      {
        onSuccess: () => {
          setProjectName('');
          setPopoverOpen(false);
        },
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCreateProject();
    }
  };

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <IoIosAdd />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="w-[250px] rounded-lg p-4 flex flex-col gap-4 ">
          <h4>Create a New Project</h4>
          <Input
            required
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Project Name"
          />
          <div className="w-full flex justify-start gap-2 text-[12px] font-extralight">
            <Button
              className="hover:opacity-85 duration-300 mt-4"
              type="submit"
              onClick={handleCreateProject}
              disabled={createProjectMutation.isPending}
            >
              {createProjectMutation.isPending ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
