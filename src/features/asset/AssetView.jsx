import SyncLoader from "react-spinners/SyncLoader";
import Thumbnail from "../../ui/Thumbnail";
import useGetAsset from "./useGetAsset";
import AssetDetail from "./AssetDetail";

function AssetView() {
    const { isLoading, asset } = useGetAsset();
    if (isLoading) return <SyncLoader />

    const { contents, ...rest } = asset;

    return (
        <div className="overflow-hidden">
            <Thumbnail images={contents} />
            <AssetDetail asset={rest} />
        </div>
    )
}

export default AssetView
