import { useMutation } from "@tanstack/react-query";
import { creatAsset as createAssetAPI } from "../../services/AssetService";


function useCreateAsset() {

    const { isPending, mutate: createAsset } = useMutation({
        mutationFn: ({ request }) => createAssetAPI(request)
    });


    return { isPending, createAsset };
}

export default useCreateAsset;
