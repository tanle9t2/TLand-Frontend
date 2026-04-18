import { useState } from "react";
import { FaHome, FaChartLine, FaUserTie, FaProjectDiagram, FaMoneyCheckAlt } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { HiBars3 } from "react-icons/hi2";
import { Link } from "react-router-dom";
import useGetCategories from "../features/asset/useGetCategories";

const menu = [
    {
        label: "Mua bán",
        icon: <FaHome className="text-[1.6rem] text-rose-500" />,
        param: "SELL"
    },
    {
        label: "Cho thuê",
        icon: <FaMoneyCheckAlt className="text-[1.6rem] text-sky-500" />,
        param: "RENT"
    },
    {
        label: "Dự án",
        icon: <FaProjectDiagram className="text-[1.6rem] text-emerald-500" />,
    },
    {
        label: "Tìm môi giới",
        icon: <FaUserTie className="text-[1.6rem] text-amber-500" />,
    },
    {
        label: "Biểu đồ biến động giá",
        icon: <FaChartLine className="text-[1.6rem] text-indigo-500" />,
    },
];

function Menu() {
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { categories } = useGetCategories();

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsMenuOpen(true)}
            onMouseLeave={() => {
                setIsMenuOpen(false);
                setOpenMenuIndex(null);
            }}
        >
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200 ${isMenuOpen ? 'bg-rose-50 text-rose-600' : 'text-gray-700 hover:bg-gray-100'}`}>
                <HiBars3 className="text-[2.2rem]" />
                <span className="text-[1.4rem] font-bold hidden md:inline">Danh mục</span>
            </div>

            {isMenuOpen && (
                <div className="absolute left-0 top-full pt-3 z-[60]">
                    <ul className="bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 rounded-2xl w-[260px] py-2 overflow-visible">
                        {menu.map((item, index) => {
                            const hasSubMenu = item.label === "Mua bán" || item.label === "Cho thuê";
                            return (
                                <li
                                    key={index}
                                    onMouseEnter={() => setOpenMenuIndex(index)}
                                    className="relative group px-2"
                                >
                                    <Link to={`/search?type=${item.param}`}>
                                        <div className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-rose-50/60 cursor-pointer transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all duration-200">
                                                    {item.icon}
                                                </div>
                                                <span className="text-[1.35rem] font-medium text-gray-700 group-hover:text-rose-600 transition-colors">{item.label}</span>
                                            </div>
                                            {hasSubMenu && <FiChevronRight className="text-[1.6rem] text-gray-400 group-hover:text-rose-500 transition-colors" />}
                                        </div>
                                    </Link>

                                    {hasSubMenu && openMenuIndex === index && (
                                        <ul className="absolute left-full top-0 ml-2 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 rounded-2xl w-[220px] py-2 z-[60]">
                                            {categories?.map(({ id, name }) => (
                                                <Link to={`/search?type=${item.param}&category=${id}`} key={id}>
                                                    <li className="px-3">
                                                        <div className="px-4 py-2.5 rounded-xl hover:bg-rose-50 text-[1.35rem] font-medium text-gray-700 hover:text-rose-600 cursor-pointer transition-colors">
                                                            {name}
                                                        </div>
                                                    </li>
                                                </Link>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Menu;
