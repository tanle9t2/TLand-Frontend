import { FaMapMarkerAlt, FaEdit, FaTrash } from "react-icons/fa";
import AssetItem from "./AssetItem";
import useGetAssets from "./useGetAssets";
import MiniSpinner from "../../ui/MiniSpinner";
import PaginationStack from "../../ui/PaginationStack";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../../ui/Button";

import PostCreatedEmpty from "../post/PostCreatedEmpty";
function AssetList() {
    const { isLoading, assets, totalPages, page } = useGetAssets()

    const [searchParams, setSerachParams] = useSearchParams()
    function handleOnClickPagniation(e, v) {
        searchParams.set("page", v - 1)
        setSerachParams(searchParams)
    }
    if (isLoading)
        return <MiniSpinner />

    if (!assets.length) return <div className="w-full bg-white  px-4 py-8 space-y-6">
        <PostCreatedEmpty />
    </div>
    return (
        <div className="w-full bg-white  px-4 py-8 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Bất động sản của tôi</h1>
                <Link to="/create-asset">
                    <Button>Tạo tài sản mới</Button>
                </Link>
            </div>
            <div className="grid grid-cols-2 space-y-6 space-x-3 justify-center">
                {assets.map((asset) => (
                    <Link to={`/asset/${asset.id}`} key={asset.id}>
                        <AssetItem asset={asset} />
                    </Link>
                ))}
            </div>
            <div className="flex justify-center text-3xl">
                <PaginationStack totalPage={totalPages} currentPage={page} onClick={handleOnClickPagniation} />
            </div>
        </div>
    );
}

export default AssetList
