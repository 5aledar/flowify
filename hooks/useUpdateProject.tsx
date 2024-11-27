import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { title } from "process";


const updateProject = async (id: string, title: string) => {
    try {

        const { data } = await axios.put(`/api/projects/${id}`, {
            data: {
                title,
            }
        })
        return data
    } catch (error) {
        console.log(error);

    }
}


export const useUpdateProject = (id: string, title: string) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['projectTitle', id, title],
        queryFn: () => updateProject(id, title)
    })

    return {
        data
    }
}