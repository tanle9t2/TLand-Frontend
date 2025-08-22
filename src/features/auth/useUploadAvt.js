import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadAvt as uploadAvtAPI } from "../../services/UserService";

export default function useUploadAvt() {
    const queryClient = useQueryClient()
    const { isPending, mutate: uploadAvt } = useMutation({
        mutationFn: ({ file }) => uploadAvtAPI(file),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"]
            })
            queryClient.invalidateQueries({
                queryKey: ["profile"]
            })
        }
    })

    return { isPending, uploadAvt }
}
