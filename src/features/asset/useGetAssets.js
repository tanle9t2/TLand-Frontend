import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getAssets } from "../../services/AssetService";

function useGetAssets() {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")) : 0;
    const { isLoading, data } = useQuery({
        queryKey: ["assets", page],
        queryFn: () => getAssets({ page }),
    });
    const {
        content: assets = [],
        size = 4,
        totalElements = 0,
        totalPages = 0,
    } = data ?? {};
    if (page + 1 < totalPages) {
        queryClient.prefetchQuery({
            queryKey: ["bookings", page + 1],
            queryFn: () => getAssets({ page: page + 1 }),
        });
    }

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["bookings", page - 1],
            queryFn: () => getAssets({ page: page - 1 }),
        });


    return { isLoading, assets, page, size, totalElements, totalPages };
}

export default useGetAssets;
