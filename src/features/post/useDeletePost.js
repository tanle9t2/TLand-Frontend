import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deletePost as deletePostAPI } from "../../services/PostService";


function useDeletePost() {
    const queryClient = useQueryClient();
    const { isPending, mutate: deletePost } = useMutation({
        mutationFn: ({ id }) => deletePostAPI(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["posts"],
                exact: false,
            });
            queryClient.invalidateQueries({
                queryKey: ["counts"],
            })
        },
    });


    return { isPending, deletePost };
}

export default useDeletePost;
