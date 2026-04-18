import { useState, useCallback } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import MyCarousel from "./MyCarousel";

function Thumbnail({ images }) {
    const [index, setIndex] = useState(0);

    const handleOnMouseEnter = useCallback((e) => {
        setIndex(parseInt(e.target.id));
    }, []);

    const handleOnClickPrev = useCallback(() => {
        setIndex(i => (i - 1) < 0 ? images.length - 1 : i - 1);
    }, [images.length]);

    const handleOnClickNext = useCallback(() => {
        setIndex(i => (i + 1) % images.length);
    }, [images.length]);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="relative bg-black/5">
                {images[index]?.contentType === "video" ? (
                    <video
                        src={images[index].url}
                        controls
                        className="w-full h-[460px] object-contain bg-black"
                    />
                ) : (
                    <img
                        src={images[index]?.url}
                        alt="Preview"
                        className="w-full h-[460px] object-cover"
                    />
                )}

                {images.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={handleOnClickPrev}
                            className="absolute top-1/2 -translate-y-1/2 left-4 w-10 h-10 bg-black/40 backdrop-blur-sm hover:bg-black/60 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
                        >
                            <IoIosArrowBack className="text-white text-[1.6rem]" />
                        </button>
                        <button
                            type="button"
                            onClick={handleOnClickNext}
                            className="absolute top-1/2 -translate-y-1/2 right-4 w-10 h-10 bg-black/40 backdrop-blur-sm hover:bg-black/60 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer"
                        >
                            <IoIosArrowForward className="text-white text-[1.6rem]" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-[1.2rem] font-semibold px-4 py-1.5 rounded-full">
                            {index + 1} / {images.length}
                        </div>
                    </>
                )}
            </div>

            {images.length > 1 && (
                <div className="p-3 border-t border-gray-100">
                    <MyCarousel items={images} handleOnMouseEnter={handleOnMouseEnter} />
                </div>
            )}
        </div>
    )
}

export default Thumbnail
