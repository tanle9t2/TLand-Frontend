import { useCallback, useEffect, useState } from "react";
import { GoDeviceCameraVideo } from "react-icons/go";
import { HiOutlineX } from "react-icons/hi";
import useUploadMedia from "./useUploadMedia";
import { ClipLoader } from "react-spinners";

function AssetUploadVideo({ assetId = null, initVideos = [], setAssetId }) {
    const [videoThumbnail, setVideoThumbnail] = useState(null);
    const { isPending, uploadMedia } = useUploadMedia()

    const generateThumbnail = useCallback((url) => {
        const video = document.createElement("video");
        video.src = url;
        video.crossOrigin = "anonymous";
        video.muted = true;
        video.addEventListener("loadeddata", () => {
            video.currentTime = 1;
        });
        video.addEventListener("seeked", () => {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const thumbnailURL = canvas.toDataURL("image/png");
            setVideoThumbnail(thumbnailURL);
        });
    }, []);

    const handleVideoUpload = useCallback((e) => {
        const file = e.target.files[0];
        if (!file) return;

        uploadMedia({ assetId, file }, {
            onSuccess: ({ data }) => {
                const { assetId: newId, url } = data;
                setAssetId(newId);
                generateThumbnail(url);
            }
        });
    }, [assetId, uploadMedia, setAssetId, generateThumbnail]);

    const handleRemoveVideo = useCallback(() => {
        setVideoThumbnail(null);
    }, []);

    useEffect(() => {
        if (initVideos.length > 0) {
            generateThumbnail(initVideos[0]);
        }
    }, []);

    if (videoThumbnail) {
        return (
            <div className="group relative inline-block rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                <img
                    src={videoThumbnail}
                    alt="Video Thumbnail"
                    className="w-full h-auto rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Play icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors duration-200">
                    <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-700 ml-0.5">
                            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={handleRemoveVideo}
                    className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-500 hover:text-rose-600 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer"
                    title="Xóa video"
                >
                    <HiOutlineX className="text-[1.2rem]" />
                </button>
            </div>
        );
    }

    return (
        <label className="group relative border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer flex flex-col items-center justify-center py-16 transition-all duration-300 hover:border-blue-400 hover:bg-blue-50/30">
            {isPending ? (
                <div className="flex flex-col items-center gap-3">
                    <ClipLoader size={36} color="#3b82f6" />
                    <p className="text-[1.3rem] text-gray-500 animate-pulse">Đang tải video lên...</p>
                </div>
            ) : (
                <>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="hidden"
                    />
                    <div className="w-20 h-20 rounded-2xl bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors duration-300 mb-4">
                        <GoDeviceCameraVideo className="text-[3.2rem] text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                    </div>
                    <p className="text-[1.5rem] font-medium text-gray-600 group-hover:text-gray-800 transition-colors">
                        Tải video lên
                    </p>
                    <p className="text-[1.2rem] text-gray-400 mt-1">
                        Thêm video giúp bán nhanh hơn
                    </p>
                </>
            )}

        </label>
    );
}

export default AssetUploadVideo
