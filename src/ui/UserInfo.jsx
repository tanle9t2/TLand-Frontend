import { useState } from "react";
import { RiVipDiamondLine } from "react-icons/ri";
import { MdHistory } from "react-icons/md";
import { BiBuildingHouse } from "react-icons/bi";
import { CiLogout, CiSettings } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function UserInfo() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { logout, profile } = useAuth();
    const navigate = useNavigate();

    const { id, avtUrl, firstName, lastName } = profile || {};
    const fullName = `${firstName || ''} ${lastName || ''}`.trim() || "Người dùng";

    return (
        <div
            onMouseEnter={() => setIsMenuOpen(true)}
            onMouseLeave={() => setIsMenuOpen(false)}
            className="relative flex items-center"
        >
            <div className={`flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full cursor-pointer transition-all duration-200 ${isMenuOpen ? 'bg-gray-100' : 'hover:bg-gray-50'}`}>
                <img
                    src={avtUrl || `/default-avt.png`}
                    alt={fullName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <span className="text-[1.35rem] font-medium text-gray-800 hidden md:block">{fullName}</span>
            </div>

            {isMenuOpen && (
                <div className="absolute z-[60] top-full pt-3 right-0 w-[280px]">
                    <div className="bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 rounded-2xl overflow-hidden flex flex-col">

                        {/* Header */}
                        <div
                            onClick={() => navigate(`/user/${id}`)}
                            className="flex items-center gap-4 p-5 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                        >
                            <img
                                src={avtUrl || `/default-avt.png`}
                                alt={fullName}
                                className="w-12 h-12 rounded-full object-cover border border-gray-200"
                            />
                            <div className="flex flex-col">
                                <span className="text-[1.5rem] font-bold text-gray-900 leading-tight line-clamp-1">{fullName}</span>
                                <span className="text-[1.2rem] text-rose-500 font-medium mt-0.5">Xem hồ sơ cá nhân</span>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2 space-y-1">
                            <Link to="/asset" className="block">
                                <div className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-rose-50 text-gray-700 hover:text-rose-600 transition-colors group">
                                    <BiBuildingHouse className="text-[1.6rem] text-gray-400 group-hover:text-rose-500 transition-colors" />
                                    <span className="text-[1.3rem] font-medium">Tài sản của tôi</span>
                                </div>
                            </Link>
                            <Link to="/my-ads/SHOW" className="block">
                                <div className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-rose-50 text-gray-700 hover:text-rose-600 transition-colors group">
                                    <BiBuildingHouse className="text-[1.6rem] text-gray-400 group-hover:text-rose-500 transition-colors" />
                                    <span className="text-[1.3rem] font-medium">Quản lý tin đăng</span>
                                </div>
                            </Link>
                            <Link to="/user/setting" className="block">
                                <div className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-rose-50 text-gray-700 hover:text-rose-600 transition-colors group">
                                    <CiSettings className="text-[1.8rem] text-gray-400 group-hover:text-rose-500 transition-colors" />
                                    <span className="text-[1.3rem] font-medium">Cài đặt tài khoản</span>
                                </div>
                            </Link>
                            <div className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-rose-50 text-gray-700 hover:text-rose-600 transition-colors group">
                                <FaRegHeart className="text-[1.4rem] text-gray-400 group-hover:text-rose-500 transition-colors" />
                                <span className="text-[1.3rem] font-medium">Tin đăng đã lưu</span>
                            </div>
                        </div>

                        <div className="h-[1px] bg-gray-100 mx-4" />

                        <div className="p-2 space-y-1">
                            <div className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-amber-50 text-gray-700 hover:text-amber-600 transition-colors group">
                                <RiVipDiamondLine className="text-[1.6rem] text-gray-400 group-hover:text-amber-500 transition-colors" />
                                <span className="text-[1.3rem] font-medium">Nâng cấp gói PRO</span>
                            </div>
                            <div className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors group">
                                <MdHistory className="text-[1.6rem] text-gray-400 group-hover:text-blue-500 transition-colors" />
                                <span className="text-[1.3rem] font-medium">Lịch sử giao dịch</span>
                            </div>
                        </div>

                        <div className="h-[1px] bg-gray-100 mx-4" />

                        <div className="p-2">
                            <div
                                onClick={() => logout()}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-red-50 text-gray-700 hover:text-red-600 transition-colors group"
                            >
                                <CiLogout className="text-[1.8rem] text-gray-400 group-hover:text-red-500 transition-colors" />
                                <span className="text-[1.3rem] font-medium flex-1">Đăng xuất</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserInfo;
