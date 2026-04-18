import { IoMdSend } from "react-icons/io"
import Section from "./Section"
import { useParams } from "react-router-dom"
import useGetComments from "../features/post/useGetComments"
import { getTimeDifferenceFromNow } from "../utils/helper"
import PaginationStack from "./PaginationStack"
import useCreateComment from "../features/post/useCreateComment"
import { useState, useCallback } from "react"
import toast from "react-hot-toast"
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2"

function Comment() {
    const { postId } = useParams()
    const { isLoading, comments, totalPages, page } = useGetComments()
    const [comment, setComment] = useState('')
    const { isPending, createComment } = useCreateComment()

    const handleCreateComment = useCallback(() => {
        if (!comment || comment.trim() === '') {
            toast.error("Vui lòng nhập bình luận để gửi");
            return;
        }
        createComment({ postId, content: comment }, {
            onSuccess: () => {
                toast.success("Bình luận của bạn đã được gửi")
                setComment("")
            },
            onError: (error) => toast.error(error.message)
        })
    }, [comment, createComment, postId]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === "Enter") handleCreateComment();
    }, [handleCreateComment]);

    if (isLoading) return null;

    return (
        <Section>
            <div className="p-5 pb-0">
                <div className="flex items-center gap-2.5 mb-5">
                    <HiOutlineChatBubbleBottomCenterText className="text-[1.8rem] text-gray-400" />
                    <h3 className="text-[1.5rem] font-bold text-gray-900">
                        Bình luận {comments.length > 0 && <span className="text-gray-400 font-medium">({comments.length})</span>}
                    </h3>
                </div>

                {comments.length > 0 ? (
                    <ul className="space-y-5 mb-4">
                        {comments.map((c) => (
                            <li key={c.id || c.createdAt}>
                                <div className="flex gap-3">
                                    <img
                                        src={c.userInfo.avtUrl || '/default-avt.png'}
                                        alt={`${c.userInfo.firstName} ${c.userInfo.lastName}`}
                                        className="w-9 h-9 rounded-full object-cover flex-shrink-0 border border-gray-100"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="bg-gray-50 rounded-xl px-4 py-3">
                                            <p className="text-[1.3rem] font-bold text-gray-800 mb-1">
                                                {`${c.userInfo.firstName} ${c.userInfo.lastName}`}
                                            </p>
                                            <p className="text-[1.3rem] text-gray-600 leading-relaxed break-words">{c.content}</p>
                                        </div>
                                        <p className="text-[1.1rem] text-gray-400 mt-1.5 pl-4">
                                            {getTimeDifferenceFromNow(c.createdAt)}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="py-8 text-center">
                        <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-3">
                            <HiOutlineChatBubbleBottomCenterText className="text-[2.4rem] text-gray-300" />
                        </div>
                        <p className="text-[1.3rem] text-gray-500 font-medium">Chưa có bình luận nào</p>
                        <p className="text-[1.2rem] text-gray-400 mt-1">Hãy để lại bình luận cho người bán.</p>
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="flex justify-center pb-4">
                        <PaginationStack totalPage={totalPages} currentPage={page} />
                    </div>
                )}
            </div>

            <div className="border-t border-gray-100 p-4 flex items-center gap-3">
                <input
                    value={comment}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Viết bình luận..."
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[1.35rem] outline-none focus:bg-white focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10 transition-all placeholder:text-gray-400"
                />
                <button
                    type="button"
                    onClick={handleCreateComment}
                    disabled={isPending}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isPending
                        ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                        : 'bg-rose-500 text-white hover:bg-rose-600 shadow-sm cursor-pointer'
                        }`}
                >
                    <IoMdSend className="text-[1.6rem]" />
                </button>
            </div>
        </Section>
    )
}

export default Comment
