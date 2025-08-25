import { useEffect } from "react"
import AssetCreatedForm from "./AssetCreatedForm";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import useCreateAsset from "./useCreateAsset";
import toast from "react-hot-toast";
import FullPageSpinner from "../../ui/FullPageSpinner";
import AssetUploadImage from "./AssetUploadImage";
import AssetUploadVideo from "./AssetUploadVideo";
import { useLocation, useNavigate } from "react-router-dom";


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
            width: dimension?.[0] ?? 0,
            length: dimension?.[1] ?? 0,
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

    if (isPending)
        return <FullPageSpinner />
    console.log(draft)
    const images = contents?.filter(media => media.type === "IMAGE").map(media => media.url);
    const videos = contents?.filter(media => media.type === "VIDEO").map(media => media.url);
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
        const cleanedProperties = Object.fromEntries(
            Object.entries(rest).filter(([item, value]) => value !== "" && value !== null
            )
        );


        const request = {
            id,
            province: address.province,
            category: category.id,
            ward: address.ward,
            address: address.detail,
            dimension: width ? [width, length] : null,
            type: "PERSIST",
            otherInfo,
            locationAsset: {
                apartmentCode,
                lotName
            },
            landArea,
            usableArea,
            properties: cleanedProperties
        };

        createAsset({ request }, {
            onSuccess: () => {
                navigate(`/asset/${id}`)
                toast.success("Successfully creat asset")
            },
            onError: (error) => toast.error(error.message)
        })


    };

    function setCategory(selectedCategory) {
        setValue("category", selectedCategory);
        clearErrors("category");
    }
    function setAssetId(assetId) {
        setValue("id", assetId);

    }
    function handleOnChangeAddress(address) {
        setValue("address", address);
        clearErrors("address");
    }
    return (
        <form id="post-form" onSubmit={handleSubmit(onSubmit)} className="bg-white grid grid-cols-[0.4fr_0.6fr] gap-2 p-5 space-y-8">
            <div >
                <h1 className="text-3xl font-bold mb-5" > Hình ảnh và Video sản phẩm</h1>
                <div className="w-full mb-5">
                    <AssetUploadImage initImages={images} assetId={watch("id")} setAssetId={setAssetId} />
                </div>
                <div>
                    <AssetUploadVideo assetId={watch("id")} setAssetId={setAssetId} initVideos={videos} />
                </div>
            </div>
            <AssetCreatedForm
                register={register}
                errors={errors}
                watch={watch}
                setCategory={setCategory}
                handleOnChangeAddress={handleOnChangeAddress} />
            <div className="w-full flex justify-end left-0 fixed bottom-0 p-5 border-[0.5px] border-gray-300 bg-white shadow-2xl">
                <Button type="submit" form="post-form" variant="primary" className="w-80">
                    {watch("id") ? "Cập nhật tài sản" : "Tạo tài sản"}
                </Button>
            </div>
        </form >
    )
}

export default AssetCreated
