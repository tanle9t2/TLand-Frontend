import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { uploadAssetImage } from "../../services/AssetService";


function useUploadMedia() {
    const queryClient = useQueryClient()
    const { isPending, mutate: uploadMedia } = useMutation({
        mutationFn: ({ assetId, file }) => uploadAssetImage(assetId, file),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["asset", data.assetId]
            })
        }
    });


    return { isPending, uploadMedia };
}

export default useUploadMedia;
