import { FaHeart, FaRegHeart } from "react-icons/fa"
import { IoLocationOutline } from "react-icons/io5"

function SearchItem({ item }) {
    return (
        <div
            className="bg-white p-4 text-3xl rounded-lg shadow-sm flex overflow-hidden hover:shadow-md transition"
        >
            <img src={item.img} alt={item.title} className="w-[160px] h-[160px] object-cover" />
            <div className="p-4 flex flex-col justify-between flex-1">
                <div>

                    <h2 className="font-semibold text-gray-800 line-clamp-2">{item.title}</h2>
                    <div className="flex items-center text-2xl text-gray-500 mt-1">
                        <span className="text-red-500 font-bold">{item.price}</span>
                        <span className="mx-2">•</span>
                        <span>{item.size}</span>
                    </div>
                    <p className="text-gray-500 text-2xl flex items-center"><span><IoLocationOutline /></span> {item.address}</p>
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
                    {/* <FaHeart fill="red" /> */}
                    <FaRegHeart />
                </div>
            </div>
        </div>
    )
}

export default SearchItem
