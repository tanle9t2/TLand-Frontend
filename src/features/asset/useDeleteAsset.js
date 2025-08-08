import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAsset as deleteAssetAPI } from "../../services/AssetService";


function useDeleteAsset() {
    const queryClient = useQueryClient()
    const { isPending, mutate: deleteAsset } = useMutation({
        mutationFn: ({ id }) => deleteAssetAPI(id),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["assets"],
                exact: false,
            })
            queryClient.invalidateQueries({
                queryKey: ["asset", data.id],
                exact: false,
            })
        }
    });


    return { isPending, deleteAsset };
}

export default useDeleteAsset;
