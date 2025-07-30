import { useEffect } from "react"
import PostCreatedForm from "./AssetCreatedForm";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import useCreateAsset from "./useCreateAsset";
import toast from "react-hot-toast";
import FullPageSpinner from "../../ui/FullPageSpinner";
import AssetUploadImage from "./AssetUploadImage";
import AssetUploadVideo from "./AssetUploadVideo";
import { useNavigate } from "react-router-dom";


function AssetCreated() {
    const {
        register,
        handleSubmit,
        setValue,
        control,
        watch,
        clearErrors,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate()
    const { isPending, createAsset } = useCreateAsset()
    if (isPending)
        return <FullPageSpinner />
    const onSubmit = (data) => {
        const {
            assetId,
            address,
            width,
            length,
            category,
            landArea,
            usableArea,
            apartmentCode,
            lotName,
            otherInfo,
            price,
            ...rest
        } = data;
        const cleanedProperties = Object.fromEntries(
            Object.entries(rest).filter(([item, value]) => value !== "" && value !== null
            )
        );
        const request = {
            userId: "eadd6456-a5ea-4d41-b71a-061541227b8d", //remove when having auth
            id: assetId,
            province: address.province,
            category: category.id,
            ward: address.ward,
            address: address.detail,
            dimension: [width, length],
            price: price,
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
                navigate(`/asset/${assetId}`)
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
        console.log(assetId)
        setValue("assetId", assetId);

    }
    function handleOnChangeAddress(address) {
        setValue("address", address);
        clearErrors("address");
    }
    useEffect(() => {
        register("category", { required: "Vui lòng chọn danh mục" });
        register("assetId");
        register("address", { required: "Vui lòng cung cấp địa chỉ" });
    }, [register]);


    return (
        <form id="post-form" onSubmit={handleSubmit(onSubmit)} className="bg-white grid grid-cols-[0.4fr_0.6fr] gap-2 p-5 space-y-8">
            <div >
                <h1 className="text-3xl font-bold mb-5" > Hình ảnh và Video sản phẩm</h1>
                <div className="w-full mb-5">
                    <AssetUploadImage assetId={watch("assetId")} setAssetId={setAssetId} />
                </div>
                <div>
                    <AssetUploadVideo />
                </div>
            </div>
            <PostCreatedForm
                register={register}
                control={control}
                errors={errors}
                watch={watch}
                setCategory={setCategory}
                handleOnChangeAddress={handleOnChangeAddress} />
            <div className="w-full flex justify-center left-0 fixed bottom-0 p-5 border-[0.5px] border-gray-300 bg-white shadow-2xl">
                <Button variant="secondary" className="w-80 mr-5">
                    Xem trước
                </Button>
                <Button type="submit" form="post-form" variant="primary" className="w-80">
                    Đăng tin
                </Button>
            </div>
        </form >
    )
}

export default AssetCreated
