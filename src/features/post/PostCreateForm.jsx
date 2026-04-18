import { useForm } from "react-hook-form"
import MiniSpinner from "../../ui/MiniSpinner"
import AssetItem from "../asset/AssetItem"
import PostFrormDetail from "./PostFrormDetail"
import { useEffect, useCallback } from "react"
import { IoCheckmarkCircle } from "react-icons/io5"
import Button from "../../ui/Button"
import ErrorMessage from "../../ui/ErrorMessage"
import InfiniteScroll from "react-infinite-scroll-component"
import useCreatePost from "./useCreatePost"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { PRICE_CREATED } from "../../utils/constant"
import { formatVietnamMoney } from "../../utils/helper"
import { HiOutlineCubeTransparent, HiOutlineDocumentText } from "react-icons/hi2"

function PostCreateForm({ assets, fetchNextPage, hasMore, page }) {
    const { isPending, createPost } = useCreatePost()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setValue,
        control,
        watch,
        clearErrors,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            type: "SELL",
        },
    });

    useEffect(() => {
        register("assetId", { required: "Vui lòng chọn 1 tài sản" });
    }, [register]);

    const onSubmit = useCallback((data) => {
        createPost({ request: data }, {
            onSuccess: () => {
                toast.success("Tạo bài viết mới thành công")
                navigate('/my-ads')
                reset()
            },
            onError: (error) => toast.error(error.message)
        })
    }, [createPost, navigate, reset]);

    const handleOnClickAsset = useCallback((asset) => {
        if (!asset.attachedPost) {
            setValue("assetId", asset.id);
            window.scrollTo({ top: 0, behavior: "smooth" });
            clearErrors("assetId");
        }
    }, [setValue, clearErrors]);

    const selectedAssetId = watch("assetId");

    return (
        <div className="bg-gray-50 min-h-screen pb-28">
            <div className="mx-auto px-4 md:px-6 py-8">

                <div className="mb-8">
                    <h1 className="text-[2.2rem] font-bold text-gray-900">Đăng tin mới</h1>
                    <p className="text-[1.35rem] text-gray-500 mt-1">Chọn tài sản và điền thông tin bên dưới để tạo bài đăng.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-8">

                    <div>
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-5 border-b border-gray-100 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                    <HiOutlineCubeTransparent className="text-[2rem] text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-[1.5rem] font-bold text-gray-900">Chọn tài sản</h2>
                                    <p className="text-[1.2rem] text-gray-500">Chọn một tài sản bên dưới để đính kèm vào bài đăng</p>
                                </div>
                            </div>

                            {errors.assetId && (
                                <div className="mx-5 mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                                    <ErrorMessage message={errors.assetId.message} />
                                </div>
                            )}


                            {selectedAssetId && (
                                <div className="mx-5 mt-4">
                                    <p className="text-[1.2rem] font-semibold text-emerald-600 mb-2 flex items-center gap-1.5">
                                        <IoCheckmarkCircle className="text-[1.6rem]" />
                                        Tài sản đã chọn
                                    </p>
                                    <div className="relative rounded-2xl border-2 border-emerald-300 bg-emerald-50/30 overflow-hidden">
                                        {assets
                                            .filter(asset => asset.id === selectedAssetId)
                                            .map(asset => (
                                                <AssetItem key={asset.id} asset={asset} />
                                            ))}
                                    </div>
                                </div>
                            )}


                            <div
                                id="scrollableDiv"
                                className="h-[550px] overflow-auto p-5"
                            >
                                <InfiniteScroll
                                    dataLength={assets.length}
                                    next={() => {
                                        const nextPage = page + 1;
                                        fetchNextPage(nextPage);
                                    }}
                                    hasMore={hasMore}
                                    loader={<div className="py-6 flex justify-center"><MiniSpinner size={28} /></div>}
                                    scrollableTarget="scrollableDiv"
                                >
                                    <div className="space-y-3">
                                        {assets.map(asset => {
                                            if (selectedAssetId === asset.id) return null;
                                            return (
                                                <div
                                                    className={`relative rounded-xl transition-all duration-200 ${asset.attachedPost
                                                        ? 'opacity-60 cursor-not-allowed'
                                                        : 'cursor-pointer hover:ring-2 hover:ring-rose-500/20'
                                                        }`}
                                                    key={asset.id}
                                                    onClick={() => handleOnClickAsset(asset)}
                                                >
                                                    {asset.attachedPost && (
                                                        <span className="absolute right-3 top-3 z-10 bg-amber-500 text-white text-[1.1rem] font-bold px-3 py-1 rounded-lg shadow-sm">
                                                            Đã đính kèm bài đăng
                                                        </span>
                                                    )}
                                                    <AssetItem asset={asset} />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </InfiniteScroll>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div>
                        <form id="post-form" onSubmit={handleSubmit(onSubmit)}>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-5 border-b border-gray-100 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
                                        <HiOutlineDocumentText className="text-[2rem] text-rose-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-[1.5rem] font-bold text-gray-900">Thông tin bài đăng</h2>
                                        <p className="text-[1.2rem] text-gray-500">Điền thông tin chi tiết về bài đăng</p>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <PostFrormDetail setValue={setValue} watch={watch} control={control} errors={errors} register={register} />
                                </div>
                            </div>
                            <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
                                <div className="max-w-[1400px] mx-auto px-4 md:px-6 h-[72px] flex items-center justify-between">
                                    <p className="text-[1.4rem] font-semibold text-gray-700">
                                        Phí đăng tin: <span className="text-rose-600 font-bold">{formatVietnamMoney(PRICE_CREATED)}</span>
                                        <span className="text-rose-500 ml-0.5">*</span>
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <Button variant="secondary" className="!py-3 !px-8">
                                            Xem trước
                                        </Button>
                                        <Button disabled={isPending} type="submit" form="post-form" variant="primary" className="!py-3 !px-8 shadow-md shadow-rose-500/15">
                                            {isPending ? "Đang xử lý..." : "Đăng tin"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default PostCreateForm;
