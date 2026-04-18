import { HiOutlineSearch } from "react-icons/hi";
import { useNavigate, useSearchParams } from "react-router-dom";
import Select from 'react-select'
import useGetProvince from "../features/asset/useGetProvince"
import { useState, useCallback } from "react";

const selectStyles = {
  control: (base, state) => ({
    ...base,
    border: 'none',
    boxShadow: 'none',
    backgroundColor: 'transparent',
    minHeight: '36px',
    width: '130px',
    fontSize: '1.3rem',
    cursor: 'pointer',
  }),
  option: (base, state) => ({
    ...base,
    fontSize: '1.3rem',
    padding: '8px 14px',
    backgroundColor: state.isSelected ? '#fff1f2' : state.isFocused ? '#f9fafb' : 'white',
    color: state.isSelected ? '#e11d48' : '#374151',
    cursor: 'pointer',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#9ca3af',
    fontSize: '1.3rem',
  }),
  singleValue: (base) => ({
    ...base,
    fontSize: '1.3rem',
    color: '#374151',
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '12px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
    border: '1px solid #f3f4f6',
    overflow: 'hidden',
    zIndex: 50,
  }),
  menuList: (base) => ({
    ...base,
    padding: '4px',
  }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: '0 4px',
    color: '#9ca3af',
  }),
};

function SearchBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [kw, setKw] = useState(searchParams.get("keyword") || "");
  const { provinces } = useGetProvince();

  const handleOnKeyDown = useCallback((e) => {
    if (e.key === "Enter") {
      navigate(`/search?keyword=${encodeURIComponent(kw)}&type=SELL`);
    }
  }, [kw, navigate]);

  const search = useCallback(() => {
    navigate(`/search?keyword=${encodeURIComponent(kw)}&type=SELL`);
  }, [kw, navigate]);

  const locOption = provinces?.map(p => ({
    value: p.name,
    label: p.name
  }));

  const selectedItem = searchParams.get("province") || null;
  const option = locOption?.find(o => o.value === selectedItem);

  const handleOnChangeProvince = useCallback((opt) => {
    navigate(`/search?province=${encodeURIComponent(opt.value)}&type=SELL`);
  }, [navigate]);

  return (
    <div className="flex-1 mx-4">
      <div className="relative flex items-center bg-gray-100 rounded-xl border border-gray-200 h-[40px]
       hover:border-gray-300 transition-all duration-200">

        <div className="flex-shrink-0 border-r border-gray-200 pl-1">
          <Select
            value={option}
            onChange={handleOnChangeProvince}
            styles={selectStyles}
            classNamePrefix="react-select"
            placeholder="Toàn quốc"
            options={locOption}
          />
        </div>


        <input
          onKeyDown={handleOnKeyDown}
          value={kw}
          onChange={(e) => setKw(e.target.value)}
          type="text"
          placeholder="Tìm kiếm bất động sản..."
          className="flex-1 bg-transparent text-[1.35rem] text-gray-800 placeholder:text-gray-400 px-4 py-3 outline-none"
        />

        {/* Search button */}
        <button
          onClick={search}
          type="button"
          className="flex-shrink-0 mr-1.5 w-15 h-12 rounded-lg bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center transition-colors duration-200 cursor-pointer"
        >
          <HiOutlineSearch className="text-[1.3rem]" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
