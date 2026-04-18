import Select from 'react-select';
import useGetCategories from '../asset/useGetCategories';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { FILTER_NAME } from '../../utils/constant';
import { IoCloseOutline } from 'react-icons/io5';

const LOCATION = [
    "Hồ Chí Minh",
    "Hà Nội",
    "Đà Nẵng",
    "Cần Thơ",
    "Bình Dương"
];

const POST_TYPE = [
    { value: "SELL", label: "Mua bán" },
    { value: "RENT", label: "Cho thuê" }
];

function SearchHeader() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { categories } = useGetCategories();

    const cateOption = useMemo(
        () => (categories?.map(c => ({ value: c.id, label: c.name })) || []),
        [categories]
    );

    const paramsObj = Object.fromEntries(searchParams.entries());
    const { type = "SELL", category, province, keyword, page, ...rest } = paramsObj;
    const selectedType = POST_TYPE.find(p => p.value === type) || null;
    const selectedCate = cateOption.find(c => c.value === category) || null;

    function handleOnClickProvince(e) {
        searchParams.set("province", e.target.textContent);
        setSearchParams(searchParams);
    }

    function handleOnChangeCate(cate) {
        searchParams.set("category", cate.value);
        setSearchParams(searchParams);
    }

    function handleOnChangeType(type) {
        searchParams.set("type", type.value);
        setSearchParams(searchParams);
    }

    function handleOnDeleteFilter() {
        const kwValue = searchParams.get("keyword");
        const newParams = new URLSearchParams();

        if (kwValue) {
            newParams.set("keyword", kwValue);
        }
        setSearchParams(newParams);
    }

    function handleDeleteFilter(key) {
        if (key === "minPrice" || key === "maxPrice") {
            searchParams.delete("maxPrice");
            searchParams.delete("minPrice");
        } else {
            searchParams.delete(key);
        }
        setSearchParams(searchParams);
    }

    return (
        <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    Mua Bán Bất Động Sản {province} Giá Tốt
                </h1>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
                    <div className="flex items-center space-x-4 shrink-0">
                        <span className="text-2xl font-semibold text-gray-700">Lọc:</span>
                        <Select
                            onChange={handleOnChangeType}
                            value={selectedType}
                            className="text-xl w-[160px]"
                            classNamePrefix="react-select"
                            placeholder="Loại hình"
                            options={POST_TYPE}
                        />
                        <Select
                            onChange={handleOnChangeCate}
                            value={selectedCate}
                            className="text-xl w-[200px]"
                            classNamePrefix="react-select"
                            placeholder="Loại BĐS"
                            options={cateOption}
                        />
                    </div>


                    <div className="flex flex-wrap items-center gap-2 flex-1">
                        {Object.entries(rest).map(([k, v]) => (
                            <div
                                key={k}
                                className="flex items-center space-x-2 bg-gray-50 border border-gray-200 rounded-sm px-3 py-1.5 text-xl font-medium shadow-sm transition-colors hover:bg-gray-100"
                            >
                                <span>
                                    <span className="font-semibold text-gray-800">{FILTER_NAME[k] || k}</span>: <span className="text-gray-600">{v}</span>
                                </span>
                                <button
                                    onClick={() => handleDeleteFilter(k)}
                                    className="text-gray-400 hover:text-red-500 transition-colors focus:outline-none"
                                >
                                    <IoCloseOutline size={16} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {Object.keys(rest).length > 0 && (
                        <button
                            onClick={handleOnDeleteFilter}
                            className="text-xl font-medium text-red-600 hover:text-red-800 underline transition-colors shrink-0"
                        >
                            Xóa bộ lọc
                        </button>
                    )}
                </div>

                {!province && (
                    <div className="flex items-center space-x-4 overflow-x-auto pb-2">
                        <span className="text-2xl font-semibold text-gray-700 whitespace-nowrap">Khu vực:</span>
                        <div className="flex flex-nowrap space-x-3">
                            {LOCATION.map(item => (
                                <button
                                    onClick={handleOnClickProvince}
                                    key={item}
                                    className="whitespace-nowrap py-1.5 px-4 rounded-sm border border-gray-200 text-2xl font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-900 transition-all focus:outline-none"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchHeader;
