"use client";

import { useEffect, useState } from "react";
import { fetchProjects } from "@/lib/actions/projectActions";

export default function UserProjects({ googleId }: { googleId: string }) {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await fetchProjects(googleId);
                setProjects(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, [googleId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>User Projects</h1>
            {projects.length ? (
                <ul>
                    {projects.map((project) => (
                        <li key={project.id}>
                            <h2>{project.name}</h2>
                            <ul>
                                {project.tasks.map((task: any) => (
                                    <li key={task.id}>
                                        <strong>{task.title}</strong>: {task.status}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No projects found.</p>
            )}
        </div>
    );
}
