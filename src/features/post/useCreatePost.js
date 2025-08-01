import { useMutation } from "@tanstack/react-query";

import { createPost as createPostAPI } from "../../services/PostService";


function useCreatePost() {

    const { isPending, mutate: createPost } = useMutation({
        mutationFn: ({ request }) => createPostAPI({ request })
    });


    return { isPending, createPost };
}

export default useCreatePost;
