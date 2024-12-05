import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const updateProject = async (id: string, title: string , email:string) => {
    try {

        const { data } = await axios.put(`/api/projects/${id}?email=${email}`, {
            data: {
                title,
            }
        })
        return data
    } catch (error) {
        console.log(error);

    }
}


export const useUpdateProject = (id: string, title: string , email: string) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['projectTitle', id, title],
        queryFn: () => updateProject(id, title , email)
    })

    return {
        data
    }
}