import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProjectAccess = async (id: string) => {
    try {
        const { data } = await axios.get(`/api/projectaccess/${id}`)
        return data
    } catch (error) {
        console.log(error);
    }
}

export const useFetchProjectAccess = (id: string) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['access', id],
        queryFn: () => fetchProjectAccess(id)
    })

    return {
        data, error, isLoading
    }
}