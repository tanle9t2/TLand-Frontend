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
    if (!filter.length) return null;
    return (
        <div className="bg-white text-2xl rounded-lg shadow-sm p-4">
            < div className="flex justify-between text-3xl items-center" >
                <h1 className="font-semibold mb-2">{title}</h1>
                <span className="cursor-pointer" onClick={() => setIsShow(isShow => !isShow)}>
                    {isShow ? <IoIosArrowDown /> : <IoIosArrowUp />}
                </span>
            </ div>

            {isShow && <ul className={`space-y-5 overflow-y-hidden ${isExpand ? "h-full" : "h-fit max-h-[120px]"}`}>
                {filter.map((f, i) => (
                    <li onClick={() => handleOnClick(i)} key={i} className="hover:text-rose-600 cursor-pointer" >
                        {f.name || f.label || f}
                    </li>
                ))}
            </ul>
            }
            {
                filter.length > 4 && isShow &&
                <div className="text-center text-gray-500 cursor-pointer">
                    {isExpand ? <p onClick={() => setIsExpand(false)}>Thu gon</p> : <p onClick={() => setIsExpand(true)} > Mở rộng</p>}
                </div>
            }
        </div >
    )
}

export default SearchFilterItem
