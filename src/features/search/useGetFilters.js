import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getSearchFilter } from "../../services/SearchService";
import { PAGE, PAGE_SIZE } from "../../utils/constant";
import { formatSearchParams } from "../../utils/helper";

function useGetFilters() {
    const [searchParams] = useSearchParams();
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

    const { isLoading, data: filters } = useQuery({
        queryKey: ["filters", filterParams],
        queryFn: () => getSearchFilter({ params: filterParams }),
    });



    return { isLoading, filters };
}

export default useGetFilters;
