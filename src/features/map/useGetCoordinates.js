import { useQuery } from "@tanstack/react-query";
import { getCoordinates } from "../../services/ExternalService";

export default function useGetCoordinates(address) {
    const { isLoading, data: coordinates } = useQuery({
        queryKey: ["address", address],
        queryFn: () => getCoordinates(address)
    })

    return { isLoading, coordinates }
}