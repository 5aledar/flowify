export async function fetchProjects(googleId: string) {
    try {
      const response = await fetch(`/api/projects/${googleId}`, {
        method: "GET",
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to fetch projects");
      }
  
      const projects = await response.json();
      return projects;
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  }
  