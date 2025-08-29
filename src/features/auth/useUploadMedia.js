import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadMedia as uploadMediaAPI } from "../../services/UserService";

export default function useUploadMedia() {
    const queryClient = useQueryClient()
    const { isPending, mutate: uploadMedia } = useMutation({
        mutationFn: ({ file, type }) => uploadMediaAPI({ file, type }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["profile"]
            })
        }
    })

    return { isPending, uploadMedia }
}
