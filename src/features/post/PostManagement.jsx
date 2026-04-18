import { useEffect, useState, useCallback } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import useGetCountStatus from "./useGetCountStatus";
import MiniSpinner from "../../ui/MiniSpinner";
import { POST_STATUS } from "../../utils/constant";
import PostMangeEmpty from "./PostMangeEmpty";
import PaginationStack from "../../ui/PaginationStack";
import useGetPostByStatus from "./useGetPostByStatus";
import { Link, useParams, useSearchParams } from "react-router-dom";
import PostMangementItem from "./PostMangementItem";
import { useDebounce } from "../../hooks/useDebounce";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

function PostManagement() {
    const { status } = useParams();
    const { profile } = useAuth();
    const { avtUrl, firstName, lastName } = profile || {};
    const [activeTab, setActiveTab] = useState(status);
    const { isLoading, counts } = useGetCountStatus();
    const [searParams, setSearhParams] = useSearchParams();
    const [kw, setKw] = useState(searParams.get("kw") || "");
    const debounceKW = useDebounce(kw);
    const paymentStatus = searParams.get("vnp_TransactionStatus");

    const { isLoading: isLoadingPost, posts = [], totalPages, page } = useGetPostByStatus();

    useEffect(() => {
        const currentParams = Object.fromEntries([...searParams]);
        if (debounceKW) {
            currentParams.kw = debounceKW;
        } else {
            delete currentParams.kw;
        }
        setSearhParams(currentParams);
    }, [debounceKW, setSearhParams]);

    useEffect(() => {
        if (!paymentStatus) return;

        if (paymentStatus === "00")
            toast.success("Tạo bài viết và thanh toán thành công");
        else
            toast.error("Thanh toán thất bại. Vui lòng thử lại");

        // Clean URL parameters after showing toast
        searParams.delete("vnp_TransactionStatus");
        searParams.delete("vnp_Amount");
        searParams.delete("vnp_BankCode");
        searParams.delete("vnp_BankTranNo");
        searParams.delete("vnp_CardType");
        searParams.delete("vnp_OrderInfo");
        searParams.delete("vnp_PayDate");
        searParams.delete("vnp_ResponseCode");
        searParams.delete("vnp_TmnCode");
        searParams.delete("vnp_TransactionNo");
        searParams.delete("vnp_TxnRef");
        searParams.delete("vnp_SecureHash");
        setSearhParams(searParams, { replace: true });
    }, /* eslint-disable-next-line */[]);

    const fullName = `${firstName || ''} ${lastName || ''}`.trim() || 'Thành viên';

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <MiniSpinner size={36} />
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-16">

            <div className="bg-white border-b border-gray-200 sticky top-0 md:top-[80px] z-30 shadow-sm">
                <div className="mx-auto">
                    <div className=" px-4 sm:px-6 py-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
                        <div className="flex items-center gap-4">
                            <img
                                src={avtUrl || '/default-avt.png'}
                                alt={fullName}
                                className="w-14 h-14 rounded-full border border-gray-100 object-cover shadow-sm bg-white"
                            />
                            <div>
                                <h1 className="text-[2rem] font-bold text-gray-900 leading-tight">Quản lý tin đăng</h1>
                                <p className="text-[1.3rem] text-gray-500 font-medium">Xin chào, {fullName}</p>
                            </div>
                        </div>


                        <div className="w-full md:w-[320px] relative">
                            <input
                                onChange={(e) => setKw(e.target.value)}
                                value={kw}
                                type="text"
                                placeholder="Tìm kiếm tin đăng..."
                                className="w-full bg-gray-100 border border-transparent rounded-xl py-3 pl-11 pr-4 text-[1.35rem] text-gray-800 placeholder:text-gray-400 focus:bg-white focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10 transition-all outline-none"
                            />
                            <HiOutlineSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-[1.6rem] text-gray-400" />
                        </div>
                    </div>


                    <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] border-b border-white">
                        {counts?.map(({ name, count }) => {
                            const isActive = activeTab === name;
                            return (
                                <Link
                                    key={name}
                                    to={`/my-ads/${name}`}
                                    onClick={() => setActiveTab(name)}
                                >
                                    <div className={`text-center px-4 py-4 text-[1.35rem] font-semibold border-b-2 transition-all flex items-center justify-center gap-2
                    ${isActive
                                            ? 'border-rose-500 text-rose-600 bg-rose-50/50'
                                            : 'border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                                        }`}>
                                        {POST_STATUS[name] || name}
                                        <span className={`px-2 py-0.5 rounded-full text-[1.1rem]
                        ${isActive ? 'bg-rose-100 text-rose-600' : 'bg-gray-100 text-gray-500'}`}>
                                            {count}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>


            <div className="mx-auto pt-8">
                {isLoadingPost ? (
                    <div className="py-20 flex justify-center">
                        <MiniSpinner size={32} />
                    </div>
                ) : (
                    <>
                        {posts?.length > 0 ? (
                            <div className="flex flex-col gap-2 outline-none">
                                {posts.map((post) => (
                                    <PostMangementItem key={post.id} post={post} />
                                ))}

                                {totalPages > 1 && (
                                    <div className="mt-8 flex justify-center">
                                        <PaginationStack totalPage={totalPages} currentPage={page} />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl shadow-sm">
                                <PostMangeEmpty />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default PostManagement;