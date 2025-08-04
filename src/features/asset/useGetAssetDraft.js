import { useQuery } from "@tanstack/react-query";
import { getAssetsDraft } from "../../services/AssetService";


function useGetAssetDraft() {
    const { isLoading, data: drafts } = useQuery({
        queryKey: ["draft"],
        queryFn: () => getAssetsDraft(),
        staleTime: 0,
    });


    return { isLoading, drafts };
}

export default useGetAssetDraft;
