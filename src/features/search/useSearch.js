import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { search } from "../../services/SearchService";
import { PAGE, PAGE_SIZE } from "../../utils/constant";
import { formatSearchParams } from "../../utils/helper";

function useSearch() {
    const [searchParams] = useSearchParams();
    const queryClient = useQueryClient();

    const {
        keyword = "",
        category = "",
        type = "",
        minPrice = "",
        maxPrice = "",
        province = "",
        ward = "",
        sortBy = "",
        order = "",
        page = PAGE,
        size = PAGE_SIZE,
        ...rest
    } = Object.fromEntries(searchParams.entries());

    const filterValue = {
        keyword,
        category,
        type,
        minPrice,
        maxPrice,
        province,
        ward,
        sortBy,
        order,
        page: +page,
        size: +size,
        ...rest
    };
    const filterParams = formatSearchParams(filterValue);

    const { isLoading, data } = useQuery({
        queryKey: ["search", filterParams],
        queryFn: () => search({ params: filterParams }),
    });
    const {
        content: posts = [],
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
