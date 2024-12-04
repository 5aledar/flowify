import { useQuery } from "@tanstack/react-query"
import axios from "axios"


const fetchInvites = async (userEmail: string) => {
    try {
        const { data } = await axios.get(`/api/invitations?email=${userEmail}`)
        
        return data
    } catch (error) {
        console.log(error);
    }

}

export const useFetchInvites = (userEmail: string) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['invites', userEmail],
        queryFn: () => fetchInvites(userEmail)
    })

    return {
        data,
        error,
        isLoading
    }
}