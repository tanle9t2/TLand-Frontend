import ModalSelectAddress from "../../ui/ModalSelectAddress";
import ErrorMessage from "../../ui/ErrorMessage";
import ModalSelectCategory from "../../ui/ModalSelectCategory";
import HouseFormDetail from './HouseFormDetail';
import ApartmentFormDetail from "./ApartmentFormDetail "
import LandFormDetail from './LandFormDetail';
import { HiOutlineLocationMarker, HiOutlineTag } from "react-icons/hi";

function AssetCreatedForm({ register, errors, handleOnChangeAddress, watch, setCategory }) {
    const category = watch("category");
    const address = watch("address");

    return (
        <div className="space-y-6">
            {/* Category Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 text-[1.8rem]">
                            <HiOutlineTag />
                        </div>
                        <div>
                            <h2 className="text-[1.7rem] font-semibold text-gray-900">Danh mục</h2>
                            <p className="text-[1.2rem] text-gray-400">Chọn loại bất động sản phù hợp</p>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <ModalSelectCategory category={category} setCategory={setCategory} />
                    {errors.category && (
                        <ErrorMessage message={errors.category.message} />
                    )}
                </div>
            </div>

            {/* Address Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 pt-6 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 text-[1.8rem]">
                            <HiOutlineLocationMarker />
                        </div>
                        <div>
                            <h2 className="text-[1.7rem] font-semibold text-gray-900">Địa chỉ BĐS</h2>
                            <p className="text-[1.2rem] text-gray-400">Vị trí chính xác giúp khách tìm kiếm dễ hơn</p>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <ModalSelectAddress address={address} setAddress={handleOnChangeAddress} />
                    {errors.address && (
                        <ErrorMessage message={errors.address.message} />
                    )}
                </div>
            </div>

            {/* Form Detail — based on category */}
            {category && (
                <div className="space-y-6">
                    {category.name === "Nhà ở" && (
                        <HouseFormDetail category={category} register={register} errors={errors} />
                    )}
                    {category.name === "Căn hộ/Chung cư" && (
                        <ApartmentFormDetail category={category} register={register} errors={errors} />
                    )}
                    {category.name === "Đất" && (
                        <LandFormDetail category={category} register={register} errors={errors} />
                    )}
                </div>
            )}

            {/* Empty state when no category selected */}
            {!category && (
                <div className="bg-white rounded-2xl shadow-sm border border-dashed border-gray-200 p-12 text-center">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 text-[2.4rem] mb-4">
                        <HiOutlineTag />
                    </div>
                    <p className="text-[1.5rem] text-gray-400 font-medium">Chọn danh mục để tiếp tục</p>
                    <p className="text-[1.2rem] text-gray-300 mt-1">Thông tin chi tiết sẽ hiển thị sau khi chọn loại BĐS</p>
                </div>
            )}
        </div>
    )
}

export default AssetCreatedForm
