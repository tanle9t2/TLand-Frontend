import { CiClock2, CiLocationOn } from "react-icons/ci"
import Section from "../../ui/Section"
import { getTimeDifferenceFromNow } from "../../utils/helper";
import { IoFlowerOutline } from "react-icons/io5";
import { TbBath, TbEscalator } from "react-icons/tb";
import { BsBuildings, BsDoorOpen } from "react-icons/bs";
import { RxDimensions } from "react-icons/rx";
import { IoBedOutline } from "react-icons/io5";
import { RiContractFill } from "react-icons/ri";
import { LuPackage2 } from "react-icons/lu";

const PROPERTIES = {
    bedrooms: {
        icon: <IoBedOutline />,
        label: "Số phòng ngủ: "
    },
    floors: {
        icon: <TbEscalator />,
        label: "Tầng:"
    },
    bathrooms: {
        icon: <TbBath />,
        label: "Số phòng tắm: "
    },
    legalDocs: {
        icon: <RiContractFill />,
        label: "Thông tin pháp lý"
    },
    mainDirection: {
        icon: <BsDoorOpen />,
        label: "Hướng cửa: "
    },
    houseType: {
        icon: <BsBuildings />,
        label: "Loại hình căn hộ: "
    },
    dimension: {
        icon: <RxDimensions />,
        label: "Diện tích: "
    },
    interiorStatus: {
        icon: <LuPackage2 />,
        label: "Nội thất: "
    },
    hasGarden: {
        icon: <IoFlowerOutline />,
        label: "Sân vườn: "
    }
}
function AssetDetail({ asset }) {

    const { createdAt, address, ward, province, properties, otherInfo } = asset;
    return (
        <Section>
            <div className="p-5 text-2xl">
                <div className="text-gray-600 flex items-center">
                    <span className="mr-2"><CiLocationOn /></span>
                    {`${address}, ${ward}, ${province}`}
                </div>
                <div className="text-gray-600 flex items-center">
                    <span className="mr-2"><CiClock2 /></span>
                    {getTimeDifferenceFromNow(createdAt)}
                </div>

                <ul className="text-2xl pt-4">
                    {Object.entries(properties).map(([key, value]) => (
                        <li key={key} className="grid py-3 grid-cols-[24rem_auto] border-b border-gray-300">
                            <span className="flex items-center gap-2">
                                {PROPERTIES[key]?.icon}
                                {PROPERTIES[key]?.label}
                            </span>
                            <span className="font-bold">{value}</span>
                        </li>
                    ))}
                </ul>
                {otherInfo && <div className="my-5">
                    <h1 className="text-3xl font-bold">Các thông tin khác</h1>
                    <ul className="text-2xl list-disc pl-5 mt-5">
                        {otherInfo.map(info => <li>{info}</li>)}
                    </ul>
                </div>}
            </div>
        </Section >
    )
}

export default AssetDetail
