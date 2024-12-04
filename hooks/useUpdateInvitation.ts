import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

interface UpdateInvitationVariables {
    id: number;
    status: 'ACCEPTED' | 'DECLINED';
}

interface UpdateInvitationResponse {
    success: boolean;
    message: string;
    updatedInvitation: any;
    projectAccess?: any;
}

const updateInvitation = async ({ id, status }: UpdateInvitationVariables): Promise<UpdateInvitationResponse> => {
    try {
        console.log(id , status);
        
        const { data } = await axios.patch(`/api/invitations/${id}`, { status });
        return data; // Return the response data from the API
    } catch (error) {
        throw new Error('Failed to update invitation status');
    }
};

export const useUpdateInvitationStatus = (): UseMutationResult<UpdateInvitationResponse, Error, UpdateInvitationVariables> => {
    return useMutation<UpdateInvitationResponse, Error, UpdateInvitationVariables>(
        {
            mutationFn: updateInvitation,
            onSuccess: (data) => {
                toast.success(data.message || 'Invitation status updated successfully!');
            },
            onError: (error: Error) => {
                toast.error(error.message || 'Error updating invitation status');
            },
        }
    );
};
