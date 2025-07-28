import { useQuery } from "@tanstack/react-query";
import { getProvinces } from "../../services/ExternalService";


function useGetProvince() {
    const { isLoading, data: provinces } = useQuery({
        queryKey: ["provinces"], // include `type` to avoid cache collision
        queryFn: () => getProvinces(),
    });


    return { isLoading, provinces };
}

export default useGetProvince;
