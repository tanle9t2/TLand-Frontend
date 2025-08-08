import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getHistory, getPostById } from "../../services/PostService";
import { useParams, useSearchParams } from "react-router-dom";

function useGetHistory() {
    const { assetId } = useParams()
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")) : 0;
    const { isLoading, data } = useQuery({
        queryKey: ["history", assetId, page,],
        queryFn: () => getHistory({ id: assetId, page }),
    });
    const { content: histories = [],
        size,
        totalElements,
        totalPages,
        isLast, } = data ?? {};
    if (page + 1 < totalPages) {
        queryClient.prefetchQuery({
            queryKey: ["history", assetId, page + 1,],
            queryFn: () => getHistory({ id: assetId, page: page + 1 }),
        });
    }

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["history", assetId, page - 1,],
            queryFn: () => getHistory({ id: assetId, page: page - 1 }),
        });

    return { isLoading, histories, page, size, totalElements, totalPages, isLast };
}

export default useGetHistory;
