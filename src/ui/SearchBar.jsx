import { FaSearch } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import Select from 'react-select'
import useGetProvince from "../features/asset/useGetProvince"
import { useState } from "react";
function SearchBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [kw, setKw] = useState(searchParams.get("keyword") || "");
  const { isLoading, provinces } = useGetProvince()
  function handleOnKeyDown(e) {
    if (e.key === "Enter") {
      search(e)
    }
  }
  function search() {
    navigate(`/search?keyword=${encodeURIComponent(kw)}&type=SELL`);
  }
  const locOption = provinces?.map(p => ({
    value: p.name,
    label: p.name
  }))
  const selectedItem = searchParams.get("province") || null
  const option = locOption?.find(o => o.value === selectedItem);

  function handleOnChangeProvince(option) {
    navigate(`/search?province=${encodeURIComponent(option.value)}&type=SELL`)
  }

  return (
    <div className="flex-[0.9] mx-4">
      <div className="relative w-full">
        <input
          onKeyDown={handleOnKeyDown}
          value={kw}
          onChange={(e) => setKw(e.target.value)}
          type="text"
          placeholder="Search for anything"
          className="bg-gray-200 text-black w-full p-5 pr-24 border rounded-lg border-amber-50 focus:outline-none"
        />
        <button
          onClick={search}
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer bg-rose-600 text-white px-8 py-3 rounded-md hover:bg-rose-700 transition"
        >
          <FaSearch />
        </button>
        <div
          className="absolute right-25 top-1/2 -translate-y-1/2 cursor-pointer text-black z-50 px-8 py-3 rounded-md transition"
        >
          <Select
            value={option}
            onChange={handleOnChangeProvince}
            className="text-2xl rounded-2xl w-[200px]"
            classNamePrefix="react-select"
            placeholder="Toàn quốc" options={locOption} />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
