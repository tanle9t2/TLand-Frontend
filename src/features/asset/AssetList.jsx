import AssetItem from "./AssetItem";
import useGetAssets from "./useGetAssets";
import MiniSpinner from "../../ui/MiniSpinner";
import PaginationStack from "../../ui/PaginationStack";
import { Link, useSearchParams } from "react-router-dom";
import { HiOutlinePlus, HiOutlineHome } from "react-icons/hi";
import PostCreatedEmpty from "../post/PostCreatedEmpty";

function AssetList() {
    const { isLoading, assets, totalPages, page } = useGetAssets();
    const [searchParams, setSearchParams] = useSearchParams();

    function handleOnClickPagination(e, v) {
        searchParams.set("page", v - 1);
        setSearchParams(searchParams);
    }

    if (isLoading) return (
        <div className="flex items-center justify-center py-32">
            <MiniSpinner size={32} />
        </div>
    );

    if (!assets.length) return (
        <div className="min-h-[60vh] flex items-center justify-center px-6">
            <PostCreatedEmpty />
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/80">
            <div className="mx-auto px-6 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
                            <HiOutlineHome className="text-[1.8rem]" />
                        </div>
                        <div>
                            <h1 className="text-[2rem] font-bold text-gray-900 tracking-tight">
                                Tài sản của tôi
                            </h1>
                            <p className="text-[1.2rem] text-gray-400">
                                {assets.length} tài sản
                            </p>
                        </div>
                    </div>
                    <Link to="/create-asset">
                        <button
                            type="button"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500 text-white text-[1.35rem] font-medium hover:bg-rose-600 shadow-lg shadow-rose-500/20 transition-all duration-200 cursor-pointer"
                        >
                            <HiOutlinePlus className="text-[1.5rem]" />
                            Tạo tài sản mới
                        </button>
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {assets.map((asset) => (
                        <Link to={`/asset/${asset.id}`} key={asset.id} className="block">
                            <AssetItem asset={asset} />
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-10">
                        <PaginationStack totalPage={totalPages} currentPage={page} onClick={handleOnClickPagination} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default AssetList
