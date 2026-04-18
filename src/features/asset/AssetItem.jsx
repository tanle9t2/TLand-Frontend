import { HiOutlineLocationMarker, HiOutlineCalendar } from "react-icons/hi";
import { convertDate } from "../../utils/helper";

function AssetItem({ asset }) {
    const { id, usableArea, landArea, address, ward, province, createdAt, imageUrl } = asset;

    return (
        <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-300 cursor-pointer">
            <div className="flex h-[160px]">
                {/* Image */}
                <div className="w-52 flex-shrink-0 overflow-hidden relative">
                    <img
                        src={imageUrl}
                        alt={`Tài sản ${id}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
                </div>

                {/* Content */}
                <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                    <div>
                        <p className="text-[1.15rem] text-gray-400 font-medium mb-1">
                            Mã: <span className="text-gray-600 font-mono">{id}</span>
                        </p>
                        <div className="flex items-start gap-2 mb-2">
                            <HiOutlineLocationMarker className="text-[1.3rem] text-rose-500 mt-0.5 flex-shrink-0" />
                            <p className="text-[1.3rem] font-medium text-gray-800 line-clamp-2 leading-snug">
                                {`${address}, ${ward}, ${province}`}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-4">
                            <div className="bg-gray-50 rounded-lg px-2.5 py-1">
                                <span className="text-[1.1rem] text-gray-500">Đất </span>
                                <span className="text-[1.2rem] font-semibold text-gray-800">{landArea}</span>
                                <span className="text-[1rem] text-gray-400"> m²</span>
                            </div>
                            {usableArea && (
                                <div className="bg-gray-50 rounded-lg px-2.5 py-1">
                                    <span className="text-[1.1rem] text-gray-500">SD </span>
                                    <span className="text-[1.2rem] font-semibold text-gray-800">{usableArea}</span>
                                    <span className="text-[1rem] text-gray-400"> m²</span>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-1.5 text-[1.1rem] text-gray-400">
                            <HiOutlineCalendar className="text-[1.2rem]" />
                            {convertDate(createdAt)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AssetItem
