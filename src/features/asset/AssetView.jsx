import Thumbnail from "../../ui/Thumbnail";
import AssetDetail from "./AssetDetail";

function AssetView({ asset }) {
    const { contents, ...rest } = asset;

    return (
        <div className="overflow-hidden">
            <Thumbnail images={contents} />
            <AssetDetail asset={rest} />
        </div>
    )
}

export default AssetView
