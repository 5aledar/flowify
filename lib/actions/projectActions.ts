'use server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export async function updateProjectTitle(projectId: string, title: string) {
  try {
    const updatedProject = await prisma.project.update({
      where: { id: parseInt(projectId) },
      data: { name: title },
    });
    revalidatePath(`/dashboard/${projectId}`);
    return { success: true, data: updatedProject };
  } catch (error) {
    console.error('Error updating project title:', error);
    return { success: false, error: 'Failed to update project title' };
  }
}
