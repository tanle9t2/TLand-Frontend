import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAsset } from "../../services/AssetService";

function useGetAsset() {
    const { assetId } = useParams()
    const { isLoading, data: asset } = useQuery({
        queryKey: ["asset", assetId],
        queryFn: () => getAsset(assetId),
    });

    return { isLoading, asset };
}

export default useGetAsset;
