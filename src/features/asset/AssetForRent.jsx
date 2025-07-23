import AssetList from "./AssetList"
const data = [
    {
        title: "Bán gấp dãy trọ mặt tiền, 300m2 đang cho thuê 26tr/tháng Tân Nhựt - Bì",
        properties: "3PN Nhà ngõ hẻm",
        location: ["TP.HCM"],
        price: "1,85 tỷ",
        createdAt: "17 phút trước",
        image: "https://cdn.chotot.com/mb5Kw0HusLme-PFTBbatw7TWEhmmg8zeI8ATuy_L54Q/preset:view/plain/3ad727aac312b8c57fff49f86616246c-2940326941581873600.jpg"
    },
    {
        title: "Bán gấp dãy trọ mặt tiền, 300m2 đang cho thuê 26tr/tháng Tân Nhựt - Bì",
        properties: "3PN Nhà ngõ hẻm",
        location: ["TP.HCM"],
        price: "1,85 tỷ",
        createdAt: "17 phút trước",
        image: "https://cdn.chotot.com/mb5Kw0HusLme-PFTBbatw7TWEhmmg8zeI8ATuy_L54Q/preset:view/plain/3ad727aac312b8c57fff49f86616246c-2940326941581873600.jpg"
    },
    {
        title: "Bán gấp dãy trọ mặt tiền, 300m2 đang cho thuê 26tr/tháng Tân Nhựt - Bì",
        properties: "3PN Nhà ngõ hẻm",
        location: ["TP.HCM"],
        price: "1,85 tỷ",
        createdAt: "17 phút trước",
        image: "https://cdn.chotot.com/mb5Kw0HusLme-PFTBbatw7TWEhmmg8zeI8ATuy_L54Q/preset:view/plain/3ad727aac312b8c57fff49f86616246c-2940326941581873600.jpg"

    }, {
        title: "Bán gấp dãy trọ mặt tiền, 300m2 đang cho thuê 26tr/tháng Tân Nhựt - Bì",
        properties: "3PN Nhà ngõ hẻm",
        location: ["TP.HCM"],
        price: "1,85 tỷ",
        createdAt: "17 phút trước",
        image: "https://cdn.chotot.com/mb5Kw0HusLme-PFTBbatw7TWEhmmg8zeI8ATuy_L54Q/preset:view/plain/3ad727aac312b8c57fff49f86616246c-2940326941581873600.jpg"

    }
]
function AssetForRent() {
    //call api
    return (
        <AssetList data={data} />
    )
}

export default AssetForRent
