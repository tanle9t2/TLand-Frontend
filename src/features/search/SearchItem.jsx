import { FaRegHeart } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { formatVietnamMoney } from "../../utils/helper";
import { Link } from "react-router-dom";

function SearchItem({ item }) {
    const { id, title, price, assetDetail } = item;
    const { province, ward, address, media, landArea } = assetDetail;
    const imageUrl = media?.url || "";

    return (
        <Link
            to={`/post/${id}`}
            className="group flex flex-col h-[180px] sm:flex-row bg-white border border-gray-200 rounded-sm hover:border-rose-300 hover:shadow-sm transition-all duration-200 overflow-hidden shadow-sm"
        >
            <div className="relative w-full sm:w-[240px] sm:shrink-0 aspect-[4/3] sm:aspect-auto sm:h-auto overflow-hidden bg-gray-100">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">No Image</div>
                )}
            </div>


            <div className="flex flex-col flex-1 p-5 justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 leading-[1.5] mb-2 line-clamp-2 transition-color">
                        {title}
                    </h2>

                    <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="text-2xl font-bold text-red-600">
                            {formatVietnamMoney(price)}
                        </span>
                        <span className="text-lg font-medium text-gray-500 flex items-center before:content-['•'] before:mr-3 before:text-gray-300">
                            {landArea} m²
                        </span>
                    </div>

                    <p className="text-lg text-gray-600 flex items-start leading-[1.6] line-clamp-2">
                        <IoLocationOutline className="shrink-0 mr-1.5 mt-0.5 text-gray-400" size={16} />
                        <span>{`${address}, ${ward}, ${province}`}</span>
                    </p>
                </div>

                <div className="flex items-center justify-end mt-4 pt-4 border-t border-gray-100">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:text-red-500 text-gray-400 transition-colors focus:outline-none"
                    >
                        <FaRegHeart size={16} />
                    </button>
                </div>
            </div>
        </Link>
    );
}

export default SearchItem;
