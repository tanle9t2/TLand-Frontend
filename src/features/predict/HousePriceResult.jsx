import AIAnalysisSection from "./AIAnalysisSection";
import AmenitiesSection from "./AmenitiesSection";
import {
    HiOutlineLightBulb,
    HiOutlineLocationMarker,
    HiOutlineRefresh,
    HiOutlineExclamation
} from "react-icons/hi"

function PriceBar({ totalPriceTy, pricePerM2 }) {
    const low = Math.max(0, totalPriceTy - totalPriceTy * 0.15)
    const high = totalPriceTy + totalPriceTy * 0.15
    const markerPos = 50

    return (
        <div className="space-y-3">
            <p className="text-[1.3rem] font-semibold text-gray-500">Biên độ giá tham khảo (±15%)</p>
            <div className="relative">
                <div className="flex h-3 rounded-full overflow-hidden">
                    <div className="w-1/4 bg-teal-100" />
                    <div className="w-1/2 bg-emerald-200" />
                    <div className="w-1/4 bg-rose-100" />
                </div>
                <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-md shadow-blue-300 transition-all duration-700"
                    style={{ left: `calc(${markerPos}% - 8px)` }}
                />
            </div>
            <div className="flex justify-between text-[1.2rem] text-gray-400 font-medium">
                <span>{low.toFixed(2)} tỷ</span>
                <span className="text-emerald-600 font-bold">{totalPriceTy.toFixed(2)} tỷ</span>
                <span>{high.toFixed(2)} tỷ</span>
            </div>
        </div>
    )
}


export default function HousePriceResult({ result, area, address, onReset }) {
    const { pricePerM2, totalPriceTy, description, amenities } = result
    const totalVnd = totalPriceTy * 1_000_000_000

    return (
        <div className="space-y-6 animate-[fadeIn_0.5s_ease-out]">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                        <HiOutlineLightBulb className="text-[1.3rem] text-white" />
                    </div>
                    <h3 className="text-[1.8rem] font-black text-gray-900">Kết quả định giá AI</h3>
                </div>
                <span className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[1.2rem] font-bold">
                    TP. Hồ Chí Minh
                </span>
            </div>
            {address && (
                <div className="flex items-start gap-2 text-[1.3rem] text-gray-500 bg-gray-50 rounded-xl px-4 py-3">
                    <HiOutlineLocationMarker className="text-[1.6rem] text-gray-400 mt-0.5 flex-shrink-0" />
                    <span>{address}</span>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5">
                    <p className="text-[1.2rem] font-semibold text-gray-500 mb-1">Giá tham khảo / m²</p>
                    <p className="text-[2.8rem] font-black text-blue-700 leading-tight">
                        {pricePerM2?.toFixed(1)}
                        <span className="text-[1.4rem] font-semibold text-blue-500 ml-1">triệu</span>
                    </p>
                    <p className="text-[1.2rem] text-gray-400 mt-1">Diện tích: {area} m²</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-5">
                    <p className="text-[1.2rem] font-semibold text-gray-500 mb-1">Tổng giá ước tính</p>
                    <p className="text-[2.8rem] font-black text-emerald-700 leading-tight">
                        {totalPriceTy?.toFixed(2)}
                        <span className="text-[1.4rem] font-semibold text-emerald-500 ml-1">tỷ</span>
                    </p>
                    <p className="text-[1.2rem] text-gray-400 mt-1">
                        ≈ {(totalVnd / 1_000_000).toFixed(0)} triệu đồng
                    </p>
                </div>
            </div>


            <PriceBar totalPriceTy={totalPriceTy} pricePerM2={pricePerM2} />

            <AIAnalysisSection analysis={description} />

            {amenities && <AmenitiesSection amenities={amenities} />}

            <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                <div className="flex items-start gap-2">
                    <HiOutlineExclamation className="text-[1.5rem] text-amber-500 mt-0.5 flex-shrink-0" />
                    <p className="text-[1.25rem] text-amber-700">
                        Giá tham khảo có sai số ±15% tùy biến động thị trường và pháp lý. Chỉ mang tính chất tham khảo, không phải định giá chính thức.
                    </p>
                </div>
            </div>

            <button
                type="button"
                onClick={onReset}
                className="flex items-center gap-2 w-full justify-center px-6 py-3.5 rounded-xl border-2 border-rose-200 text-rose-600 text-[1.35rem] font-bold hover:bg-rose-50 transition-all duration-200 cursor-pointer"
            >
                <HiOutlineRefresh className="text-[1.6rem]" />
                Định giá bất động sản khác
            </button>
        </div>
    )
}
