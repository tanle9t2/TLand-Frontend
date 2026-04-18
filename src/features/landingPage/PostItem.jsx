import { CiHeart } from "react-icons/ci";
import { formatVietnamMoney, getTimeDifferenceFromNow } from '../../utils/helper';
import { useNavigate } from 'react-router-dom';

function PostItem({ post }) {
    const { id, title, createdAt, price, posterUrl } = post;
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/post/${id}`)}
            className="group cursor-pointer flex flex-col bg-white border border-gray-200 transition-all duration-300 hover:border-gray-900 rounded-sm"
        >

            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 rounded-t-sm">
                <img
                    src={posterUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
            </div>


            <div className="p-4 flex flex-col flex-1">
                {/* Title */}
                <h3 className="text-[15px] font-bold text-gray-900 leading-[1.6] line-clamp-2 h-[48px] mb-3 group-hover:text-black transition-colors">
                    {title}
                </h3>

                {/* Price */}
                <div className="mt-auto">
                    <span className="text-[18px] font-bold text-red-600 block mb-2">
                        {formatVietnamMoney(price)}
                    </span>

                    {/* Meta row */}
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {getTimeDifferenceFromNow(createdAt)}
                        </span>
                        <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                            <CiHeart size={18} className="text-gray-600" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostItem;
