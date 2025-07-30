import { CiClock2, CiLocationOn } from "react-icons/ci"
import Section from "../../ui/Section"
import { getTimeDifferenceFromNow } from "../../utils/helper";
import { IoFlowerOutline } from "react-icons/io5";
import { TbEscalator } from "react-icons/tb";
import { BsBuildings } from "react-icons/bs";
import { RxDimensions } from "react-icons/rx";

const PROPERTIES = {
    floors: {
        icon: <TbEscalator />,
        label: "Tầng: "
    },
    style: {
        icon: <BsBuildings />,
        label: "Loại hình căn hộ: "
    },
    dimension: {
        icon: <RxDimensions />,
        label: "Diện tích: "
    },
    hasGarden: {
        icon: <IoFlowerOutline />,
        label: "Sân vườn: "
    }
}
function AssetDetail({ asset }) {

    const { createdAt, address, ward, province, properties } = asset;
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
            </div>
        </Section >
    )
}

export default AssetDetail
