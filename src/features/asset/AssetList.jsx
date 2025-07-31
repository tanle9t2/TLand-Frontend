import { FaMapMarkerAlt, FaEdit, FaTrash } from "react-icons/fa";
import AssetItem from "./AssetItem";
import useGetAssets from "./useGetAssets";
import MiniSpinner from "../../ui/MiniSpinner";
import PaginationStack from "../../ui/PaginationStack";
import { Link } from "react-router-dom";
function AssetList() {
    const { isLoading, assets, totalPages, page } = useGetAssets()
    if (isLoading)
        return <MiniSpinner />
    return (
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Bất động sản của tôi</h1>
            <div className="bg-white space-y-6">
                {assets.map((asset) => (
                    <Link to={`/asset/${asset.id}`} key={asset.id}>
                        <AssetItem asset={asset} />
                    </Link>
                ))}

                <div className="flex justify-center text-3xl">
                    <PaginationStack totalPage={totalPages} currentPage={page} onClick={() => console.log("ok")} />
                </div>
            </div>
        </div>
    );
}

export default AssetList
