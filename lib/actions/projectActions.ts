// lib/projectActions.ts

import axios from 'axios'
import toast from 'react-hot-toast';

export async function fetchProjects(googleId: string) {
    const apiUrl = `http://localhost:3000/api/projects/create/${googleId}`;

    const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch projects.");
    }

    return response.json();
}



// Function to delete the project by id and googleId
export async function deleteProject(googleId: string, id: number) {

    try {
        const response = await axios.delete(`/api/projects/${id}`, {
            params: { googleId } // Pass googleId as query parameter
        });
        toast.success('PROJECT DELETED SUCCEFULLY')
        return response.data; // Return the response data (success message or other)
    } catch (error: any) {
        throw new Error(error.response?.data?.error || "Failed to delete project.");
    }
}
