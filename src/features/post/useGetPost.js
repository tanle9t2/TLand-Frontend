import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../../services/PostService";
import { useParams } from "react-router-dom";

function useGetPost() {
    const { postId } = useParams()
    const { isLoading, data: post } = useQuery({
        queryKey: ["post", postId],
        queryFn: () => getPostById(postId),
    });

    return { isLoading, post };
}

export default useGetPost; 