import { useMutation } from "@tanstack/react-query";
import { uploadAssetImage } from "../../services/AssetService";


function useUploadMedia() {

    const { isPending, mutate: uploadImage } = useMutation({
        mutationFn: ({ assetId, file }) => uploadAssetImage(assetId, file)
    });


    return { isPending, uploadImage };
}

export default useUploadMedia;
