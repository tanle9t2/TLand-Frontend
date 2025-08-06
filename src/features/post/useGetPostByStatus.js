import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPostByStatus } from "../../services/PostService";
import { useParams, useSearchParams } from "react-router-dom";


function useGetPostByStatus() {
    const { status = "SHOW" } = useParams();
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")) : 0;
    const kw = searchParams.get("kw") || "";
    const { isLoading, data } = useQuery({
        queryKey: ["posts", status, page, kw],
        queryFn: () => getPostByStatus({ page, status, kw }),
    });
    const { content: posts = [],
        size,
        totalElements,
        totalPages,
        isLast, } = data ?? {};
    if (page + 1 < totalPages) {
        queryClient.prefetchQuery({
            queryKey: ["post", status, page + 1, kw],
            queryFn: () => getPostByStatus({ page: page + 1, status, kw }),
        });
    }

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["post", status, page - 1, kw],
            queryFn: () => getPostByStatus({ page: page - 1, status, kw }),
        });

    return { isLoading, posts, page, size, totalElements, totalPages, isLast };
}

export default useGetPostByStatus;
