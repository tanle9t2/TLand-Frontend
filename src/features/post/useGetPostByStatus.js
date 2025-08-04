import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPostByStatus } from "../../services/PostService";
import { useParams, useSearchParams } from "react-router-dom";


function useGetPostByStatus() {
    const { status = "SHOW" } = useParams();
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")) : 0;

    const { isLoading, data } = useQuery({
        queryKey: ["posts", status, page],
        queryFn: () => getPostByStatus({ page, status }),
    });
    const { content: posts = [],
        size,
        totalElements,
        totalPages,
        isLast, } = data ?? {};
    if (page + 1 < totalPages) {
        queryClient.prefetchQuery({
            queryKey: ["post", status, page + 1],
            queryFn: () => getPostByStatus({ page: page + 1, status }),
        });
    }

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["post", page - 1],
            queryFn: () => getPostByStatus({ page: page - 1, status }),
        });

    return { isLoading, posts, page, size, totalElements, totalPages, isLast };
}

export default useGetPostByStatus;
