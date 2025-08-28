import { useQuery } from "@tanstack/react-query";
import { getSummaryStatusPost } from "../../services/PostService";


function useGetCountStatus() {
    const { isLoading, data: counts } = useQuery({
        queryKey: ["counts"],
        queryFn: () => getSummaryStatusPost(),
    });

    return { isLoading, counts };
}

export default useGetCountStatus;
