import { useForm } from "react-hook-form"
import MiniSpinner from "../../ui/MiniSpinner"
import PaginationStack from "../../ui/PaginationStack"

import AssetItem from "../asset/AssetItem"
import PostFrormDetail from "./PostFrormDetail"
import { useEffect } from "react"
import { IoCheckmarkCircle } from "react-icons/io5"
import Button from "../../ui/Button"
import ErrorMessage from "../../ui/ErrorMessage"
import InfiniteScroll from "react-infinite-scroll-component"
import useCreatePost from "./useCreatePost"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { PRICE_CREATED } from "../../utils/constant"
import { formatVietnamMoney } from "../../utils/helper"

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

    const onSubmit = (data) => {
        createPost({ request: data }, {
            // onSuccess: () => {
            //     toast.success("Tạo bài viết mới thành công")
            //     navigate('/my-ads')
            //     reset
            // },
            onError: (error) => toast.error(error.message)
        })

    };

    const handleOnClickAsset = (asset) => {
        if (!asset.attachedPost) {
            setValue("assetId", asset.id);
            window.scrollTo({ top: 0, behavior: "smooth" });
            clearErrors("assetId");
        }
    };


    return (
        <div className="bg-white grid grid-cols-[0.6fr_0.4fr] gap-15 p-5 space-y-8">
            <div>
                {errors.assetId && (
                    <div className="bg-red-300 p-2 text-2xl font-bold">
                        <ErrorMessage message={errors.assetId.message} />
                    </div>
                )}
                <div
                    id="scrollableDiv"
                    className="h-[600px] overflow-auto"
                >
                    <InfiniteScroll
                        dataLength={assets.length}
                        next={() => {
                            const nextPage = page + 1;
                            fetchNextPage(nextPage);
                        }}
                        hasMore={hasMore}
                        loader={<MiniSpinner />}
                        scrollableTarget="scrollableDiv"
                    >
                        {watch("assetId") && (
                            <div className="relative">
                                {assets
                                    .filter(asset => asset.id === watch("assetId"))
                                    .map(asset => (
                                        <AssetItem key={asset.id} asset={asset} />
                                    ))}
                                <span className="absolute z-10 text-4xl right-2 bottom-1 text-red-600">
                                    <IoCheckmarkCircle />
                                </span>
                            </div>
                        )}

                        {assets.map(asset => (
                            <div className="relative" key={asset.id} onClick={() => handleOnClickAsset(asset)}>
                                {asset.attachedPost && <span className="absolute right-3 top-5 border rounded-lg text-xl p-1 bg-green-500 font-bold">
                                    Đính kèm bài đăng khác
                                </span>}
                                {watch("assetId") !== asset.id && <AssetItem asset={asset} />}
                            </div>
                        ))}
                    </InfiniteScroll>
                </div>
            </div>

            <form id="post-form" onSubmit={handleSubmit(onSubmit)}>
                <PostFrormDetail setValue={setValue} watch={watch} control={control} errors={errors} register={register} />
                <div className="w-full  flex items-center justify-between left-0 fixed bottom-0 p-5 border-[0.5px] border-gray-300 bg-white shadow-2xl">
                    <p className="text-2xl font-bold">Phí đăng tin cho mỗi bài viết: {formatVietnamMoney(PRICE_CREATED)} <span className="text-red-600">*</span></p>
                    <div>
                        <Button variant="secondary" className="w-80 mr-5">
                            Xem trước
                        </Button>
                        <Button disabled={isPending} type="submit" form="post-form" variant="primary" className="w-80">
                            Đăng tin
                        </Button>
                    </div>

                </div>
            </form>
        </div>
    );
}

export default PostCreateForm;
