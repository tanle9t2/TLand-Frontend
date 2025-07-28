import { useQuery } from "@tanstack/react-query";
import { getWards } from "../../services/ExternalService";


function useGetWards(province) {

    const { isLoading, data: wards } = useQuery({
        queryKey: ["wards", province],
        queryFn: () => getWards(province),
        enabled: !!province,
    });


    return { isLoading, wards };
}

export default useGetWards;
