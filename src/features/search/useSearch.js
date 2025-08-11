import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { search } from "../../services/SearchService";
import { PAGE, PAGE_SIZE } from "../../utils/constant";
import { formatSearchParams } from "../../utils/helper";

function useSearch() {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();
    const filterValue = {
        keyword: searchParams.get("keyword") || "",
        category: searchParams.get("category") || "",
        type: searchParams.get("type") || "",
        minPrice: searchParams.get("minPrice") || "",
        maxPrice: searchParams.get("maxPrice") || "",
        province: searchParams.get("province") || "",
        ward: searchParams.get("ward") || "",
        sortBy: searchParams.get("sortBy") || "",
        order: searchParams.get("order") || "",
        page: +searchParams.get("page") || PAGE,
        size: +searchParams.get("size") || PAGE_SIZE,
    };


    const filterParams = formatSearchParams(filterValue);

    const { isLoading, data } = useQuery({
        queryKey: ["search", filterParams],
        queryFn: () => search({ params: filterParams }),
    });
    const {
        content: posts = [],
        size = 4,
        page,
        totalElements = 0,
        totalPages = 0,
    } = data ?? {};

    if (filterParams.page + 1 < totalPages) {
        const nextPageFilter = {
            ...filterValue,
            page: +filterValue.page + 1,
        };
        queryClient.prefetchQuery({
            queryKey: ["search", nextPageFilter],
            queryFn: () => search({ param: nextPageFilter }),
        });
    }

    if (filterParams.page - 1 > 1) {
        const previousPageFilter = {
            ...filterValue,
            page: +filterValue.page - 1,
        };
        queryClient.prefetchQuery({
            queryKey: ["search", previousPageFilter],
            queryFn: () => search({ params: previousPageFilter }),
        });
    }


    return { isLoading, posts, page, size, totalElements, totalPages };
}

export default useSearch;
