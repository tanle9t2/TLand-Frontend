import { CiLocationOn } from "react-icons/ci"
import Section from "../../ui/Section"
import { caculateSquare, formatAddress, formatVietnamMoney, getTimeDifferenceFromNow } from "../../utils/helper";
import { HCM, PROPERTIES } from "../../utils/constant";
import usePredictHouse from "./usePredictHouse";
import { useEffect, useState } from "react";
import PostPredictPrice from "./PostPredictPrice";
import { HiOutlineClock, HiOutlinePhone } from "react-icons/hi";

function PostDetail({ phoneNumber, post }) {
    const { price, type, createdAt, title, description, assetDetail } = post;
    const square = caculateSquare(assetDetail.dimension);
    const [predictPrice, setPredictPrice] = useState(null)
    const { isPending, predictHouse } = usePredictHouse()

    useEffect(() => {
        const {
            bathrooms,
            bedrooms,
            floors,
            houseType,
            interiorStatus,
            legalDocs,
        } = assetDetail.properties || {};
        if (assetDetail.province === HCM)
            predictHouse({
                address: formatAddress(assetDetail),
                area: assetDetail.landArea,
                bathrooms: bathrooms ?? 0,
                bedrooms: bedrooms ?? 0,
                floors: floors ?? 0,
                propertyType: houseType,
                furnitureState: interiorStatus,
                legalStatus: legalDocs,
                propertyFeature: assetDetail.otherInfo?.join(","),
                year: 2026
            }, {
                onSuccess: ({ pricePerM2, totalPriceTy }) => {
                    setPredictPrice({ pricePerM2, totalPriceTy })
                }
            });
    }, []);

    return (
        <Section>
            <div className="p-6">
                {/* Title */}
                <h1 className="text-[2.2rem] font-extrabold text-gray-900 leading-tight mb-4">
                    {title}
                </h1>

                {/* Price Block */}
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-5">
                    <span className="text-[2.6rem] font-black text-rose-600">
                        {formatVietnamMoney(price)}
                    </span>
                    {type === "RENT" && <span className="text-[1.4rem] font-medium text-gray-400">/tháng</span>}
                    <span className="text-[1.5rem] font-semibold text-gray-500">
                        ~ {formatVietnamMoney(price / assetDetail.landArea)}/m²
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-[1.3rem] font-semibold text-gray-700">
                        {square} m²
                    </span>
                </div>

                {/* Location & Time */}
                <div className="flex flex-col gap-2.5 mb-6">
                    <div className="flex items-center gap-2 text-[1.35rem] text-gray-600">
                        <CiLocationOn className="text-[1.8rem] text-gray-400 flex-shrink-0" />
                        <span>{formatAddress(assetDetail)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[1.35rem] text-gray-500">
                        <HiOutlineClock className="text-[1.6rem] text-gray-400 flex-shrink-0" />
                        <span>{getTimeDifferenceFromNow(createdAt)}</span>
                    </div>
                </div>

                {/* AI Price Prediction */}
                {assetDetail.province !== HCM && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <p className="text-[1.35rem] font-semibold text-gray-600">
                            ⚡ Thẩm định giá AI chưa khả dụng tại {assetDetail.province}
                        </p>
                        <p className="text-[1.25rem] mt-1 text-gray-400">
                            Chúng tôi đang mở rộng dữ liệu để sớm hỗ trợ khu vực này.
                        </p>
                    </div>
                )}

                {!isPending && predictPrice?.totalPriceTy && (
                    <div className="mb-6">
                        <PostPredictPrice
                            predictPrice={predictPrice}
                            price={price}
                            province={assetDetail.province}
                            landArea={assetDetail.landArea}
                        />
                    </div>
                )}

                {/* Properties Table */}
                <div className="mb-6">
                    <h2 className="text-[1.6rem] font-bold text-gray-900 mb-4">Thông tin chi tiết</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                        {Object.entries(assetDetail.properties).map(([key, value]) => {
                            const Icon = PROPERTIES[key]?.icon;
                            return (
                                <div
                                    key={key}
                                    className="flex items-center justify-between py-3.5 border-b border-gray-100 last:border-0"
                                >
                                    <span className="flex items-center gap-2.5 text-[1.35rem] text-gray-500">
                                        {Icon && <Icon className="text-[1.6rem] text-gray-400" />}
                                        {PROPERTIES[key]?.label}
                                    </span>
                                    <span className="text-[1.35rem] font-bold text-gray-800">{value}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Description Section */}
            <div className="border-t border-gray-100 p-6">
                <h2 className="text-[1.6rem] font-bold text-gray-900 mb-4">Mô tả chi tiết</h2>

                <div className="inline-flex items-center gap-2.5 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3 mb-5">
                    <HiOutlinePhone className="text-[1.6rem] text-rose-500" />
                    <span className="text-[1.35rem] font-semibold text-rose-700">SĐT Liên hệ: {phoneNumber}</span>
                </div>

                <div className="text-[1.4rem] text-gray-700 leading-relaxed space-y-1">
                    {description.split("\n").map((item, index) =>
                        item.trim() === "" ? <br key={index} /> : <p key={index}>{item}</p>
                    )}
                </div>
            </div>
        </Section>
    )
}

export default PostDetail
