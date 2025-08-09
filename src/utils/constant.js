
import { IoBedOutline, IoFlowerOutline } from "react-icons/io5";
import { TbEscalator, TbBath } from "react-icons/tb";
import { RiContractFill } from "react-icons/ri";
import { BsDoorOpen, BsBuildings } from "react-icons/bs";
import { RxDimensions } from "react-icons/rx";
import { LuPackage2 } from "react-icons/lu";

export const MAX_IMAGE_UPLOAD = 12
export const PROPERTY_FEATURES = [
    "Hầm xe hơi",
    "Nhà nở hậu",
    "Nhà tóp hậu",
    "Nhà dính quy hoạch / lộ giới",
    "Nhà chưa hoàn công",
    "Nhà nát",
    "Đất chưa chuyển thổ",
    "Hiện trạng khác",
]
export const HOUSE_TYPE = [
    "Nhà mặt phố, mặt tiền",
    "Nhà ngõ, hẻm",
    "Nhà biệt thự",
    "Nhà phố liền kề"
]
export const DIRECT_ASSET = [
    "Bắc",
    "Đông Bắc",
    "Đông",
    "Đông Nam",
    "Nam",
    "Tây Nam",
    "Tây",
    "Tây Bắc"
];
export const LEGAL_INFO = [
    "Đã có sổ",
    "Đang chờ sổ",
    "Không có sổ",
    "Sổ chung/ công chứng vi bằng",
    "Giấy tờ viết tay"
]
export const INTERIOR_STATUS = [
    "Nội thất cao cấp",
    "Nội thất đầy đủ",
    "Hoàn thiện cơ bản",
    "Bàn giao thô",
]

export const POST_STATUS = {
    "WAITING_PAYMENT": "Cần thanh toán",
    "PAYMENT": "Đã thanh toán",
    "HIDE": "Ẩn",
    "SHOW": "Hiển thị",
    "EXPIRED": "Hết hạn",
    "REJECT": "Từ chối",
    "DELETE": "Đã xóa",
    "WAITING_ACCEPT": "Chờ duyệt"
}
export const PROPERTIES = {
    bedrooms: {
        icon: IoBedOutline,
        label: "Số phòng ngủ: ",
    },
    floors: {
        icon: TbEscalator,
        label: "Tầng:",
    },
    bathrooms: {
        icon: TbBath,
        label: "Số phòng tắm: ",
    },
    legalDocs: {
        icon: RiContractFill,
        label: "Thông tin pháp lý",
    },
    mainDirection: {
        icon: BsDoorOpen,
        label: "Hướng cửa: ",
    },
    houseType: {
        icon: BsBuildings,
        label: "Loại hình căn hộ: ",
    },
    dimension: {
        icon: RxDimensions,
        label: "Diện tích: ",
    },
    interiorStatus: {
        icon: LuPackage2,
        label: "Nội thất: ",
    },
    hasGarden: {
        icon: IoFlowerOutline,
        label: "Sân vườn: ",
    },
};
export const PAGE_SIZE = 5;
export const PAGE = 1;
