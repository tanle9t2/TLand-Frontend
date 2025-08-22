import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createComment as createCommentAPI } from "../../services/PostService";
import { useSearchParams } from "react-router-dom";


function useCreateComment() {
    const queryClient = useQueryClient()
    const [searchParams, setSearchParams] = useSearchParams()
    const { isPending, mutate: createComment } = useMutation({
        mutationFn: ({ postId, content }) => createCommentAPI({ postId, content }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["comments"],
                exact: false
            })
            searchParams.delete("page")
            setSearchParams(searchParams)
        }
    });


    return { isPending, createComment };
}

export default useCreateComment;
