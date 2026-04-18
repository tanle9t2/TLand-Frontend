import { useCallback, useEffect, useMemo } from "react"
import AssetCreatedForm from "./AssetCreatedForm";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import useCreateAsset from "./useCreateAsset";
import toast from "react-hot-toast";
import FullPageSpinner from "../../ui/FullPageSpinner";
import AssetUploadImage from "./AssetUploadImage";
import AssetUploadVideo from "./AssetUploadVideo";
import { useLocation, useNavigate } from "react-router-dom";
import { HiOutlinePhotograph } from "react-icons/hi";


function AssetCreated() {
    const { state } = useLocation();
    const draft = state?.draft || state?.asset || {};

    const { properties = {}, dimension, address, province, ward, contents, locationAsset, createdAt, attachedPostShow, userId, ...restDraft } = draft;

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        clearErrors,
        formState: { errors },
    } = useForm({
        defaultValues: {
            ...restDraft,
            ...properties,
            ...locationAsset,
            width: dimension?.[0] ?? null,
            length: dimension?.[1] ?? null,
            address: {
                detail: address,
                province,
                ward,
            },
        },
    });
    const navigate = useNavigate()
    const { isPending, createAsset } = useCreateAsset()

    useEffect(() => {
        register("category", { required: "Vui lòng chọn danh mục" });
        register("id");
        register("address", { required: "Vui lòng cung cấp địa chỉ" });
    }, [register]);

    // Derived state — no extra useState needed (Rule 5.1)
    const images = useMemo(
        () => contents?.filter(media => media.type === "IMAGE").map(media => media.url) || [],
        [contents]
    );
    const videos = useMemo(
        () => contents?.filter(media => media.type === "VIDEO").map(media => media.url) || [],
        [contents]
    );

    // Stable callbacks for child components (Rule 5.9)
    const setCategory = useCallback((selectedCategory) => {
        setValue("category", selectedCategory);
        clearErrors("category");
    }, [setValue, clearErrors]);

    const setAssetId = useCallback((assetId) => {
        setValue("id", assetId);
    }, [setValue]);

    const handleOnChangeAddress = useCallback((address) => {
        setValue("address", address);
        clearErrors("address");
    }, [setValue, clearErrors]);

    if (isPending) return <FullPageSpinner />

    const onSubmit = (data) => {
        const {
            id,
            address,
            width,
            length,
            category,
            landArea,
            usableArea,
            apartmentCode,
            lotName,
            otherInfo,
            ...rest
        } = data;
        console.log("ok")
        const cleanedProperties = Object.fromEntries(
            Object.entries(rest).filter(([, value]) => value !== "" && value !== null)
        );

        const request = {
            id,
            province: address.province,
            categoryId: category.id,
            ward: address.ward,
            address: address.detail,
            dimension: width ? [width, length] : null,
            type: "PERSIST",
            otherInfo: otherInfo ? otherInfo : null,
            locationAsset: { apartmentCode, lotName },
            landArea,
            usableArea,
            properties: cleanedProperties
        };

        if (!id) {
            toast.error("Vui lòng tải lên ít nhất 1 tấm ảnh");
            return;
        }

        createAsset({ request }, {
            onSuccess: () => {
                navigate(`/asset/${id}`);
                toast.success("Tạo tài sản thành công!");
            },
            onError: ({ response }) => {
                const { detail } = response.data;
                toast.error(detail);
            }
        });
    };

    const assetId = watch("id");
    const isEditing = Boolean(assetId);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/80">
            {/* Page Header */}
            <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200/60">
                <div className="mx-auto px-6 py-4">
                    <h1 className="text-[2.2rem] font-bold text-gray-900 tracking-tight">
                        {isEditing ? "Chỉnh sửa tài sản" : "Đăng tin bất động sản"}
                    </h1>
                    <p className="text-[1.3rem] text-gray-500 mt-1">
                        Cung cấp thông tin chi tiết để tin đăng nổi bật hơn
                    </p>
                </div>
            </div>

            <form
                id="post-form"
                onSubmit={handleSubmit(onSubmit)}
                className="mx-auto px-6 py-8 outline-none"
            >
                <div className="grid grid-cols-1 lg:grid-cols-[0.38fr_0.62fr] gap-8">
                    {/* Left Column — Media Upload */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500 text-[1.8rem]">
                                        <HiOutlinePhotograph />
                                    </div>
                                    <div>
                                        <h2 className="text-[1.7rem] font-semibold text-gray-900">Hình ảnh</h2>
                                        <p className="text-[1.2rem] text-gray-400">Ảnh chất lượng giúp tăng lượt xem</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <AssetUploadImage initImages={images} assetId={assetId} setAssetId={setAssetId} />
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 text-[1.8rem]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-[1.7rem] font-semibold text-gray-900">Video</h2>
                                        <p className="text-[1.2rem] text-gray-400">Thêm video để thu hút người mua</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <AssetUploadVideo assetId={assetId} setAssetId={setAssetId} initVideos={videos} />
                            </div>
                        </div>
                    </div>

                    {/* Right Column — Form */}
                    <AssetCreatedForm
                        register={register}
                        errors={errors}
                        watch={watch}
                        setCategory={setCategory}
                        handleOnChangeAddress={handleOnChangeAddress}
                    />
                </div>
                <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-md border-t border-gray-200/60 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
                    <div className="mx-auto px-6 py-4 flex items-center justify-end gap-4">
                        <Button
                            variant="secondary"
                            onClick={() => navigate(-1)}
                            className="!my-0 !py-3 !px-10 !text-[1.5rem] !rounded-xl"
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            form="post-form"
                            variant="primary"
                            className="!my-0 !py-3 !px-16 !text-[1.5rem] !rounded-xl !shadow-lg !shadow-rose-500/20"
                        >
                            {isEditing ? "Cập nhật tài sản" : "Đăng tin"}
                        </Button>
                    </div>
                </div>

                {/* Bottom spacer for fixed bar */}
                <div className="h-24" />
            </form>



        </div>
    )
}

export default AssetCreated
