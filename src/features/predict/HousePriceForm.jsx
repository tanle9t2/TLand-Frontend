import { useForm } from "react-hook-form"
import { useState } from "react"
import {
    LEGAL_INFO, INTERIOR_STATUS,
    PROPERTY_FEATURES, DIRECT_ASSET
} from "../../utils/constant"
import usePredictHouse from "../post/usePredictHouse"
import HousePriceResult from "./HousePriceResult"
import ModalSelectAddress from "../../ui/ModalSelectAddress"
import ErrorMessage from "../../ui/ErrorMessage"
import {
    HiOutlineHome, HiOutlineDocumentText, HiOutlineViewGrid,
    HiOutlineLocationMarker, HiOutlineSparkles
} from "react-icons/hi"
import { TbEscalator, TbBath } from "react-icons/tb"
import { IoBedOutline } from "react-icons/io5"
import { RiContractFill } from "react-icons/ri"
import { LuPackage2 } from "react-icons/lu"
import { BsDoorOpen } from "react-icons/bs"
import { RxDimensions } from "react-icons/rx"
const HOUSE_TYPE = {
    "Nhà ở": [
        "Nhà mặt phố, mặt tiền",
        "Nhà ngõ, hẻm",
        "Nhà biệt thự",
        "Nhà phố liền kề"
    ]
}
const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl text-[1.4rem] text-gray-800 bg-white placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400"
const selectClass = "w-full px-4 py-3 border border-gray-200 rounded-xl text-[1.4rem] text-gray-800 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 appearance-none cursor-pointer"
const labelClass = "block text-[1.35rem] font-medium text-gray-700 mb-2"

