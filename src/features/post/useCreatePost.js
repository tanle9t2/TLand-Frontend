import { useMutation } from "@tanstack/react-query";

import { createPost as createPostAPI } from "../../services/PostService";


function useCreatePost() {

    const { isPending, mutate: createPost } = useMutation({
        mutationFn: ({ request }) => createPostAPI({ request }),
        onSuccess: (data) => {
            window.location.assign(data.data.paymentUrl);
        }
    });


    return { isPending, createPost };
}

export default useCreatePost;
