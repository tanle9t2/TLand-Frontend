import { CiClock2, CiLocationOn } from "react-icons/ci"
import Section from "../../ui/Section"
import { getTimeDifferenceFromNow } from "../../utils/helper";

import { PROPERTIES } from "../../utils/constant";

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
                    {Object.entries(properties).map(([key, value]) => {
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
