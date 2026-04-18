import { useCallback, useRef, useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { HiOutlinePlus, HiOutlineX } from "react-icons/hi";
import { MAX_IMAGE_UPLOAD } from "../../utils/constant";
import useUploadMedia from "./useUploadMedia";
import { ClipLoader } from "react-spinners";

function AssetUploadImage({ assetId, setAssetId, initImages = [] }) {
    const { isPending, uploadMedia } = useUploadMedia()
    const fileInputRef = useRef();
    const [images, setImages] = useState(initImages);

    const handleButtonClick = useCallback((e) => {
        e.preventDefault();
        fileInputRef.current.click();
    }, []);

    const handleImageUpload = useCallback((e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (images.length + 1 <= MAX_IMAGE_UPLOAD) {
            uploadMedia({ assetId, file }, {
                onSuccess: ({ data }) => {
                    setAssetId(data.assetId);
                    // Functional setState (Rule 5.9)
                    setImages(prev => [...prev, data.url]);
                }
            });
        }
    }, [assetId, images.length, uploadMedia, setAssetId]);

    const handleOnRemoveImage = useCallback((index) => {
        // Functional setState (Rule 5.9)
        setImages(prev => prev.filter((_, idx) => index !== idx));
    }, []);

    if (images.length === 0) {
        return (
            <label className="group relative border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer flex flex-col items-center justify-center py-16 transition-all duration-300 hover:border-rose-400 hover:bg-rose-50/30">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isPending}
                />
                {isPending ? (
                    <div className="flex flex-col items-center gap-3">
                        <ClipLoader size={36} color="#e11d48" />
                        <p className="text-[1.3rem] text-gray-500 animate-pulse">Đang tải ảnh lên...</p>
                    </div>
                ) : (
                    <>
                        <div className="w-20 h-20 rounded-2xl bg-gray-100 group-hover:bg-rose-100 flex items-center justify-center transition-colors duration-300 mb-4">
                            <IoCameraOutline className="text-[3.2rem] text-gray-400 group-hover:text-rose-500 transition-colors duration-300" />
                        </div>
                        <p className="text-[1.5rem] font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
                            Tải ảnh lên
                        </p>
                        <p className="text-[1.2rem] text-gray-400 mt-1">
                            Đăng từ 3 đến {MAX_IMAGE_UPLOAD} hình ảnh
                        </p>
                    </>
                )}
            </label>
        );
    }

    return (
        <div className="flex flex-col items-start gap-4">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
            />

            <div className="grid grid-cols-3 gap-3 w-full">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className="group relative aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-50"
                    >
                        {index === 0 && (
                            <span className="absolute top-2 left-2 z-10 bg-rose-500 text-white text-[1rem] font-medium px-2.5 py-0.5 rounded-full shadow-sm">
                                Ảnh bìa
                            </span>
                        )}
                        <img
                            src={img}
                            alt={`Ảnh ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                        <button
                            type="button"
                            onClick={() => handleOnRemoveImage(index)}
                            className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-500 hover:text-rose-600 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
                            title="Xóa ảnh"
                        >
                            <HiOutlineX className="text-[1.2rem]" />
                        </button>
                    </div>
                ))}

                {/* Upload spinner placeholder */}
                {isPending && (
                    <div className="aspect-square rounded-xl border-2 border-dashed border-rose-200 bg-rose-50/50 flex flex-col items-center justify-center gap-2">
                        <ClipLoader size={28} color="#e11d48" />
                        <span className="text-[1.1rem] text-rose-400 font-medium">Đang tải...</span>
                    </div>
                )}
            </div>

            {/* Add more button */}
            <button
                type="button"
                onClick={handleButtonClick}
                disabled={images.length >= MAX_IMAGE_UPLOAD || isPending}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-dashed border-gray-300 text-[1.3rem] font-medium text-gray-600 hover:border-rose-400 hover:text-rose-600 hover:bg-rose-50/30 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
                <HiOutlinePlus className="text-[1.4rem]" />
                Thêm ảnh ({images.length}/{MAX_IMAGE_UPLOAD})
            </button>
        </div>
    )
}

export default AssetUploadImage
