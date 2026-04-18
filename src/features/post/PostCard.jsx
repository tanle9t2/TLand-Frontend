import { CiHeart } from "react-icons/ci";
import { caculateSquare, formatVietnamMoney, getTimeDifferenceFromNow } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';

function PostCard({ post }) {
    const { id, title, properties, type, createdAt, price, assetDetail } = post;
    const navigate = useNavigate();
    const square = caculateSquare(assetDetail.dimension);
    const imageUrl = assetDetail?.contents[0]?.url || "";

    return (
        <div
            onClick={() => navigate(`/post/${id}`)}
            className="group cursor-pointer flex flex-col bg-white border border-gray-200 transition-all duration-300 hover:border-gray-900 rounded-sm w-full h-full"
        >
            {/* Image Container with strict 4:3 aspect ratio and zoom effect */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 rounded-t-sm">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col flex-1">

                <h3 className="text-[15px] font-bold text-gray-900 leading-[1.6] line-clamp-2 h-[48px] mb-2 group-hover:text-black transition-colors">
                    {title}
                </h3>

                {/* Properties Description */}
                <p className="text-sm text-gray-600 mb-2 truncate">
                    {properties}
                </p>

                {/* Price & Meta Metrics */}
                <div className="my-3">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="text-[18px] font-bold text-red-600">
                            {type === "RENT" ? `${formatVietnamMoney(price)}/tháng` : `${formatVietnamMoney(price)}`}
                        </span>
                        {type === "SELL" && (
                            <span className="text-sm font-medium text-gray-500">
                                {formatVietnamMoney(Math.ceil(price / square))}/m²
                            </span>
                        )}
                        <span className="text-sm font-medium text-gray-500 flex items-center before:content-['•'] before:mr-3 before:text-gray-300">
                            {square}m²
                        </span>
                    </div>
                </div>

                {/* Location row */}
                <div className="mb-4">
                    <p className="text-[14px] font-semibold text-gray-800 line-clamp-2 leading-relaxed">
                        {`${assetDetail.address}, ${assetDetail.ward}, ${assetDetail.province}`}
                    </p>
                </div>

                {/* Footer row */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {getTimeDifferenceFromNow(createdAt)}
                    </span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors focus:outline-none"
                    >
                        <CiHeart size={18} className="text-gray-600" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PostCard;
