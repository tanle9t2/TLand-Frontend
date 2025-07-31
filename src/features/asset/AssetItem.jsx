import { FaMapMarkerAlt, FaEdit, FaTrash } from "react-icons/fa";
import { convertDate } from "../../utils/helper";
import { Link } from "react-router-dom";
function AssetItem({ asset }) {
    const { usableArea, landArea, address, ward, province, createdAt, imageUrl } = asset;
    return (
        <div className="cursor-pointer my-5 bg-white h-[140px] rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden border hover:shadow-xl transition">
            <img
                src={imageUrl}
                alt={asset.name}
                className="w-full md:w-64 h-52 md:h-auto object-cover"
            />
            <div className="flex flex-col justify-between p-4 flex-1">
                <div>
                    <p className="flex items-center text-rose-600 text-2xl mb-2 overflow-hidden truncate">
                        <FaMapMarkerAlt className="mr-2 shrink-0 text-rose-600" />
                        {`${address}, ${ward}, ${province}`}
                    </p>
                    <p className="text-xl text-gray-600">Ngày đăng: {convertDate(createdAt)}</p>

                    <div className="grid grid-cols-2 gap-5 mt-5">
                        <p className="text-xl text-gray-600">Diện tích đất: {landArea} m<sup>2</sup></p>
                        <p className="text-xl text-gray-600">Diện tích sử dụng: {usableArea}  m<sup>2</sup></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssetItem
