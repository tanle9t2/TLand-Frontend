import { useState } from "react";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import MyCarousel from "./MyCarousel";

function Thumbnail({ images }) {
    const [index, setIndex] = useState(0)
    function handleOnMouseEnter(e) {
        setIndex(parseInt(e.target.id))
    }
    function handleOnClickPrev() {
        setIndex(index => (index - 1) < 0 ? images.length - 1 : index - 1)
    }
    function handleOnClickNext() {
        setIndex(index => (index + 1) % images.length)
    }
    return (
        <div className="mb-4 bg-white p-4 rounded-lg shadow-lg">
            <div className="overflow-hidden relative rounded-lg mb-4">
                {images[index].contentType === "video" ? (
                    <video
                        src={images[index].url}
                        controls
                        className="w-full h-[413px] object-cover"
                    />
                ) : (
                    <img
                        src={images[index].url}
                        alt="Preview"
                        className="w-full h-[413px] object-cover"
                    />
                )}
                {images.length > 1 && <>
                    <button onClick={() => handleOnClickPrev()} className="absolute cursor-pointer -translate-y-1/2 top-1/2 left-3 text-xl bg-[rgba(34,34,34,0.5)] mx-auto p-5 rounded-[50%]">
                        <IoIosArrowBack fill="white" />
                    </button>
                    <button onClick={() => handleOnClickNext()} className="absolute cursor-pointer  -translate-y-1/2 top-1/2 right-3 text-xl bg-[rgba(34,34,34,0.5)] mx-auto  p-5 rounded-[50%]">
                        <IoIosArrowForward fill="white" />
                    </button>
                    <p className="absolute bottom-3 text-white left-1/2 -translate-x-1/2  text-xl bg-[rgba(34,34,34,0.5)] mx-auto  px-6 py-3 rounded-3xl">
                        {index + 1}/{images.length}
                    </p>
                </>}

            </div>

            <div className="w-full">
                <MyCarousel items={images} handleOnMouseEnter={handleOnMouseEnter} />
            </div>

        </div>
    )
}

export default Thumbnail
