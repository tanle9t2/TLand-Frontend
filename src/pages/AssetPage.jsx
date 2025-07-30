import AssetView from "../features/asset/AssetView";
import MenuAssetDetail from "../features/asset/MenuAssetDetail";

function AssetPage() {
    return (
        <div className="min-h-screen p-6 ">
            < div className="mx-auto w-full grid grid-cols-[0.9fr_auto] gap-10" >
                <AssetView />
                <div className="sticky top-6 self-start">
                    <MenuAssetDetail />
                </div>
            </ div>
        </div >
    );
}

export default AssetPage
