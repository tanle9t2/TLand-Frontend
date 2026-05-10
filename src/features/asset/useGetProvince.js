import { useQuery } from "@tanstack/react-query";
import { getProvinces } from "../../services/ExternalService";


function useGetProvince() {
    const { isLoading, data: provinces } = useQuery({
        queryKey: ["provinces"],
        queryFn: () => getProvinces(),
    });


    return { isLoading, provinces };
}

export default useGetProvince;
