import ErrorMessage from "../../ui/ErrorMessage";
import { DIRECT_ASSET, HOUSE_TYPE, INTERIOR_STATUS, LEGAL_INFO, PROPERTY_FEATURES } from "../../utils/constant";

function LandFormDetail({ category, register, errors }) {
    return (
        <>
            <section>
                <h2 className="text-3xl font-bold mb-4">Vị trí bất động sản</h2>

                <div className="text-2xl grid grid-cols-1 md:grid-cols-2 gap-5">

                    <div>
                        <label className="block font-semibold mb-1">Mã căn</label>
                        <input
                            type="text"
                            {...register("apartmentCode")}
                            className="w-full p-3 border rounded"
                            placeholder="Mã căn"
                        />

                    </div>

                    <div>
                        <label className="block font-semibold mb-1">Tên phân khu/lô</label>
                        <input
                            type="text"
                            {...register("lotName")}
                            className="w-full p-3 border rounded"
                            placeholder="Tên phân khu/lô"
                        />

                    </div>
                </div>
            </section>
            {/* Thông tin chi tiết */}
            <section className="text-2xl">
                <h2 className="text-3xl font-bold mb-4">Thông tin chi tiết</h2>

                {/* Loại hình nhà ở */}
                <div className="mb-5">
                    <label className="block font-semibold mb-1">Loại hình đất <span className="text-red-500">*</span></label>
                    <select
                        id="houseType"
                        {...register("houseType", { required: "Vui lòng chọn loại hình đất" })}
                        className="w-full p-3 border rounded text-2xl"
                    >
                        <option value="">Loại hình nhà ở</option>
                        {HOUSE_TYPE[category.name].map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                    {errors.houseType && (
                        <ErrorMessage message={errors.houseType.message} />
                    )}
                </div>
                <div>
                    <label className="block font-semibold mb-1">Hướng đất</label>
                    <select
                        id="mainDirection"
                        {...register("mainDirection")}
                        className="w-full p-3 border rounded text-2xl"
                    >
                        <option value="">Hướng đất</option>
                        {DIRECT_ASSET.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                </div>
            </section>

            {/* Thông tin khác */}
            <section>
                <h2 className="text-3xl font-bold mb-4">Thông tin khác</h2>
                <div className="text-2xl gap-5">
                    <div>
                        <select
                            id="legalDocs"
                            {...register("legalDocs", { required: "Vui lòng chọn giấy tờ pháp lý" })}
                            className="w-full p-3 border rounded text-2xl"
                        >
                            <option value="">Giấy tờ pháp lý</option>
                            {LEGAL_INFO.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}

                        </select>
                        {errors.legalDocs && (
                            <ErrorMessage message={errors.legalDocs.message} />
                        )}
                    </div>


                </div>

                {/* Checkbox group */}
                <div className="grid text-2xl grid-cols-2 gap-3 mt-4">
                    {PROPERTY_FEATURES.LAND.map((label, index) => (
                        <label key={index} className="flex items-center gap-2">
                            <input type="checkbox" {...register("otherInfo")} value={label} />
                            <span>{label}</span>
                        </label>
                    ))}
                </div>
            </section>

            {/* Diện tích & giá */}
            <section>
                <h2 className="text-3xl font-bold mb-4">Diện tích</h2>
                <div className="text-2xl grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                        <input
                            type="number"
                            {...register("landArea", { valueAsNumber: true }, { required: "Vui lòng nhập diện tích đất" })}
                            className="p-3 border rounded w-full"
                            placeholder="Diện tích đất"
                        />
                        {errors.landArea && (
                            <ErrorMessage message={errors.landArea.message} />
                        )}
                    </div>
                    <div className="md:col-span-2">
                        <input
                            type="number"
                            {...register("usableArea", { valueAsNumber: true })}
                            className="p-3 w-full border rounded"
                            placeholder="Diện tích sử dụng"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-bold">Chiều ngang: </h2>
                        <input
                            type="number"
                            {...register("width", { valueAsNumber: true })}
                            className="p-3 border rounded"
                            placeholder="Chiều ngang"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-bold">Chiều dài:</h2>
                        <input
                            type="number"
                            {...register("length", { valueAsNumber: true })}
                            className="p-3 border rounded"
                            placeholder="Chiều dài"
                        />
                    </div>
                </div>
            </section>
        </>

    )
}

export default LandFormDetail
