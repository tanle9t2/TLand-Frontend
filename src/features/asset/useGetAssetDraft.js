import { useQuery } from "@tanstack/react-query";
import { getAssetsDraft } from "../../services/AssetService";


function useGetAssetDraft() {
    const { isLoading, data: drafts } = useQuery({
        queryKey: ["draft"], // include `type` to avoid cache collision
        queryFn: () => getAssetsDraft(),
    });


    return { isLoading, drafts };
}

export default useGetAssetDraft;
