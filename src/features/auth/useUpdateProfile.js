import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile as updateProfileAPI } from "../../services/UserService";

export default function useUpdateProfile() {
    const queryClient = useQueryClient()
    const { isPending, mutate: updateProfile } = useMutation({
        mutationFn: ({ firstName, lastName, description, email, phoneNumber, taxCode, cid, dob, sex }) => updateProfileAPI({ firstName, lastName, email, description, phoneNumber, taxCode, cid, dob, sex }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"]
            })
            queryClient.invalidateQueries({
                queryKey: ["profile"]
            })
        }
    })

    return { isPending, updateProfile }
}
