import { useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { useSearchParams } from "react-router-dom";

function SearchFilterItem({ title, params, filter }) {
    const [isShow, setIsShow] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams()
    const [isExpand, setIsExpand] = useState(false);

    function handleOnClick(i) {
        if (params === "price") {
            searchParams.delete("minPrice");
            searchParams.delete("maxPrice");
            if (filter[i].minPrice)
                searchParams.set("minPrice", filter[i].minPrice)
            if (filter[i].maxPrice)
                searchParams.set("maxPrice", filter[i].maxPrice)
        } else {
            searchParams.set(params, filter[i].name || filter.label || filter[i])
        }
        setSearchParams(searchParams)
    }

    if (!filter || !filter.length) return null;


    const isActive = (item) => {
        if (params === "price") {
            return searchParams.get("minPrice") == item.minPrice && searchParams.get("maxPrice") == item.maxPrice;
        }
        return searchParams.get(params) === (item.name || item.label || item);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm">
            <button
                className="w-full flex justify-between items-center px-4 py-3 focus:outline-none hover:bg-gray-50 transition-colors"
                onClick={() => setIsShow(!isShow)}
            >
                <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
                <span className="text-gray-500">
                    {isShow ? <IoIosArrowUp size={16} /> : <IoIosArrowDown size={16} />}
                </span>
            </button>

            {isShow && (
                <div className="px-4 pb-4">
                    <ul className={`space-y-2 overflow-hidden transition-all duration-300 ${isExpand ? "max-h-[1000px]" : "max-h-[150px]"}`}>
                        {filter.map((f, i) => {
                            const active = isActive(f);
                            return (
                                <li
                                    onClick={() => handleOnClick(i)}
                                    key={i}
                                    className={`text-xl cursor-pointer px-2 py-1.5 rounded-sm transition-colors flex items-center ${active
                                        ? "bg-gray-100 font-bold text-red-600"
                                        : "hover:bg-gray-50 hover:text-red-600 text-gray-700 font-medium"
                                        }`}
                                >
                                    {f.name || f.label || f}
                                </li>
                            );
                        })}
                    </ul>

                    {filter.length > 5 && (
                        <button
                            onClick={() => setIsExpand(!isExpand)}
                            className="mt-3 text-xl cursor-pointer font-bold text-gray-500 hover:text-gray-800 focus:outline-none w-full text-center pt-2 border-t border-gray-100 flex items-center justify-center"
                        >
                            {isExpand ? "Thu gọn" : "Xem thêm"}
                            <span className="ml-1">
                                {isExpand ? <IoIosArrowUp size={12} /> : <IoIosArrowDown size={12} />}
                            </span>
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchFilterItem;
