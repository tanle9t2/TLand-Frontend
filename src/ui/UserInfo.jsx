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
    const { logout, profile } = useAuth()
    const navigate = useNavigate()
    function handleLogout() {
        logout()
    }
    const { id, avtUrl, firstName, lastName } = profile || {};
    console.log(avtUrl)
    return (
        <div
            onMouseEnter={() => setIsMenuOpen(true)}
            onMouseLeave={() => {
                setIsMenuOpen(false);
            }}
            className="flex items-center relative">
            <img
                src={avtUrl || `/public/default-avt.png`}
                alt={`${firstName} ${lastName}`}
                className="w-10 h-10 rounded-full object-cover"
            />
            <span className="ml-3 text-xl font-medium text-gray-800">{`${firstName} ${lastName}`}</span>
            {isMenuOpen && <div className="absolute z-20 top-[30px] w-120 right-0 mx-auto bg-white shadow-lg rounded-lg
                    before:content-[''] before:absolute before:-top-3 before:right-4 before:w-[84px]
                    before:border-12 before:border-transparent before:border-b-white before:z-[-1]">
                {/* Header */}
                <div className="flex items-center justify-between p-4 mb-4">
                    <div className="flex items-center">
                        <img
                            onClick={() => navigate(`/user/${id}`)}
                            src={avtUrl || `/public/default-avt.png`}
                            alt={`${firstName} ${lastName}`}
                            className="w-[48px] h-[48px] rounded-[50%] mr-2 cursor-pointer"
                        />
                        <div>
                            <h2 className="text-3xl font-semibold">{`${firstName} ${lastName}`}</h2>
                        </div>
                    </div>

                </div>

                <div className="pt-2">
                    <div className="p-4 bg-gray-200">
                        <h3 className=" text-gray-700 font-bold">Tiện ích</h3>
                    </div>
                    <ul className="space-y-2">
                        <Link to="/asset">
                            <li className="flex items-center cursor-pointer hover:bg-gray-100 px-2 py-4 rounded">
                                <span className="mr-2"><BiBuildingHouse /></span> Xem tài sản
                            </li>
                        </Link>
                        <Link to="/my-ads">
                            <li className="flex items-center cursor-pointer hover:bg-gray-100 px-2 py-4 rounded">
                                <span className="mr-2"><BiBuildingHouse /></span> Quản lý tin đăng
                            </li>
                        </Link>
                        <Link to="/user/setting">
                            <li className="flex items-center cursor-pointer hover:bg-gray-100 px-2 py-4 rounded">
                                <span className="mr-2"><CiSettings /></span> Chỉnh sửa tài khoản
                            </li>
                        </Link>
                        <li className="flex items-center cursor-pointer hover:bg-gray-100 px-2 py-4 rounded">
                            <span className="mr-2"><FaRegHeart /></span> Tin đăng đã lưu
                        </li>
                    </ul>

                    <div className="p-4 bg-gray-200">
                        <h3 className=" text-gray-700 font-bold">Dịch vụ khác</h3>
                    </div>
                    <ul className="space-y-2">
                        <li className="flex items-center cursor-pointer hover:bg-gray-100 px-2 py-4 rounded">
                            <span className="mr-2"><RiVipDiamondLine /></span> Gói PRO Mới
                        </li>
                        <li className="flex items-center cursor-pointer hover:bg-gray-100 px-2 py-4 rounded">
                            <span className="mr-2"><MdHistory /></span> Lịch sử giao dịch
                        </li>
                    </ul>
                    <div className="p-4 bg-gray-200">
                        <h3 className=" text-gray-700 font-bold">Khác</h3>
                    </div>
                    <ul className="space-y-2">
                        <li onClick={() => handleLogout()} className="flex items-center cursor-pointer hover:bg-gray-100 px-2 py-4 rounded">
                            <span className="mr-2"><CiLogout /></span> Đăng xuất
                        </li>
                    </ul>
                </div>
            </div>}
        </div>
    )
}

export default UserInfo
