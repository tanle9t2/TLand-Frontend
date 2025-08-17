import { FaHeart, FaRegHeart } from "react-icons/fa"
import { IoLocationOutline } from "react-icons/io5"
import { formatVietnamMoney } from "../../utils/helper";
import { Link } from "react-router-dom";

function SearchItem({ item }) {
    const { id, title, price, assetDetail } = item;
    const { province, ward, address, media, landArea } = assetDetail;
    return (
        <Link to={`/post/${id}`}
            className="bg-white p-4 text-3xl rounded-lg shadow-sm flex overflow-hidden hover:shadow-md transition"
        >
            <img src={media.url} alt={title} className="w-[160px] h-[160px] object-cover" />
            <div className="p-4 flex flex-col justify-between flex-1">
                <div className="space-y-2">
                    <div className="flex">
                        <h2 className="font-semibold w-0 flex-1 text-gray-800 line-clamp-2">{title}</h2>
                    </div>
                    <div className="flex items-center text-2xl text-gray-500 mt-1">
                        <span className="text-red-500 font-bold">{formatVietnamMoney(price)}</span>
                        <span className="mx-2">•</span>
                        <span>{landArea} m<sup>2</sup></span>
                    </div>
                    <p className="text-gray-500 text-2xl flex items-center"><span><IoLocationOutline /></span>  {`${address}, ${ward}, ${province}`}</p>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-lg space-x-2">
                        <img src="https://tland-bucket.s3.us-east-1.amazonaws.com/pain.png" className="w-[20px] h-[20px] rounded-[50%]" />
                        <div>
                            <span>{item.author}</span>
                            <span className="mx-1">•</span>
                            <span>{item.authorPosts}</span>
                        </div>
                    </div>
                    <FaRegHeart />
                </div>
            </div>
        </Link>
    )
}

export default SearchItem
