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
import { Link } from "react-router-dom";
import useGetCategories from "../features/asset/useGetCategories"

const menu = [
    {
        label: "Mua bán",
        icon: <FaHome />,
        param: "SELL"
    },
    {
        label: "Cho thuê",
        icon: <FaMoneyCheckAlt />,
        param: "RENT"
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
];

function Menu() {
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isLoading, categories } = useGetCategories()
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
                                <Link to={`/search?type=${item.param}`}>
                                    <div className="flex items-center gap-2">
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </div>
                                </Link>

                                {item.subMenu && <FiChevronRight className="text-gray-400" />}
                                {(item.label === "Mua bán" || item.label === "Cho thuê") && openMenuIndex === index && (
                                    <ul className="absolute left-full top-0 ml-1 bg-white shadow-lg rounded p-2 w-56 z-10">
                                        {categories?.map(({ id, name }) => (
                                            <Link to={`/search?type=${item.param}&category=${id}`} key={id} >
                                                <li className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                                                    {name}
                                                </li>
                                            </Link>
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
