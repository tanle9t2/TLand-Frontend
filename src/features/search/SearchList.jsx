import SearchItem from "./SearchItem"

const listings = [
    {
        id: 1,
        title: "Cho thuê nhà ngay quảng trường Bà Rịa...",
        price: "5 triệu/tháng",
        size: "110 m²",
        address: "Bà Rịa - Vũng Tàu",
        img: "https://cdn.chotot.com/GjfD0heEcQ7VfMN2ybuONAqz7m9MWrSzPZ-72PNKqPw/preset:listing/plain/396a5ee4fda1add3387765c25c20cbb8-2943761962657511661.jpg",
        tag: "Tin ưu tiên",
        author: "Phan Trung",
        authorPosts: "2 tin đăng",
    },
    {
        id: 2,
        title: "CHO THUÊ CH Vinhomes Q9. Studio 1PN...",
        price: "4,5 triệu/tháng",
        size: "30 m²",
        address: "Tp Hồ Chí Minh",
        img: "https://cdn.chotot.com/GjfD0heEcQ7VfMN2ybuONAqz7m9MWrSzPZ-72PNKqPw/preset:listing/plain/396a5ee4fda1add3387765c25c20cbb8-2943761962657511661.jpg",
        tag: "DEAL MÊ",
        author: "Thảo Nguyên",
        authorPosts: "1 tin đăng",
    },
];


function SearchList() {
    return (
        <div className="col-span-3 space-y-4">
            {listings.map((item) => (
                <SearchItem item={item} />
            ))}
        </div>
    )
}

export default SearchList
