import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useEffect, useRef, useState } from "react";

export default function MyCarousel({ items, handleOnMouseEnter, className }) {
    const swiperRef = useRef(null);
    const [standardItems, setStandardItems] = useState([]);
    console.log(items)
    useEffect(() => {
        async function prepareItems(items) {
            const standardItems = await Promise.all(
                items.map(async (item) => {
                    if (item.contentType === "image") {
                        return item;
                    }
                    const thumbnailUrl = await generateVideoThumbnail(item.url);
                    return { ...item, url: thumbnailUrl };
                })
            );
            return standardItems;
        }

        prepareItems(items).then(setStandardItems);
    }, [items]);

    function generateVideoThumbnail(url) {
        return new Promise((resolve, reject) => {
            const video = document.createElement("video");
            video.src = url;
            video.crossOrigin = "anonymous";
            video.muted = true;

            video.addEventListener("loadeddata", () => {
                video.currentTime = 1;
            });

            video.addEventListener("seeked", () => {
                try {
                    const canvas = document.createElement("canvas");
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const thumbnailURL = canvas.toDataURL("image/png");
                    resolve(thumbnailURL);
                } catch (err) {
                    reject(err);
                }
            });
            video.addEventListener("error", reject);
        });
    }


    return (
        <div className="relative w-full">
            <Swiper
                modules={[Navigation]}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper; // Store swiper instance
                }}
                slidesPerView={5.5}
                spaceBetween={10}
                observer
                observeParents
                className="w-full"
            >
                {standardItems.map((item, idx) => (
                    <SwiperSlide key={idx}>
                        <img
                            id={idx}
                            onMouseEnter={handleOnMouseEnter}
                            src={item.url}
                            className={`w-[104px] h-[104px] object-cover rounded-lg border-2 border-transparent hover:border-rose-700 cursor-pointer ${className}`}
                            alt={`thumb-${idx}`}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>


            {standardItems.lenght > 5 && <>
                <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="z-10 absolute cursor-pointer -translate-y-1/2 top-1/2 left-3 text-xl bg-[rgba(34,34,34,0.5)] mx-auto p-5 rounded-[50%]"
                >
                    <IoIosArrowBack fill="white" />
                </button>
                <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="z-10 absolute cursor-pointer -translate-y-1/2 top-1/2 right-3 text-xl bg-[rgba(34,34,34,0.5)] mx-auto p-5 rounded-[50%]"
                >
                    <IoIosArrowForward fill="white" />
                </button>
            </>}
        </div>
    );
}
