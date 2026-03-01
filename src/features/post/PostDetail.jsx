import { CiClock2, CiLocationOn } from "react-icons/ci"
import Section from "../../ui/Section"
import { caculatePrice, caculateSquare, formatVietnamMoney, getTimeDifferenceFromNow } from "../../utils/helper";

import { PROPERTIES } from "../../utils/constant";

import usePredictHouse from "./usePredictHouse";
import { useEffect, useState } from "react";


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

        predictHouse({
            address: assetDetail.address,
            area: assetDetail.landArea,
            bathrooms,
            bedrooms,
            floors,
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
            <div className="p-5 text-2xl">
                <h2 className="text-3xl font-bold mb-6">
                    {title}
                </h2>
                <div className="bg-white tex space-y-4">
                    <div className="">
                        <div className="text-4xl font-bold  text-red-600">
                            {formatVietnamMoney(price)}
                            {type === "RENT" && <span className="text-xl font-medium"> /tháng</span>}
                            <p className="text-3xl text-black">
                                {formatVietnamMoney(price / assetDetail.landArea)}/m² • {square}m²
                            </p>
                        </div>


                    </div>
                    {!isPending && predictPrice?.totalPriceTy && (
                        <div className="bg-gray-50 text-3xl p-4 space-y-3">

                            <div className="font-medium">
                                Giá tham khảo từ hệ thống: {predictPrice?.pricePerM2.toFixed(2)} triệu/m²
                            </div>

                            {(() => {
                                const predictedPrice = predictPrice.totalPriceTy * 1_000_000_000
                                const diffPercent = ((price - predictedPrice) / predictedPrice) * 100
                                const absPercent = Math.abs(diffPercent).toFixed(1)

                                const percentWidth = Math.min(Math.abs(diffPercent), 30)

                                let color = "bg-yellow-400"
                                let textColor = "text-yellow-600"
                                let message = "Giá đang trong biên độ ±15% so với mức tham khảo."

                                if (diffPercent > 15) {
                                    color = "bg-red-500"
                                    textColor = "text-red-600"
                                    message = `Giá cao hơn mức tham khảo khoảng ${absPercent}%.`
                                }

                                if (diffPercent < -15) {
                                    color = "bg-green-500"
                                    textColor = "text-green-600"
                                    message = `Giá thấp hơn mức tham khảo khoảng ${absPercent}%.`
                                }

                                return (
                                    <div className="space-y-2">
                                        {/* Thanh hiển thị độ chênh lệch */}
                                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${color} transition-all duration-500`}
                                                style={{ width: `${percentWidth}%` }}
                                            />
                                        </div>

                                        <div className={`font-medium ${textColor}`}>
                                            {message}
                                        </div>

                                        <div className="text-2xl text-gray-400">
                                            *Lưu ý: Mức giá tham khảo có sai số khoảng ±15% tùy theo biến động thị trường.
                                        </div>
                                    </div>
                                )
                            })()}
                        </div>
                    )}
                </div>
                <div className="text-gray-600 flex items-center">
                    <span className="mr-2"><CiLocationOn /></span>
                    {`${assetDetail.address}, ${assetDetail.ward}, ${assetDetail.province}`}
                </div>
                <div className="text-gray-600 flex items-center">
                    <span className="mr-2"><CiClock2 /></span>
                    {getTimeDifferenceFromNow(createdAt)}
                </div>

                <ul className="text-2xl pt-4">
                    {Object.entries(assetDetail.properties).map(([key, value]) => {
                        const Icon = PROPERTIES[key]?.icon;
                        return (
                            <li
                                key={key}
                                className="grid py-3 grid-cols-[24rem_auto] border-b border-gray-300"
                            >
                                <span className="flex items-center gap-2">
                                    {Icon && <Icon />}
                                    {PROPERTIES[key]?.label}
                                </span>
                                <span className="font-bold">{value}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="text-2xl p-5 pt-4">
                <h1 className="font-semibold text-3xl mb-2">Mô tả chi tiết</h1>
                <div className="py-4 px-4 my-4 flex bg-gray-200 w-fit items-center">
                    <h3 className="font-semibold">SĐT Liên hệ: </h3>
                    <p className="ml-4">{phoneNumber}</p>
                </div>
                {description.split("\n").map((item, index) => item.trim() === "" ? <br /> : <p key={index}>{item}</p>)}
            </div>

        </Section >
    )
}

export default PostDetail
