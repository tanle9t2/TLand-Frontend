import { useState } from "react";
import {
    FaHome,
    FaChartLine,
    FaUserTie,
    FaProjectDiagram,
    FaMoneyCheckAlt,
} from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { HiOutlineBars3 } from "react-icons/hi2";

const menu = [
    {
        label: "Mua bán",
        icon: <FaHome />,
        subMenu: ["Căn hộ/ Chung cư", "Nhà ở", "Đất", "Văn phòng, Mặt bằng kinh doanh"],
    },
    {
        label: "Cho thuê",
        icon: <FaMoneyCheckAlt />,
        subMenu: ["Căn hộ", "Nhà nguyên căn", "Phòng trọ"],
    },
    {
        label: "Dự án",
        icon: <FaProjectDiagram />,
    },
    {
        label: "Tìm môi giới",
        icon: <FaUserTie />,
    },
    {
        label: "Biểu đồ biến động giá",
        icon: <FaChartLine />,
    },
    {
        label: "Vay mua nhà",
        icon: <FaMoneyCheckAlt />,
    },
];

function Menu() {
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div
            className="relative text-3xl inline-block"
            onMouseEnter={() => setIsMenuOpen(true)}
            onMouseLeave={() => {
                setIsMenuOpen(false);
                setOpenMenuIndex(null);
            }}
        >
            <p className="flex items-center cursor-pointer font-bold"><span className="mr-3"><HiOutlineBars3 /></span> Danh mục</p>

            {isMenuOpen && (
                <div
                    className="absolute z-20 mt-2 w-64
                    before:content-[''] before:absolute before:-top-2 before:left-4 before:w-[64px]
                    before:border-8 before:border-transparent before:border-b-white before:z-[-1]"
                >
                    <ul className="bg-white shadow-lg rounded p-2 w-full">
                        {menu.map((item, index) => (
                            <li
                                key={index}
                                onMouseEnter={() => setOpenMenuIndex(index)}
                                className="relative group flex items-center justify-between p-2 hover:bg-gray-100 rounded cursor-pointer"
                            >
                                <div className="flex items-center gap-2">
                                    {item.icon}
                                    <span>{item.label}</span>
                                </div>

                                {item.subMenu && <FiChevronRight className="text-gray-400" />}

                                {item.subMenu && openMenuIndex === index && (
                                    <ul className="absolute left-full top-0 ml-1 bg-white shadow-lg rounded p-2 w-56 z-10">
                                        {item.subMenu.map((sub, i) => (
                                            <li key={i} className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                                                {sub}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Menu;
