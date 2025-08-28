import { useMutation, useQueryClient } from "@tanstack/react-query"
import { hidePost as hidePostAPI } from "../../services/PostService"
export default function useHidePost() {
    const queryClient = useQueryClient()
    const { isPending, mutate: hidePost } = useMutation({
        mutationFn: ({ postId }) => hidePostAPI({ postId }),
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

    return { isPending, hidePost }
}