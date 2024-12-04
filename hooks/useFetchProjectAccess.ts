import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchProjectAccess = async (email: string) => {
    try {
        const { data } = await axios.get(`/api/projectaccess?email=${email}`)
        return data
    } catch (error) {
        console.log(error);
    }
}

export const useFetchProjectAccess = (email: string) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['access', email],
        queryFn: () => fetchProjectAccess(email)
    })

    return {
        projectAccesses: data?.projectAccesses, error, loading: isLoading
    }
}