import { useEffect, useState } from "react";
import { GoDeviceCameraVideo } from "react-icons/go";
import useUploadMedia from "./useUploadMedia";
import MiniSpinner from "../../ui/MiniSpinner";

function AssetUploadVideo({ assetId = null, initVideos = [], setAssetId }) {
    const [videoThumbnail, setVideoThumbnail] = useState(null);
    const { isPending, uploadMedia } = useUploadMedia()

    function generateThumbnail(url) {
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
    };

    const handleVideoUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        uploadMedia({ assetId, file }, {
            onSuccess: ({ data }) => {
                const { assetId, url } = data;
                setAssetId(assetId);
                generateThumbnail(url);
            }
        });
    };

    useEffect(() => {
        if (initVideos.length > 0) {
            generateThumbnail(initVideos[0]);
        }
    }, []);

    return (
        videoThumbnail ? <div
            className="relative w-[250px] border-2 border-gray-300 rounded-sm p-1.5 text-center mb-2"
        >
            <button
                onClick={() => setVideoThumbnail(null)}
                className="absolute top-[-10px] right-[-6px] bg-white cursor-pointer text-rose-600 rounded-full px-[7px] py-[4px] shadow hover:bg-red-100"
                title="Delete video"
            >
                ✕
            </button>

            <img
                src={videoThumbnail}
                alt="Video Thumbnail"
                className="object-fit w-full h-auto rounded"
            />
        </div> :
            <label
                className="border-2 text-2xl bg-gray-100 cursor-pointer flex py-20 flex-col border-dashed border-rose-600"
            >
                {isPending ? <MiniSpinner /> : <>
                    <input
                        type="file"
                        accept="video/*"
                        multiple
                        onChange={handleVideoUpload}
                        className="hidden"
                    />
                    <span className="mx-auto text-9xl"> <GoDeviceCameraVideo /></span>
                    <p className="mx-auto">Đăng Video để bán nhanh hơn</p>
                </>}
            </label>

    )
}

export default AssetUploadVideo
