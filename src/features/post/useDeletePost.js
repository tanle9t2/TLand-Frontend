import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deletePost as deletePostAPI } from "../../services/PostService";


function useDeletePost() {
    const queryClient = useQueryClient();
    const { isPending, mutate: deletePost } = useMutation({
        mutationFn: ({ id }) => deletePostAPI(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["posts", "SHOW"],
                exact: false,
            });
        },
    });


    return { isPending, deletePost };
}

export default useDeletePost;
