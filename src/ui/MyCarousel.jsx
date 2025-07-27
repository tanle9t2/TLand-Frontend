import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRef } from "react";

export default function MyCarousel({ items, handleOnMouseEnter, className }) {
    const swiperRef = useRef(null);

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
                {items.map((item, idx) => (
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


            {items.lenght > 5 && <>
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
