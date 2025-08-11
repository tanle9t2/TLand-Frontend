import Select from 'react-select';
import useGetCategories from '../asset/useGetCategories';
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

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


    const typeParam = searchParams.get("type") || "SELL";
    const cateParam = searchParams.get("category") || null;
    const province = searchParams.get("province") || null;


    const selectedType = POST_TYPE.find(p => p.value === typeParam) || null;
    const selectedCate = cateOption.find(c => c.value === cateParam) || null;

    const handleOnClickProvince = (e) => {
        searchParams.set("province", e.target.textContent);
        setSearchParams(searchParams);
    };

    const handleOnChangeCate = (cate) => {
        searchParams.set("category", cate.value);
        setSearchParams(searchParams);
    };

    const handleOnChangeType = (type) => {
        searchParams.set("type", type.value);
        setSearchParams(searchParams);
    };

    return (
        <div className="bg-white">
            <h1 className="text-3xl font-bold p-4">
                Mua Bán Bất Động Sản {province} Giá Tốt
            </h1>

            <div className="p-4 flex items-center">
                <h1 className="text-3xl font-bold">Lọc: </h1>
                <div className="flex space-x-5 p-4">
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
                </div>
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
