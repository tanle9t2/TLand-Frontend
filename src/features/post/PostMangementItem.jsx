import { Link, useParams } from "react-router-dom"
import { convertDate, formatVietnamMoney } from "../../utils/helper"
import { IoMdMore } from "react-icons/io"
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline, MdOutlineRemoveRedEye } from "react-icons/md";
import { BiHide } from "react-icons/bi";
import { useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { Box, Modal } from "@mui/material";
import useDeletePost from "./useDeletePost";
import toast from "react-hot-toast";
import useHidePost from "./useHidePost";
import { POST_STATUS } from "../../utils/constant";
import useAcceptPost from "./useShowPost";
import useShowPost from "./useShowPost";
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
    const { status } = useParams()

    const { isPending: isHidingPost, hidePost } = useHidePost()
    const { isPending: isShowingPost, showPost } = useShowPost()
    const { isPending, deletePost } = useDeletePost()

    function handleOnClose() {
        setIsShowMenu(false)
    }
    const ref = useOutsideClick(handleOnClose);
    function handleOnClickDelete() {
        setIsShowdelete(true)
    }
    function handleOnCloseDelete() {
        setIsShowdelete(false);
    }
    function hanndleOnConfirm() {
        deletePost({ id },
            {
                onSuccess: () => {
                    toast.success("Xóa bài đăng thành công")
                    handleOnCloseDelete()
                }
            }
        )
    }
    function handleOnHidePost() {
        hidePost({ postId: id },
            {
                onSuccess: () => {
                    toast.success("Ẩn bài đăng thành công")
                    handleOnCloseDelete()
                }
            }
        )
    }
    function handleOnShowPost() {
        showPost({ postId: id },
            {
                onSuccess: () => {
                    toast.success("Hiện bài đăng thành công")
                    handleOnCloseDelete()
                }
            }
        )
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
                <span onClick={() => { setIsShowMenu(true) }} className="text-4xl">
                    <IoMdMore />
                </span>
                {isShowMenu &&
                    <div className="absolute rounded-lg w-64 right-0 text-2xl bg-white shadow-lg z-10">
                        <Link to={`update/${id}`}>
                            <p className="px-2 py-4 flex items-center hover:bg-gray-100"><span className="mr-2"><CiEdit /></span> Chỉnh sửa</p>
                        </Link>
                        {status === "SHOW" && < p onClick={() => handleOnHidePost()} className="px-2 py-4 flex items-center hover:bg-gray-100"><span className="mr-2"><BiHide /></span> Ẩn bài đăng</p>}
                        {status === "HIDE" && < p onClick={() => handleOnShowPost()} className="px-2 py-4 flex items-center hover:bg-gray-100"><span className="mr-2"><MdOutlineRemoveRedEye /></span> Hiện bài đăng</p>}

                        <p onClick={() => handleOnClickDelete()} className="px-2 py-4 flex items-center hover:bg-gray-100"><span className="mr-2"><MdDeleteOutline /></span> Xóa</p>
                    </div>}
                <Modal
                    open={isShowDelete}
                    onClose={handleOnCloseDelete}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <ConfirmDelete onCloseModal={() => handleOnCloseDelete()} disabled={isPending} onConfirm={(e) => hanndleOnConfirm(e)} />
                    </Box >
                </Modal>
            </div>

        </div >
    )
}

export default PostMangementItem
