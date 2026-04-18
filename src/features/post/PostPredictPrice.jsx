import { HCM } from "../../utils/constant"
import { formatVietnamMoney } from "../../utils/helper"

function PostPredictPrice({ predictPrice, price, landArea, province }) {
    const predictedPrice = predictPrice.totalPriceTy * 1_000_000_000
    const diffPercent = ((price - predictedPrice) / predictedPrice) * 100
    const absPercent = Math.abs(diffPercent).toFixed(1)
    const barPos = Math.min(Math.max(((diffPercent + 30) / 60) * 100, 5), 95)

    let verdictColor = "text-emerald-600"
    let verdictBg = "bg-emerald-50"
    let verdictBorder = "border-emerald-200"
    let verdictLabel = "Giá hợp lý"
    let verdictIcon = "✓"

    if (diffPercent > 15) {
        verdictColor = "text-rose-600"
        verdictBg = "bg-rose-50"
        verdictBorder = "border-rose-200"
        verdictLabel = `Cao hơn ${absPercent}%`
        verdictIcon = "↑"
    } else if (diffPercent < -15) {
        verdictColor = "text-teal-600"
        verdictBg = "bg-teal-50"
        verdictBorder = "border-teal-200"
        verdictLabel = `Thấp hơn ${absPercent}%`
        verdictIcon = "↓"
    }
    console.log(province)
    return (
        <div className="overflow-hidden">
            <div className="bg-gray-50 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-xl">⚡</span>
                    <span className="font-bold text-gray-800 text-2xl">Thẩm định giá AI</span>
                </div>
                <span className={`${verdictBg} ${verdictColor} ${verdictBorder} border text-lg font-bold px-3 py-1 rounded-full`}>
                    {verdictIcon} {verdictLabel}
                </span>
            </div>

            <div className="py-5 space-y-4">

                <div className="flex items-stretch gap-4">
                    <div className="flex-1 bg-blue-50 border border-blue-100 rounded-lg p-4">
                        <p className="text-gray-500 text-lg font-medium">Giá tham khảo</p>
                        <p className="text-3xl font-black text-blue-700 mt-1">
                            {predictPrice?.pricePerM2.toFixed(1)} <span className="text-xl font-semibold">triệu/m²</span>
                        </p>
                    </div>
                    <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-gray-500 text-lg font-medium">Giá niêm yết</p>
                        <p className="text-3xl font-black text-gray-800 mt-1">
                            {formatVietnamMoney(price / landArea)}<span className="text-xl font-semibold">/m²</span>
                        </p>
                    </div>
                </div>


                <div className="space-y-2">
                    <p className="text-2xl font-semibold text-gray-500">Vị trí giá trên thị trường</p>
                    <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div className="absolute left-[25%] right-[25%] h-full bg-emerald-100/60" />
                        <div
                            className="absolute top-0 bottom-0 w-4 h-4 -mt-[2px] bg-blue-600 rounded-full shadow border-2 border-white -translate-x-1/2 transition-all duration-700"
                            style={{ left: `${barPos}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-2xl text-gray-400 font-medium">
                        <span>Thấp</span>
                        <span className="text-emerald-500">Hợp lý</span>
                        <span>Cao</span>
                    </div>
                </div>

                {/* Disclaimer */}
                <p className="text-2xl text-gray-400 italic">
                    * Giá tham khảo có sai số ±15% tùy biến động thị trường và pháp lý.
                </p>
            </div>

        </div>
    )
}

export default PostPredictPrice
