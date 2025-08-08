import { useMutation, useQueryClient } from "@tanstack/react-query";
import { creatAsset as createAssetAPI } from "../../services/AssetService";


function useCreateAsset() {
    const queryClient = useQueryClient()
    const { isPending, mutate: createAsset } = useMutation({
        mutationFn: ({ request }) => createAssetAPI(request),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["asset"],
                exact: false
            })
        }
    });


    return { isPending, createAsset };
}

export default useCreateAsset;
