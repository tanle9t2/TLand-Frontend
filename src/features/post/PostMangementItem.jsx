import { Link } from "react-router-dom"
import { convertDate, formatVietnamMoney } from "../../utils/helper"
import { IoMdMore } from "react-icons/io"
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { Box, Modal } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    border: "transparent",
    bgcolor: 'background.paper',
    borderRadius: "5px",
    boxShadow: 24,
    overflow: "hidden",
    display: "flex",
    justifyContent: "justify-center",
    alignItems: "center",
    padding: "30px"

};
function PostMangementItem({ post }) {
    const { id, posterUrl, title, createdAt, price } = post
    const [isShowMenu, setIsShowMenu] = useState(false);
    const [isShowDelete, setIsShowdelete] = useState(false)
    function handleOnClose() {
        setIsShowMenu(false)
        setIsShowdelete(false)
    }

    const ref = useOutsideClick(handleOnClose);
    function handleOnClickDelete() {
        setIsShowdelete(true)
    }
    function handleOnCloseDelete() {
        setIsShowdelete(false);
    }
    return (
        <div
            className="cursor-pointer p-4 border-b-2 border-b-gray-200 bg-white h-[140px] w-full flex transition">
            <Link className="flex" to={`/post/${id}`}>
                <img
                    src={posterUrl}
                    alt={title}
                    className="w-full md:w-64 h-52 md:h-auto object-cover"
                />
                <div className="text-xl p-4">
                    <div className="space-y-5 font-bold">
                        <p className="text-rose-600 text-2xl truncate">
                            {title}
                        </p>
                        <p className="text-xl">Ngày đăng: {convertDate(createdAt)}</p>

                        <div className="grid grid-cols-2 gap-5 mt-5">
                            <p className="text-xl">Giá: {formatVietnamMoney(price)}</p>
                        </div>
                    </div>
                </div>
            </Link>
            <div ref={ref} className="ml-auto relative">
                <span onClick={(e) => { e.preventDefault(); setIsShowMenu(true) }} className="text-4xl">
                    <IoMdMore />
                </span>
                {isShowMenu && <div className="absolute rounded-lg w-64 right-0 text-2xl bg-white shadow-lg z-10">
                    <p className="px-2 py-4 flex items-center hover:bg-gray-100"><span className="mr-2"><CiEdit /></span> Chỉnh sửa</p>
                    <p onClick={() => handleOnClickDelete()} className="px-2 py-4 flex items-center hover:bg-gray-100"><span className="mr-2"><MdDeleteOutline /></span> Xóa</p>
                    <Modal
                        open={isShowDelete}
                        onClose={handleOnCloseDelete}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <ConfirmDelete />
                        </Box >
                    </Modal>
                </div>}
            </div>

        </div>
    )
}

export default PostMangementItem
