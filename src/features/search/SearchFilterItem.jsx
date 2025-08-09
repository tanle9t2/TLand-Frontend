import { useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"

function SearchFilterItem({ title, filter }) {
    const [isShow, setIsShow] = useState(true)
    const [isExpand, setIsExpand] = useState(false);
    return (
        <div className="bg-white text-2xl rounded-lg shadow-sm p-4">
            < div className="flex justify-between text-3xl items-center" >
                <h1 className="font-semibold mb-2">{title}</h1>
                <span className="cursor-pointer" onClick={() => setIsShow(isShow => !isShow)}>
                    {isShow ? <IoIosArrowDown /> : <IoIosArrowUp />}
                </span>
            </ div>

            {isShow && <ul className={`space-y-5 overflow-y-hidden ${isExpand ? "h-full" : " h-[120px]"}`}>
                {filter.map((f, i) => (
                    <li key={i} className="hover:text-rose-600 cursor-pointer">
                        {f.name}
                    </li>
                ))}
            </ul>
            }
            <div className="text-center text-gray-500 cursor-pointer">
                {isExpand ? <p onClick={() => setIsExpand(false)}>Thu gon</p> : <p onClick={() => setIsExpand(true)} > Mở rộng</p>}
            </div>
        </div >
    )
}

export default SearchFilterItem
