import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showPost as showPostAPI } from "../../services/PostService"
export default function useShowPost() {
    const queryClient = useQueryClient()
    const { isPending, mutate: showPost } = useMutation({
        mutationFn: ({ postId }) => showPostAPI({ postId }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["posts"],
                exact: false
            })
            queryClient.invalidateQueries({
                queryKey: ["counts"],
            })
        }
    })

    return { isPending, showPost }
}