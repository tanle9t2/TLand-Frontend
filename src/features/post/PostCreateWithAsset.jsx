import { useForm } from "react-hook-form"
import MiniSpinner from "../../ui/MiniSpinner"
import PaginationStack from "../../ui/PaginationStack"

import AssetItem from "../asset/AssetItem"
import useGetAssets from "../asset/useGetAssets"
import PostFrormDetail from "./PostFrormDetail"
import { useEffect, useRef } from "react"
import { IoCheckmarkCircle } from "react-icons/io5"
import Button from "../../ui/Button"
import ErrorMessage from "../../ui/ErrorMessage"

function PostCreateWithAsset() {
    const { isLoading, assets, totalPages, page } = useGetAssets()
    const scrollContainerRef = useRef(null);
    const {
        register,
        handleSubmit,
        setValue,
        control,
        watch,
        clearErrors,
        formState: { errors },
    } = useForm();
    useEffect(() => {
        register("assetId", { required: "Vui lòng chọn 1 tài sản" })
    }, [register])
    if (isLoading) return <MiniSpinner />
    const onSubmit = (data) => {
        console.log(data)
    };
    function handleOnClickAsset(id) {
        setValue("assetId", id)
        scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        clearErrors("assetId")
    }
    return (
        <>
            <div>
                {errors.assetId && <div className="bg-red-300 p-2 text-2xl font-bold">
                    <ErrorMessage message={errors.assetId.message} />
                </div>
                }
                <div ref={scrollContainerRef} className="h-[450px] overflow-x-auto">
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

                    {assets.map(asset =>
                        <div key={asset.id} onClick={() => handleOnClickAsset(asset.id)}>
                            {watch("assetId") !== asset.id && <AssetItem asset={asset} />}
                        </div>)}

                    <div className="flex justify-center text-3xl">
                        <PaginationStack totalPage={totalPages} currentPage={page} onClick={() => console.log("ok")} />
                    </div>

                </div >
            </div>
            <form id="post-form" onSubmit={handleSubmit(onSubmit)}>
                <PostFrormDetail control={control} errors={errors} register={register} />
                <div className="w-full flex justify-center left-0 fixed bottom-0 p-5 border-[0.5px] border-gray-300 bg-white shadow-2xl">
                    <Button variant="secondary" className="w-80 mr-5">
                        Xem trước
                    </Button>
                    <Button type="submit" form="post-form" variant="primary" className="w-80">
                        Đăng tin
                    </Button>
                </div>
            </form>

        </>
    )
}

export default PostCreateWithAsset
