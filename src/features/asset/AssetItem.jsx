import { FaMapMarkerAlt, FaEdit, FaTrash } from "react-icons/fa";
import { convertDate } from "../../utils/helper";
import { Link } from "react-router-dom";
function AssetItem({ asset }) {
    const { id, usableArea, landArea, address, ward, province, createdAt, imageUrl } = asset;
    return (
        <div className="cursor-pointer my-5 overflow-hidden bg-white h-[140px] rounded-2xl shadow-lg flex border hover:shadow-xl transition">
            <img
                src={imageUrl}
                alt={asset.name}
                className="w-full md:w-64 h-52 md:h-auto object-cover"
            />
            <div className="text-xl p-4">
                <div>
                    <p><span className="text-2xl font-bold">Mã tài sản: </span>{id}</p>
                    <div className="flex items-start mb-2">
                        <FaMapMarkerAlt className="mt-1 mr-2 shrink-0 text-rose-600" />
                        <p className="text-rose-600 text-2xl truncate w-0 flex-1">
                            {`${address}, ${ward}, ${province}`}
                        </p>
                    </div>
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
