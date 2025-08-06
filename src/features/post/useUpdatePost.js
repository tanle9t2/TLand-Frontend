import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updatePost as updatePostAPI } from "../../services/PostService";


function useUpdatePost() {
    const queryClient = useQueryClient()
    const { isPending, mutate: updatePost } = useMutation({
        mutationFn: ({ id, request }) => updatePostAPI({ id, request }),
        onSuccess: (data) => {

            queryClient.invalidateQueries({
                queryKey: ["post", data.data.id]
            })
        }
    });


    return { isPending, updatePost };
}

export default useUpdatePost;
