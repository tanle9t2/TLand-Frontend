import { CiClock2, CiLocationOn } from "react-icons/ci"
import Section from "../../ui/Section"
import { caculatePrice, caculateSquare, formatVietnamMoney, getTimeDifferenceFromNow } from "../../utils/helper";
import { IoFlowerOutline } from "react-icons/io5";
import { TbEscalator } from "react-icons/tb";
import { BsBuildings } from "react-icons/bs";
import { RxDimensions } from "react-icons/rx";
import { FaPage4 } from "react-icons/fa";
import { PROPERTIES } from "../../utils/constant";


function PostDetail({ phoneNumber, post }) {
    const { price, type, createdAt, title, description, assetDetail } = post;
    const square = caculateSquare(assetDetail.dimension);
    console.log(description.split("\\n"))
    return (
        <Section>
            <div className="p-5 text-2xl">
                <h2 className="text-3xl font-bold mb-6">
                    {title}
                </h2>
                <p></p>
                <div className="text-red-600 mb-4 font-bold">
                    {formatVietnamMoney(price)}{type === "RENT" && '/tháng'} · {square}m²
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
