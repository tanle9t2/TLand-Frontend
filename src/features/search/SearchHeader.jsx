import Select from 'react-select';
import useGetCategories from '../asset/useGetCategories';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { FILTER_NAME, PROPERTIES } from '../../utils/constant';
import Chip from '@mui/material/Chip';

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
    const { type = "SELL", category, province, keyword, ...rest } = paramsObj
    const selectedType = POST_TYPE.find(p => p.value === type) || null;
    const selectedCate = cateOption.find(c => c.value === category) || null;

    function handleOnClickProvince(e) {
        searchParams.set("province", e.target.textContent);
        setSearchParams(searchParams);
    };

    function handleOnChangeCate(cate) {
        searchParams.set("category", cate.value);
        setSearchParams(searchParams);
    };

    function handleOnChangeType(type) {
        searchParams.set("type", type.value);
        setSearchParams(searchParams);
    };

    function handleOnDeleteFilter() {
        const kwValue = searchParams.get("keyword");
        const newParams = new URLSearchParams();

        if (kwValue) {
            newParams.set("kw", kwValue);
        }
        setSearchParams(newParams);
    }
    function handleDeleteFilter(key) {
        if (key === "minPrice" || key === "maxPrice") {
            searchParams.delete("maxPrice")
            searchParams.delete("minPrice")
        } else
            searchParams.delete(key)
        setSearchParams(searchParams)
    }
    return (
        <div className="bg-white">
            <h1 className="text-3xl font-bold p-4">
                Mua Bán Bất Động Sản {province} Giá Tốt
            </h1>

            <div className="p-4 grid grid-cols-12 items-center gap-4">

                <div className="col-span-11 flex items-center space-x-5">
                    <h1 className="text-3xl font-bold">Lọc:</h1>

                    <Select
                        onChange={handleOnChangeType}
                        value={selectedType}
                        className="text-2xl w-[200px]"
                        classNamePrefix="react-select"
                        placeholder="Loại hình kinh doanh"
                        options={POST_TYPE}
                    />
                    <Select
                        onChange={handleOnChangeCate}
                        value={selectedCate}
                        className="text-2xl w-[200px]"
                        classNamePrefix="react-select"
                        placeholder="Loại hình BĐS"
                        options={cateOption}
                    />


                    {/* Active filters */}
                    <div className="flex items-center text-2xl space-x-2 overflow-x-auto col-span-6">
                        {Object.entries(rest).map(([k, v]) => (
                            <Chip
                                onDelete={() => handleDeleteFilter(k)}
                                key={k}
                                variant="outlined"
                                sx={{ fontSize: "16px" }}
                                label={
                                    <span >
                                        <span className="font-bold">{FILTER_NAME[k]}</span>: {v}
                                    </span>

                                }
                            />
                        ))}
                    </div>
                </div>

                {/* Reset button */}
                <p
                    onClick={handleOnDeleteFilter}
                    className="col-span-1 text-2xl ml-auto cursor-pointer text-blue-600"
                >
                    Xóa bộ lọc
                </p>
            </div>


            {!province && (
                <div className="p-4 text-2xl flex items-center space-x-7">
                    <h1 className="text-3xl font-bold">Khu vực:</h1>
                    {LOCATION.map(item => (
                        <p
                            onClick={handleOnClickProvince}
                            key={item}
                            className="py-3 px-5 rounded-2xl border border-gray-200 hover:bg-gray-100 cursor-pointer"
                        >
                            {item}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchHeader;
