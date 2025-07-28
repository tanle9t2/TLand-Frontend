import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../services/AssetService";


function useGetCategories() {
    const { isLoading, data: categories } = useQuery({
        queryKey: ["catogries"], // include `type` to avoid cache collision
        queryFn: () => getAllCategories(),
    });


    return { isLoading, categories };
}

export default useGetCategories;
