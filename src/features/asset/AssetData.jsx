import MiniSpinner from "../../ui/MiniSpinner";
import HistoryPost from "../post/HistoryPost"
import AssetView from "./AssetView"
import MenuAssetDetail from "./MenuAssetDetail"
import useGetAsset from "./useGetAsset";

function AssetData() {
    const { isLoading, asset } = useGetAsset();

    if (isLoading) return (
        <div className="flex items-center justify-center py-32">
            <MiniSpinner size={32} />
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/80">
            <div className="mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[0.63fr_0.37fr] gap-8">
                <AssetView asset={asset} />
                <div className="space-y-6">
                    <div className="sticky top-8 space-y-6">
                        <MenuAssetDetail asset={asset} />
                        <HistoryPost />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssetData
