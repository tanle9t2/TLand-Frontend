import { useInfiniteQuery } from "@tanstack/react-query";
import { getAssets } from "../../services/AssetService";

function useGetAssetInfinite() {
    const {
        data,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ["assets"],
        queryFn: ({ pageParam = 0 }) => getAssets({ page: pageParam }),
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.page + 1;
            return !lastPage.last ? nextPage : undefined;
        },
        staleTime: 1000 * 60,
    });
    const assets = data?.pages.flatMap(page => page.content) ?? [];
    const totalElements = data?.pages[0]?.totalElements ?? 0;

    return {
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasMore: hasNextPage,
        assets,
        totalElements
    };
}

export default useGetAssetInfinite;
