import { useState } from "react";
import { IoMdMore } from "react-icons/io";
import { HiOutlineSearch } from "react-icons/hi";

import useGetCountStatus from "./useGetCountStatus";
import MiniSpinner from "../../ui/MiniSpinner";
import { POST_STATUS } from "../../utils/constant";
import PostMangeEmpty from "./PostMangeEmpty";
import PaginationStack from "../../ui/PaginationStack"
import useGetPostByStatus from "./useGetPostByStatus";
import { convertDate, formatVietnamMoney } from "../../utils/helper";
import { Link, useParams } from "react-router-dom";
import PostMangementItem from "./PostMangementItem";

function PostManagement() {
    const { status } = useParams();
    const [activeTab, setActiveTab] = useState(status);
    const { isLoading, counts } = useGetCountStatus();
    const { isLoading: isLoadingPost, posts, totalPages, page } = useGetPostByStatus();
    if (isLoading || isLoadingPost) return <MiniSpinner />
    return (
        <div className="bg-white min-h-screen">

            <div className="p-4">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold mb-1">Quản lý tin</h2>

                    </div>
                </div>
                <div className="flex justify-between mb-6">
                    <div className="flex items-center">
                        <img
                            src="https://tland-bucket.s3.us-east-1.amazonaws.com/pain.png"
                            alt="User Avatar"
                            className="w-[48px] h-[48px] rounded-[50%] mr-2"
                        />
                        <span className="ml-3 text-2xl font-bold text-gray-800">Lê Tân</span>
                    </div>
                    <div className="flex text-2xl  items-center gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm tin đăng của bạn..."
                                className="pl-10 pr-20 py-5 border border-gray-200 rounded-lg focus:outline-none"
                            />
                            <HiOutlineSearch className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-500" />
                        </div>
                    </div>
                </div>
            </div>
            <ul className="grid grid-cols-7 border-y border-gray-200 justify-around text-xl font-medium">
                {counts.map(({ name, count }) => (
                    <Link key={name} to={`/my-ads/${name}`}>
                        <li
                            key={name}
                            className={`text-center font-bold  py-8 cursor-pointer hover:bg-gray-100 ${activeTab === name
                                && "text-rose-600"
                                }`}
                            onClick={() => setActiveTab(name)}
                        >
                            {POST_STATUS[name]} ({count})
                        </li>
                    </Link>
                ))}
            </ul>
            <div className="flex flex-col items-center space-y-5 pb-5">
                {posts.map((post) => <PostMangementItem post={post} />)}
                <PaginationStack totalPage={totalPages} currentPage={page} />
            </div>
            {!posts.length && <PostMangeEmpty />}
        </div >
    );
}
export default PostManagement;