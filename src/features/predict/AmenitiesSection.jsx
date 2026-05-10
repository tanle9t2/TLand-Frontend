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
function AmenitiesSection({ amenities }) {
    if (!amenities) return null

    const schools = amenities.schools ?? []
    const hospitals = amenities.hospitals ?? []

    if (schools.length === 0 && hospitals.length === 0) return null

    return (
        <div className="space-y-4 animate-[fadeIn_0.5s_ease-out_0.3s_both]">

            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <HiOutlineOfficeBuilding className="text-3xl text-white" />
                </div>
                <div>
                    <h3 className="text-3xl font-black text-gray-900">Tiện ích lân cận</h3>
                    <p className="text-2xl text-gray-400 font-medium">Các tiện ích xung quanh bất động sản</p>
                </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {schools.length > 0 && (
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-5 space-y-3 animate-[slideUp_0.4s_ease-out_both]" style={{ animationDelay: "100ms" }}>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                <HiOutlineAcademicCap className="text-3xl text-emerald-600" />
                            </div>
                            <h4 className="text-3xl font-bold text-emerald-800">Trường học</h4>
                            <span className="ml-auto px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[1.1rem] font-semibold">{schools.length}</span>
                        </div>
                        <ul className="space-y-2">
                            {schools.map((s, i) => (
                                <li key={i} className="flex items-start gap-2 text-2xl text-gray-700 leading-snug">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-[0.4em]" />
                                    {s.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}


                {hospitals.length > 0 && (
                    <div className="bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-100 rounded-2xl p-5 space-y-3 animate-[slideUp_0.4s_ease-out_both]" style={{ animationDelay: "200ms" }}>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-sky-100 flex items-center justify-center flex-shrink-0">
                                <HiOutlineHeart className="text-3xl text-sky-600" />
                            </div>
                            <h4 className="text-3xl font-bold text-sky-800">Bệnh viện / Phòng khám</h4>
                            <span className="ml-auto px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 text-[1.1rem] font-semibold">{hospitals.length}</span>
                        </div>
                        <ul className="space-y-2">
                            {hospitals.map((h, i) => (
                                <li key={i} className="flex items-start gap-2 text-2xl text-gray-700 leading-snug">
                                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0 mt-[0.4em]" />
                                    {h.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )

}

export default AmenitiesSection
