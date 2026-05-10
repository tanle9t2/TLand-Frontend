import {
    HiOutlineRefresh,
    HiOutlineLocationMarker,
    HiOutlineLightBulb,
    HiOutlineChartBar,
    HiOutlineTrendingUp,
    HiOutlineShieldCheck,
    HiOutlineBadgeCheck,
    HiOutlineExclamation,
    HiOutlineAcademicCap,
    HiOutlineHeart,
    HiOutlineOfficeBuilding,
} from "react-icons/hi"
import ReactMarkdown from "react-markdown";

function AnalysisCard({ icon: Icon, title, content, accentColor, delay = 0 }) {
    const colorMap = {
        blue: {
            bg: "bg-gradient-to-br from-blue-50 to-sky-50",
            border: "border-blue-100",
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            titleColor: "text-blue-800",
        },
        emerald: {
            bg: "bg-gradient-to-br from-emerald-50 to-teal-50",
            border: "border-emerald-100",
            iconBg: "bg-emerald-100",
            iconColor: "text-emerald-600",
            titleColor: "text-emerald-800",
        },
        amber: {
            bg: "bg-gradient-to-br from-amber-50 to-orange-50",
            border: "border-amber-100",
            iconBg: "bg-amber-100",
            iconColor: "text-amber-600",
            titleColor: "text-amber-800",
        },
        teal: {
            bg: "bg-gradient-to-br from-teal-50 to-cyan-50",
            border: "border-teal-100",
            iconBg: "bg-teal-100",
            iconColor: "text-teal-600",
            titleColor: "text-teal-800",
        },
    }

    const colors = colorMap[accentColor] || colorMap.blue

    return (
        <div
            className={`${colors.bg} border ${colors.border} rounded-2xl p-5 space-y-3 animate-[slideUp_0.4s_ease-out_both]`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl ${colors.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`text-[1.4rem] ${colors.iconColor}`} />
                </div>
                <h4 className={`text-3xl font-bold ${colors.titleColor}`}>{title}</h4>
            </div>
            <div className="text-2xl leading-relaxed">
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        </div>
    )
}

function AIAnalysisSection({ analysis }) {
    const { priceAnalysis, marketComparison, investmentPotential, recommendation, highlights, risks } = analysis

    const hasTextAnalysis = priceAnalysis || marketComparison || investmentPotential || recommendation
    const hasHighlights = highlights?.length > 0
    const hasRisks = risks?.length > 0

    if (!hasTextAnalysis && !hasHighlights && !hasRisks) return null

    return (
        <div className="space-y-5 animate-[fadeIn_0.5s_ease-out_0.2s_both]">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <HiOutlineLightBulb className="text-3xl text-white" />
                </div>
                <div>
                    <h3 className="text-3xl font-black text-gray-900">Phân tích chi tiết từ AI</h3>
                    <p className="text-2xl text-gray-400 font-medium">Đánh giá dựa trên dữ liệu thị trường</p>
                </div>
            </div>


            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />


            <div className="space-y-4">
                {priceAnalysis && (
                    <AnalysisCard
                        icon={HiOutlineChartBar}
                        title="Phân tích mức giá"
                        content={priceAnalysis}
                        accentColor="blue"
                        delay={100}
                    />
                )}
                {marketComparison && (
                    <AnalysisCard
                        icon={HiOutlineTrendingUp}
                        title="So sánh thị trường"
                        content={marketComparison}
                        accentColor="emerald"
                        delay={200}
                    />
                )}
                {investmentPotential && (
                    <AnalysisCard
                        icon={HiOutlineShieldCheck}
                        title="Tiềm năng đầu tư"
                        content={investmentPotential}
                        accentColor="teal"
                        delay={300}
                    />
                )}
                {recommendation && (
                    <AnalysisCard
                        icon={HiOutlineLightBulb}
                        title="Khuyến nghị"
                        content={recommendation}
                        accentColor="amber"
                        delay={400}
                    />
                )}
            </div>


            {hasHighlights && (
                <div
                    className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-5 space-y-3 animate-[slideUp_0.4s_ease-out_both]"
                    style={{ animationDelay: "500ms" }}
                >
                    <div className="flex items-center gap-2">
                        <HiOutlineBadgeCheck className="text-[1.5rem] text-emerald-600" />
                        <h4 className="text-3xl font-bold text-emerald-800">Điểm mạnh nổi bật</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {highlights.map((item, i) => (
                            <span
                                key={i}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-emerald-200 text-2xl text-emerald-700 font-medium shadow-sm"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            )}


            {hasRisks && (
                <div
                    className="bg-gradient-to-br from-rose-50 to-orange-50 border border-rose-100 rounded-2xl p-5 space-y-3 animate-[slideUp_0.4s_ease-out_both]"
                    style={{ animationDelay: "600ms" }}
                >
                    <div className="flex items-center gap-2">
                        <HiOutlineExclamation className="text-[1.5rem] text-rose-600" />
                        <h4 className="text-3xl font-bold text-rose-800">Rủi ro cần lưu ý</h4>
                    </div>
                    <ul className="space-y-2">
                        {risks.map((item, i) => (
                            <li
                                key={i}
                                className="flex items-start gap-2 text-2xl text-gray-600 leading-relaxed"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0 mt-2" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default AIAnalysisSection
