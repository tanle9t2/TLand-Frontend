import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { getComments } from "../../services/PostService";
import { COMMENT_SIZE } from "../../utils/constant";

export default function useGetComments() {
    const { postId } = useParams()
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")) : 0;
    const { isLoading, data } = useQuery({
        queryKey: ["comments", postId, page,],
        queryFn: () => getComments({ postId, page, size: COMMENT_SIZE }),
    });
    const { content: comments = [],
        size,
        totalElements,
        totalPages,
        isLast, } = data ?? {};
    if (page + 1 < totalPages) {
        queryClient.prefetchQuery({
            queryKey: ["comments", postId, page + 1,],
            queryFn: () => getComments({ postId, page: page + 1, size: COMMENT_SIZE }),
        });
    }
    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["comments", postId, page - 1,],
            queryFn: () => getComments({ postId, page: page - 1, size: COMMENT_SIZE }),
        });

    return { isLoading, comments, page, size, totalElements, totalPages, isLast };
}