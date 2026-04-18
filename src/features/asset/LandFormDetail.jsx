import ErrorMessage from "../../ui/ErrorMessage";
import { DIRECT_ASSET, HOUSE_TYPE, LEGAL_INFO, PROPERTY_FEATURES } from "../../utils/constant";
import { HiOutlineHome, HiOutlineDocumentText, HiOutlineViewGrid } from "react-icons/hi";

const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl text-[1.4rem] text-gray-800 bg-white placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400";
const selectClass = "w-full px-4 py-3 border border-gray-200 rounded-xl text-[1.4rem] text-gray-800 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 appearance-none cursor-pointer";
const labelClass = "block text-[1.35rem] font-medium text-gray-700 mb-2";

function LandFormDetail({ category, register, errors }) {
    return (
        <>
            {/* Vị trí BĐS */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-500 text-[1.8rem]">
                            <HiOutlineHome />
                        </div>
                        <div>
                            <h2 className="text-[1.7rem] font-semibold text-gray-900">Vị trí đất</h2>
                            <p className="text-[1.2rem] text-gray-400">Lô đất và phân khu</p>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className={labelClass}>Mã căn</label>
                            <input
                                type="text"
                                {...register("apartmentCode")}
                                className={inputClass}
                                placeholder="VD: L-05"
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Tên phân khu/lô</label>
                            <input
                                type="text"
                                {...register("lotName")}
                                className={inputClass}
                                placeholder="VD: Khu dân cư ABC"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Thông tin chi tiết */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 text-[1.8rem]">
                            <HiOutlineViewGrid />
                        </div>
                        <div>
                            <h2 className="text-[1.7rem] font-semibold text-gray-900">Thông tin chi tiết</h2>
                            <p className="text-[1.2rem] text-gray-400">Loại hình và hướng đất</p>
                        </div>
                    </div>
                </div>
                <div className="p-6 space-y-5">
                    <div>
                        <label className={labelClass}>
                            Loại hình đất <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                            <select
                                id="houseType"
                                {...register("houseType", { required: "Vui lòng chọn loại hình đất" })}
                                className={selectClass}
                            >
                                <option value="">Chọn loại hình</option>
                                {HOUSE_TYPE[category.name].map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
                        </div>
                        {errors.houseType && <ErrorMessage message={errors.houseType.message} />}
                    </div>
                    <div>
                        <label className={labelClass}>Hướng đất</label>
                        <div className="relative">
                            <select
                                id="mainDirection"
                                {...register("mainDirection")}
                                className={selectClass}
                            >
                                <option value="">Chọn hướng</option>
                                {DIRECT_ASSET.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Thông tin khác */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-500 text-[1.8rem]">
                            <HiOutlineDocumentText />
                        </div>
                        <div>
                            <h2 className="text-[1.7rem] font-semibold text-gray-900">Thông tin khác</h2>
                            <p className="text-[1.2rem] text-gray-400">Pháp lý và tiện ích</p>
                        </div>
                    </div>
                </div>
                <div className="p-6 space-y-5">
                    <div>
                        <label className={labelClass}>
                            Giấy tờ pháp lý <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                            <select
                                id="legalDocs"
                                {...register("legalDocs", { required: "Vui lòng chọn giấy tờ pháp lý" })}
                                className={selectClass}
                            >
                                <option value="">Chọn pháp lý</option>
                                {LEGAL_INFO.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                            </select>
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
                        </div>
                        {errors.legalDocs && <ErrorMessage message={errors.legalDocs.message} />}
                    </div>

                    {/* Tiện ích */}
                    <div>
                        <label className={labelClass}>Tiện ích nổi bật</label>
                        <div className="grid grid-cols-2 gap-3 mt-1">
                            {PROPERTY_FEATURES.LAND.map((label, index) => (
                                <label
                                    key={index}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 cursor-pointer transition-all duration-200 hover:border-rose-300 hover:bg-rose-50/30 has-[:checked]:border-rose-400 has-[:checked]:bg-rose-50"
                                >
                                    <input
                                        type="checkbox"
                                        {...register("otherInfo")}
                                        value={label}
                                        className="w-4 h-4 rounded border-gray-300 text-rose-500 focus:ring-rose-500/20 accent-rose-500"
                                    />
                                    <span className="text-[1.3rem] text-gray-700">{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Diện tích */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 text-[1.8rem]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-[1.7rem] font-semibold text-gray-900">Diện tích</h2>
                            <p className="text-[1.2rem] text-gray-400">Kích thước lô đất</p>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className={labelClass}>
                                Diện tích đất (m²) <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="number"
                                step="any"
                                {...register("landArea", { valueAsNumber: true, required: "Vui lòng nhập diện tích đất" })}
                                className={inputClass}
                                placeholder="VD: 200"
                            />
                            {errors.landArea && <ErrorMessage message={errors.landArea.message} />}
                        </div>
                        <div>
                            <label className={labelClass}>Diện tích sử dụng (m²)</label>
                            <input
                                type="number"
                                step="any"
                                {...register("usableArea", { valueAsNumber: true })}
                                className={inputClass}
                                placeholder="VD: 180"
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Chiều ngang (m)</label>
                            <input
                                type="number"
                                step="any"
                                {...register("width", { valueAsNumber: true })}
                                className={inputClass}
                                placeholder="VD: 8"
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Chiều dài (m)</label>
                            <input
                                type="number"
                                step="any"
                                {...register("length", { valueAsNumber: true })}
                                className={inputClass}
                                placeholder="VD: 25"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandFormDetail
