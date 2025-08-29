import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPostLanding } from "../../services/PostService";
import { useParams } from "react-router-dom";

function useGetPostUser({ page }) {
    const queryClient = useQueryClient();
    const { userId } = useParams()
    const { isLoading, data } = useQuery({
        queryKey: ["postsUser", page, userId],
        queryFn: () => getPostLanding({ page, size: 9, userId }),
    });
    const { content: posts = [],
        size,
        totalElements,
        totalPages,
        last: isLast, } = data ?? {};
    if (page + 1 < totalPages) {
        queryClient.prefetchQuery({
            queryKey: ["postsUser", page + 1, userId],
            queryFn: () => getPostLanding({ page: page + 1, size: 9, userId }),
        });
    }

    return { isLoading, posts, page, size, totalElements, totalPages, isLast };
}

export default useGetPostUser;
