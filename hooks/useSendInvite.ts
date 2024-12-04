import { currentUser } from "@clerk/nextjs/server";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

// Define sendInvite function
const sendInvite = async (senderEmail: string, userEmail: string, projectId: string, permission: string) => {
   console.log({senderEmail, userEmail, projectId, permission});
   
    if (!senderEmail || !userEmail || !projectId || !permission) {
        toast.error('missing credintials')
        console.log('missing credintials')
        return;
    }
    try {
        const { data } = await axios.post('/api/invitations', { projectId, userEmail, senderEmail, permissions: permission });
        console.log(data);

        if (!data.success) {
            toast.error(data.error)
        }
        return data;
    } catch (error: any) {
        
        toast.error(error.response.data.error);
        throw new Error("Failed to send invitation");
    }
}

export const useSendInvite = () => {
    return useMutation({
        mutationFn: (variables: { userEmail: string, senderEmail: string, projectId: string, permission: string }) =>
            sendInvite(variables.senderEmail, variables.userEmail, variables.projectId, variables.permission),
        onSuccess: () => {
            toast.success('invitation sent successfully')
        },
        onError: (error) => {
            console.log(error);
        }
    });
}
