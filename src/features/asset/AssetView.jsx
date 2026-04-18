import Thumbnail from "../../ui/Thumbnail";
import AssetDetail from "./AssetDetail";

function AssetView({ asset }) {
    const { contents, ...rest } = asset;

    return (
        <div className="space-y-6">
            <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                <Thumbnail images={contents} />
            </div>
            <AssetDetail asset={rest} />
        </div>
    )
}

export default AssetView
