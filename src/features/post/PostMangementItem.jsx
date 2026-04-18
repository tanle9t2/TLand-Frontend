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
import useShowPost from "./useShowPost";
import { HiOutlineCalendar, HiOutlineTag } from "react-icons/hi";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 480,
    border: "none",
    outline: "none",
    bgcolor: 'background.paper',
    borderRadius: "16px",
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
    overflow: "hidden",
    padding: "24px"
};

function PostMangementItem({ post }) {
    const { id, posterUrl, title, createdAt, price } = post
    const [isShowMenu, setIsShowMenu] = useState(false);
    const [isShowDelete, setIsShowDelete] = useState(false)
    const { status } = useParams()

    const { hidePost } = useHidePost()
    const { showPost } = useShowPost()
    const { isPending, deletePost } = useDeletePost()

    function handleOnClose() {
        setIsShowMenu(false)
    }
    const ref = useOutsideClick(handleOnClose);

    function handleOnClickDelete() {
        setIsShowDelete(true)
        setIsShowMenu(false)
    }

    function handleOnCloseDelete() {
        setIsShowDelete(false);
    }

    function handleOnConfirm() {
        deletePost({ id }, {
            onSuccess: () => {
                toast.success("Xóa bài đăng thành công")
                handleOnCloseDelete()
            }
        })
    }

    function handleOnHidePost() {
        hidePost({ postId: id }, {
            onSuccess: () => {
                toast.success("Ẩn bài đăng thành công")
                setIsShowMenu(false)
            }
        })
    }

    function handleOnShowPost() {
        showPost({ postId: id }, {
            onSuccess: () => {
                toast.success("Hiện bài đăng thành công")
                setIsShowMenu(false)
            }
        })
    }

    return (
        <div className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:border-gray-200 transition-all duration-300 w-full mb-4">
            <div className="flex flex-col sm:flex-row h-auto sm:h-[150px]">

                <Link to={`/post/${id}`} className="sm:w-56 h-[180px] sm:h-full flex-shrink-0 overflow-hidden relative block">
                    <img
                        src={posterUrl}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 transition-colors" />
                </Link>


                <div className="flex-1 p-5 lg:p-6 flex flex-col justify-between min-w-0">
                    <div className="flex justify-between items-start gap-4">
                        <Link to={`/post/${id}`} className="flex-1 min-w-0">
                            <h3 className="text-[1.6rem] font-bold text-gray-900 group-hover:text-rose-600 transition-colors line-clamp-2 leading-snug mb-3">
                                {title}
                            </h3>
                        </Link>

                        {/* Dropdown Menu */}
                        <div ref={ref} className="relative z-10 flex-shrink-0">
                            <button
                                type="button"
                                onClick={() => setIsShowMenu(!isShowMenu)}
                                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${isShowMenu ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                            >
                                <IoMdMore className="text-[2rem]" />
                            </button>

                            {isShowMenu && (
                                <div className="absolute right-0 top-[110%] w-56 bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 py-2 origin-top-right animate-in fade-in zoom-in-95 duration-200">
                                    <Link to={`update/${id}`}>
                                        <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-[1.3rem] text-gray-700 hover:text-rose-600 transition-colors cursor-pointer">
                                            <CiEdit className="text-[1.8rem] text-gray-400" />
                                            <span className="font-medium">Chỉnh sửa</span>
                                        </div>
                                    </Link>

                                    {status === "SHOW" && (
                                        <div onClick={handleOnHidePost} className="flex items-center gap-3 px-4 py-3 hover:bg-amber-50 text-[1.3rem] text-gray-700 hover:text-amber-600 transition-colors cursor-pointer">
                                            <BiHide className="text-[1.8rem] text-gray-400" />
                                            <span className="font-medium">Ẩn bài đăng</span>
                                        </div>
                                    )}

                                    {status === "HIDE" && (
                                        <div onClick={handleOnShowPost} className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 text-[1.3rem] text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                                            <MdOutlineRemoveRedEye className="text-[1.8rem] text-gray-400" />
                                            <span className="font-medium">Hiện bài đăng</span>
                                        </div>
                                    )}

                                    <div className="h-[1px] bg-gray-100 my-1 mx-2" />

                                    <div onClick={handleOnClickDelete} className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-[1.3rem] text-gray-700 hover:text-red-600 transition-colors cursor-pointer">
                                        <MdDeleteOutline className="text-[1.8rem] text-gray-400" />
                                        <span className="font-medium">Xóa bài đăng</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
                        <div className="flex items-center gap-2 text-rose-600 font-bold text-[1.4rem]">
                            <HiOutlineTag className="text-[1.6rem]" />
                            {formatVietnamMoney(price)}
                        </div>
                        <div className="flex items-center gap-1.5 text-[1.2rem] text-gray-400">
                            <HiOutlineCalendar className="text-[1.4rem]" />
                            {convertDate(createdAt)}
                        </div>
                    </div>
                </div>
            </div>

            <Modal open={isShowDelete} onClose={handleOnCloseDelete}>
                <Box sx={modalStyle}>
                    <ConfirmDelete
                        resourceName="bài đăng"
                        onCloseModal={handleOnCloseDelete}
                        disabled={isPending}
                        onConfirm={handleOnConfirm}
                    />
                </Box>
            </Modal>
        </div>
    )
}

export default PostMangementItem
