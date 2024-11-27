// lib/projectActions.ts
'use server'
import axios from 'axios'
import { revalidatePath } from 'next/cache';
import toast from 'react-hot-toast';
import { prisma } from '@/lib/prisma';

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



export async function deleteProject(googleId: string, id: number) {

    try {
        const response = await axios.delete(`/api/projects/${id}`, {
            params: { googleId } 
        });
        toast.success('PROJECT DELETED SUCCEFULLY')
        // revalidatePath('/dashboard')
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.error || "Failed to delete project.");
    }
}




export async function updateProjectTitle(projectId: string, title: string) {
    try {
        const updatedProject = await prisma.project.update({
            where: { id: parseInt(projectId) },
            data: { name: title },
        });
        revalidatePath(`/dashboard/${projectId}`)
        return { success: true, data: updatedProject };
    } catch (error) {
        console.error('Error updating project title:', error);
        return { success: false, error: 'Failed to update project title' };
    }
}