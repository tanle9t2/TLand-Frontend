const filters = [
    {
        title: "Lọc theo khoảng giá",
        items: ["Giá dưới 2 triệu", "Giá 2 - 3 triệu", "Giá 3 - 5 triệu", "Giá 5 - 10 triệu"],
    },
    {
        title: "Thuê bất động sản",
        items: ["Tp Hồ Chí Minh", "Hà Nội", "Đà Nẵng", "Cần Thơ"],
    },
    {
        title: "Loại hình nổi bật",
        items: [
            "Thuê chung cư Tp Hồ Chí Minh",
            "Thuê nhà đất Tp Hồ Chí Minh",
            "Thuê phòng trọ Tp Hồ Chí Minh",
            "Thuê văn phòng, mặt bằng Tp Hồ Chí Minh",
        ],
    },
];

function SearchFilter() {
    return (
        <div className="space-y-4">
            {filters.map((filter, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-sm p-4">
                    <h3 className="font-semibold mb-2">{filter.title}</h3>
                    <ul className="space-y-1 text-sm text-gray-700">
                        {filter.items.map((f, i) => (
                            <li key={i} className="hover:text-orange-500 cursor-pointer">
                                {f}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
}

export default SearchFilter
