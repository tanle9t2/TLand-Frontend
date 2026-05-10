import HousePriceForm from "../features/predict/HousePriceForm"
import { HiOutlineSparkles } from "react-icons/hi"

export default function HousePricePage() {
    return (
        <div className=" mx-auto px-4 py-10">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-600 via-rose-500 to-red-700 px-8 py-10 mb-8 shadow-xl shadow-rose-200">
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                        backgroundSize: "40px 40px"
                    }}
                />
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-5">
                        <HiOutlineSparkles className="text-white text-[1.5rem]" />
                        <span className="text-white font-semibold text-[1.25rem]">AI-Powered Valuation</span>
                    </div>
                    <h1 className="text-[3.2rem] font-black text-white leading-tight mb-3">
                        Định giá bất động sản <br />
                        <span className="text-rose-200">thông minh tại TP.HCM</span>
                    </h1>
                    <p className="text-[1.45rem] text-rose-100 max-w-[52rem] leading-relaxed">
                        Nhập thông tin bất động sản để nhận định giá tức thì từ mô hình AI được huấn luyện trên hàng nghìn giao dịch thực tế tại TP. Hồ Chí Minh.
                    </p>
                </div>
            </div>


            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                <HousePriceForm />
            </div>

            {/* Notes */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { icon: "🏙️", title: "Chỉ hỗ trợ TP.HCM", desc: "Mô hình được huấn luyện trên dữ liệu giao dịch TP. Hồ Chí Minh" },
                    { icon: "⚡", title: "Kết quả tức thì", desc: "Định giá bằng AI trong vài giây, không cần chờ đợi định giá thủ công" },
                    { icon: "📊", title: "Sai số ±15%", desc: "Giá tham khảo dựa trên mô hình, mang tính ước tính thị trường" },
                ].map(item => (
                    <div key={item.title} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                        <div className="text-[2.2rem] mb-2">{item.icon}</div>
                        <p className="text-[1.35rem] font-bold text-gray-800 mb-1">{item.title}</p>
                        <p className="text-[1.2rem] text-gray-500">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
