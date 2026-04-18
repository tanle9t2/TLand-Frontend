import ErrorMessage from "../../ui/ErrorMessage";
import { DIRECT_ASSET, HOUSE_TYPE, INTERIOR_STATUS, LEGAL_INFO } from "../../utils/constant";
import { HiOutlineHome, HiOutlineDocumentText, HiOutlineViewGrid } from "react-icons/hi";

const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl text-[1.4rem] text-gray-800 bg-white placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400";
const selectClass = "w-full px-4 py-3 border border-gray-200 rounded-xl text-[1.4rem] text-gray-800 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 appearance-none cursor-pointer";
const labelClass = "block text-[1.35rem] font-medium text-gray-700 mb-2";

function ApartmentFormDetail({ category, register, errors }) {
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
                            <h2 className="text-[1.7rem] font-semibold text-gray-900">Vị trí căn hộ</h2>
                            <p className="text-[1.2rem] text-gray-400">Mã căn và tòa giúp xác định chính xác</p>
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
                                placeholder="VD: A-1201"
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Tên phân khu/lô</label>
                            <input
                                type="text"
                                {...register("lotName")}
                                className={inputClass}
                                placeholder="VD: Tòa S1"
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
                            <p className="text-[1.2rem] text-gray-400">Mô tả đặc điểm căn hộ</p>
                        </div>
                    </div>
                </div>
                <div className="p-6 space-y-5">
                    {category && (
                        <div>
                            <label className={labelClass}>
                                Loại hình căn hộ <span className="text-rose-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    id="houseType"
                                    {...register("houseType", { required: "Vui lòng chọn loại hình nhà ở" })}
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
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className={labelClass}>
                                Số phòng ngủ <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="number"
                                min={0}
                                {...register("bedrooms", { required: "Vui lòng nhập số phòng ngủ" })}
                                className={inputClass}
                                placeholder="0"
                            />
                            {errors.bedrooms && <ErrorMessage message={errors.bedrooms.message} />}
                        </div>
                        <div>
                            <label className={labelClass}>Số phòng vệ sinh</label>
                            <input
                                type="number"
                                min={0}
                                {...register("bathrooms")}
                                className={inputClass}
                                placeholder="0"
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Hướng cửa chính</label>
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
                            <p className="text-[1.2rem] text-gray-400">Pháp lý và nội thất</p>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                        <div>
                            <label className={labelClass}>Tình trạng nội thất</label>
                            <div className="relative">
                                <select
                                    id="interiorStatus"
                                    {...register("interiorStatus")}
                                    className={selectClass}
                                >
                                    <option value="">Chọn tình trạng</option>
                                    {INTERIOR_STATUS.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
                            </div>
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
                            <p className="text-[1.2rem] text-gray-400">Kích thước căn hộ</p>
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
                                {...register("landArea", { valueAsNumber: true, required: "Vui lòng nhập diện tích" })}
                                className={inputClass}
                                placeholder="VD: 75"
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
                                placeholder="VD: 65"
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Chiều ngang (m)</label>
                            <input
                                type="number"
                                step="any"
                                {...register("width", { valueAsNumber: true })}
                                className={inputClass}
                                placeholder="VD: 5"
                            />
                        </div>
                        <div>
                            <label className={labelClass}>Chiều dài (m)</label>
                            <input
                                type="number"
                                step="any"
                                {...register("length", { valueAsNumber: true })}
                                className={inputClass}
                                placeholder="VD: 15"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ApartmentFormDetail
