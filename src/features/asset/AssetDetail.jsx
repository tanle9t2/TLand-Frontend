import { HiOutlineLocationMarker, HiOutlineClock, HiOutlineViewGrid, HiOutlineInformationCircle } from "react-icons/hi";
import Section from "../../ui/Section"
import { getTimeDifferenceFromNow } from "../../utils/helper";
import { PROPERTIES } from "../../utils/constant";

function AssetDetail({ asset }) {
    const { createdAt, landArea, usableArea, address, ward, province, properties, otherInfo } = asset;

    return (
        <div className="space-y-6">
            {/* Location & Time */}
            <Section>
                <div className="p-6 space-y-4">
                    <div className="flex items-start gap-3 text-[1.4rem] text-gray-700">
                        <HiOutlineLocationMarker className="text-[1.6rem] text-rose-500 mt-0.5 flex-shrink-0" />
                        <span className="font-medium">{`${address}, ${ward}, ${province}`}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[1.3rem] text-gray-500">
                        <HiOutlineClock className="text-[1.5rem] flex-shrink-0" />
                        <span>{getTimeDifferenceFromNow(createdAt)}</span>
                    </div>
                </div>
            </Section>

            {/* Area Info */}
            <Section>
                <div className="px-6 py-5 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                            </svg>
                        </div>
                        <h2 className="text-[1.6rem] font-semibold text-gray-900">Diện tích</h2>
                    </div>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                            <p className="text-[1.2rem] text-gray-500 mb-1">Diện tích đất</p>
                            <p className="text-[1.8rem] font-bold text-gray-900">
                                {landArea} <span className="text-[1.2rem] font-normal text-gray-500">m²</span>
                            </p>
                        </div>
                        {usableArea && (
                            <div className="bg-gray-50 rounded-xl p-4 text-center">
                                <p className="text-[1.2rem] text-gray-500 mb-1">Diện tích sử dụng</p>
                                <p className="text-[1.8rem] font-bold text-gray-900">
                                    {usableArea} <span className="text-[1.2rem] font-normal text-gray-500">m²</span>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </Section>

            {/* Properties */}
            {Object.keys(properties).length > 0 && (
                <Section>
                    <div className="px-6 py-5 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500">
                                <HiOutlineViewGrid className="text-[1.4rem]" />
                            </div>
                            <h2 className="text-[1.6rem] font-semibold text-gray-900">Thông tin chi tiết</h2>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {Object.entries(properties).map(([key, value]) => {
                            const Icon = PROPERTIES[key]?.icon;
                            return (
                                <div
                                    key={key}
                                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors"
                                >
                                    <span className="flex items-center gap-3 text-[1.35rem] text-gray-600">
                                        {Icon && <Icon className="text-[1.4rem] text-gray-400" />}
                                        {PROPERTIES[key]?.label}
                                    </span>
                                    <span className="text-[1.35rem] font-semibold text-gray-900">{value}</span>
                                </div>
                            );
                        })}
                    </div>
                </Section>
            )}

            {/* Other Info */}
            {otherInfo && otherInfo.length > 0 && (
                <Section>
                    <div className="px-6 py-5 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center text-teal-500">
                                <HiOutlineInformationCircle className="text-[1.4rem]" />
                            </div>
                            <h2 className="text-[1.6rem] font-semibold text-gray-900">Thông tin khác</h2>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex flex-wrap gap-2">
                            {otherInfo.map((info, idx) => (
                                <span
                                    key={idx}
                                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 text-[1.2rem] text-gray-700 font-medium"
                                >
                                    {info}
                                </span>
                            ))}
                        </div>
                    </div>
                </Section>
            )}
        </div>
    )
}

export default AssetDetail