function SectionCard({ icon, iconBg, iconColor, title, subtitle, children }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center ${iconColor} text-[1.8rem]`}>
                        {icon}
                    </div>
                    <div>
                        <h2 className="text-[1.7rem] font-semibold text-gray-900">{title}</h2>
                        <p className="text-[1.2rem] text-gray-400">{subtitle}</p>
                    </div>
                </div>
            </div>
            <div className="p-6 space-y-5">
                {children}
            </div>
        </div>
    )
}

function Stepper({ label, value, onChange, min = 0, max = 99, icon: Icon }) {
    return (
        <div>
            <label className={labelClass}>
                {Icon && <span className="inline-flex items-center gap-1.5">
                    <Icon className="text-rose-400 text-[1.5rem]" />
                    {label}
                </span>}
                {!Icon && label}
            </label>
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-rose-400 focus-within:bg-white transition-all duration-200">
                <button type="button"
                    onClick={() => onChange(Math.max(min, Number(value) - 1))}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-rose-100 hover:text-rose-700 font-bold text-[1.6rem] flex items-center justify-center transition-colors cursor-pointer">
                    −
                </button>
                <span className="flex-1 text-center text-[1.5rem] font-bold text-gray-800">{value || 0}</span>
                <button type="button"
                    onClick={() => onChange(Math.min(max, Number(value) + 1))}
                    className="w-8 h-8 rounded-full bg-gray-200 hover:bg-rose-100 hover:text-rose-700 font-bold text-[1.6rem] flex items-center justify-center transition-colors cursor-pointer">
                    +
                </button>
            </div>
        </div>
    )
}

export default function HousePriceForm() {
    const [address, setAddress] = useState(null)
    const [result, setResult] = useState(null)
    const [addressError, setAddressError] = useState("")
    const { isPending, predictHouse } = usePredictHouse()

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        defaultValues: {
            houseType: "",
            legalDocs: "",
            interiorStatus: "",
            mainDirection: "",
            bedrooms: 0,
            bathrooms: 0,
            floors: 0,
            landArea: "",
            otherInfo: []
        }
    })

    const watchedType = watch("houseType")
    const isLand = watchedType?.toLowerCase().includes("đất")
    const featureOptions = isLand ? PROPERTY_FEATURES.LAND : PROPERTY_FEATURES.HOUSE

    function onSubmit(data) {
        if (!address?.province) {
            setAddressError("Vui lòng chọn địa chỉ bất động sản")
            return
        }
        if (address.province !== "Hồ Chí Minh") {
            setAddressError("Mô hình AI chỉ hỗ trợ TP. Hồ Chí Minh")
            return
        }
        setAddressError("")

        const fullAddress = [data.detail || address.detail, address.ward, address.province]
            .filter(Boolean).join(", ")

        predictHouse({
            address: fullAddress,
            area: Number(data.landArea),
            floors: Number(data.floors) || 0,
            bedrooms: Number(data.bedrooms) || 0,
            bathrooms: Number(data.bathrooms) || 0,
            propertyType: data.houseType,
            legalStatus: data.legalDocs,
            furnitureState: data.interiorStatus,
            propertyFeature: Array.isArray(data.otherInfo) ? data.otherInfo.join(",") : "",
            year: new Date().getFullYear(),
        }, {
            onSuccess: (res) => setResult(res),
        })
    }
    if (result) {
        return (
            <HousePriceResult
                result={result}
                area={Number(watch("landArea"))}
                address={[address?.detail, address?.ward, address?.province].filter(Boolean).join(", ")}
                onReset={() => setResult(null)}
            />
        )
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            <SectionCard
                icon={<HiOutlineLocationMarker />}
                iconBg="bg-rose-50"
                iconColor="text-rose-500"
                title="Địa chỉ bất động sản"
                subtitle="Chỉ hỗ trợ TP. Hồ Chí Minh"
            >
                <div>
                    <label className={labelClass}>
                        Tỉnh / Phường / Số nhà <span className="text-rose-500">*</span>
                    </label>
                    <ModalSelectAddress address={address} setAddress={(addr) => {
                        setAddress(addr)
                        setAddressError("")
                    }} />
                    {addressError && <ErrorMessage message={addressError} />}
                    {address?.province && address.province !== "Hồ Chí Minh" && (
                        <div className="mt-3 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                            <span className="text-[1.4rem]">⚠️</span>
                            <p className="text-[1.25rem] text-amber-700">
                                Mô hình AI chỉ hỗ trợ <strong>TP. Hồ Chí Minh</strong>. Vui lòng chọn lại địa chỉ.
                            </p>
                        </div>
                    )}
                    {address?.province === "Hồ Chí Minh" && (
                        <div className="mt-3 flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                            <span className="text-emerald-500 text-[1.5rem]">✓</span>
                            <p className="text-[1.3rem] font-semibold text-emerald-700">Hỗ trợ định giá tại TP. Hồ Chí Minh</p>
                        </div>
                    )}
                </div>
            </SectionCard>

            <SectionCard
                icon={<HiOutlineViewGrid />}
                iconBg="bg-indigo-50"
                iconColor="text-indigo-500"
                title="Loại hình & Thông tin chi tiết"
                subtitle="Mô tả đặc điểm của bất động sản"
            >
                <div>
                    <label className={labelClass}>
                        Loại hình bất động sản <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                        <select id="houseType"
                            {...register("houseType", { required: "Vui lòng chọn loại hình" })}
                            className={selectClass}>
                            <option value="">-- Chọn loại hình --</option>
                            {Object.entries(HOUSE_TYPE).map(([group, types]) => (
                                <optgroup key={group} label={group}>
                                    {types.map(t => <option key={t} value={t}>{t}</option>)}
                                </optgroup>
                            ))}
                        </select>
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
                    </div>
                    {errors.houseType && <ErrorMessage message={errors.houseType.message} />}
                </div>

                {watchedType && !isLand && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <Stepper icon={IoBedOutline} label="Số phòng ngủ"
                            name="bedrooms" value={watch("bedrooms")}
                            onChange={v => setValue("bedrooms", v)} max={20} />
                        <Stepper icon={TbBath} label="Số phòng tắm"
                            name="bathrooms" value={watch("bathrooms")}
                            onChange={v => setValue("bathrooms", v)} max={20} />
                        <Stepper icon={TbEscalator} label="Số tầng"
                            name="floors" value={watch("floors")}
                            onChange={v => setValue("floors", v)} max={50} />
                    </div>
                )}
                {watchedType && !isLand && (
                    <div>
                        <label className={`${labelClass} flex items-center gap-1.5`}>
                            <BsDoorOpen className="text-rose-400" /> Hướng cửa chính
                        </label>
                        <div className="relative">
                            <select id="mainDirection" {...register("mainDirection")} className={selectClass}>
                                <option value="">Chọn hướng (tuỳ chọn)</option>
                                {DIRECT_ASSET.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
                        </div>
                    </div>
                )}
            </SectionCard>
            <SectionCard
                icon={<RxDimensions />}
                iconBg="bg-orange-50"
                iconColor="text-orange-500"
                title="Diện tích"
                subtitle="Thông tin về kích thước bất động sản"
            >
                <div>
                    <label className={labelClass}>
                        Diện tích đất (m²) <span className="text-rose-500">*</span>
                    </label>
                    <input type="number" step="any" min={1}
                        {...register("landArea", { valueAsNumber: true, required: "Vui lòng nhập diện tích đất", min: { value: 1, message: "Diện tích phải lớn hơn 0" } })}
                        className={inputClass} placeholder="VD: 80" />
                    {errors.landArea && <ErrorMessage message={errors.landArea.message} />}
                </div>
            </SectionCard>

            <SectionCard
                icon={<HiOutlineDocumentText />}
                iconBg="bg-teal-50"
                iconColor="text-teal-500"
                title="Pháp lý & Nội thất"
                subtitle="Tình trạng giấy tờ và nội thất hiện tại"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className={`${labelClass} flex items-center gap-1.5`}>
                            <RiContractFill className="text-rose-400 text-[1.5rem]" />
                            Giấy tờ pháp lý <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                            <select id="legalDocs"
                                {...register("legalDocs", { required: "Vui lòng chọn giấy tờ pháp lý" })}
                                className={selectClass}>
                                <option value="">Chọn pháp lý</option>
                                {LEGAL_INFO.map(item => <option key={item} value={item}>{item}</option>)}
                            </select>
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
                        </div>
                        {errors.legalDocs && <ErrorMessage message={errors.legalDocs.message} />}
                    </div>

                    <div>
                        <label className={`${labelClass} flex items-center gap-1.5`}>
                            <LuPackage2 className="text-rose-400 text-[1.5rem]" />
                            Tình trạng nội thất <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                            <select id="interiorStatus"
                                {...register("interiorStatus", { required: "Vui lòng chọn tình trạng nội thất" })}
                                className={selectClass}>
                                <option value="">Chọn tình trạng</option>
                                {INTERIOR_STATUS.map(item => <option key={item} value={item}>{item}</option>)}
                            </select>
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
                        </div>
                        {errors.interiorStatus && <ErrorMessage message={errors.interiorStatus.message} />}
                    </div>
                </div>

                <div>
                    <label className={`${labelClass} flex items-center gap-1.5`}>
                        <HiOutlineHome className="text-rose-400 text-[1.5rem]" />
                        Đặc điểm nổi bật
                    </label>
                    <div className="grid grid-cols-2 gap-3 mt-1">
                        {featureOptions.map((label) => (
                            <label
                                key={label}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 cursor-pointer transition-all duration-200 hover:border-rose-300 hover:bg-rose-50/30 has-[:checked]:border-rose-400 has-[:checked]:bg-rose-50"
                            >
                                <input
                                    type="checkbox"
                                    {...register("otherInfo")}
                                    value={label}
                                    className="w-4 h-4 rounded border-gray-300 accent-rose-500"
                                />
                                <span className="text-[1.3rem] text-gray-700">{label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </SectionCard>


            <button type="submit" disabled={isPending}
                className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl text-[1.5rem] font-black text-white transition-all duration-200 cursor-pointer
                    ${isPending
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-700 hover:to-rose-600 shadow-lg shadow-rose-300/40 hover:shadow-xl hover:-translate-y-0.5"
                    }`}>
                {isPending ? (
                    <>
                        <svg className="animate-spin h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Đang phân tích...
                    </>
                ) : (
                    <>
                        <HiOutlineSparkles className="text-[1.8rem]" />
                        Định giá bất động sản ngay
                    </>
                )}
            </button>
        </form>
    )
}
