import MiniSpinner from "../../ui/MiniSpinner";
import HistoryPost from "../post/HistoryPost"
import AssetView from "./AssetView"
import MenuAssetDetail from "./MenuAssetDetail"
import useGetAsset from "./useGetAsset";

function AssetData() {
    const { isLoading, asset } = useGetAsset();
    if (isLoading) return <MiniSpinner />

    return (
        < div className="mx-auto w-full grid grid-cols-[0.65fr_0.35fr] gap-10" >
            <AssetView asset={asset} />
            <div className="sticky top-6 self-start">
                <MenuAssetDetail asset={asset} />
                <HistoryPost />
            </div>
        </ div>
    )
}

export default AssetData
