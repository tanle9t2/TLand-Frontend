import { IoMdSend } from "react-icons/io"
import Section from "./Section"
import { useParams } from "react-router-dom"
import useGetComments from "../features/post/useGetComments"
import { getTimeDifferenceFromNow } from "../utils/helper"
import PaginationStack from "./PaginationStack"
import useCreateComment from "../features/post/useCreateComment"
import { useState } from "react"
import toast from "react-hot-toast"
function Comment() {
    const { postId } = useParams()
    const { isLoading, comments, totalPages, page } = useGetComments()
    const [comment, setComment] = useState('')
    const { isPending, createComment } = useCreateComment()
    if (isLoading) return null;

    function handleCreateComment() {
        if (!comment || comment.trim() === '') {
            toast.error("Vui lòng nhập bình luận để gửi");
            return;
        }
        createComment({ postId, content: comment }, {
            onSuccess: () => {
                toast.success("Bình luận của bạn đã được gửi đi")
                setComment("")
            },
            onError: (error) => toast.error(error.message)
        })
    }

    return (
        <Section>
            <div className="p-4">
                <h1 className="font-bold text-3xl">Bình luận</h1>
            </div>
            <div className="py-10">
                {comments.length ? <ul className="px-4">
                    {comments.map(c => <li className="">
                        <div className="flex space-x-2 ">
                            <img
                                src={c.userInfo.avtUrl}
                                alt={`${c.userInfo.firstName} ${c.userInfo.lastName}`}
                                className="w-[32px] h-[32px] rounded-full object-cover"
                            />
                            <div className="p-2 rounded-lg bg-gray-100 w-full space-y-3">
                                <p className="font-bold">{`${c.userInfo.firstName} ${c.userInfo.lastName}`}</p>
                                <p>{c.content}</p>
                            </div>
                        </div>
                        <p className="text-end p-4 text-xl">{getTimeDifferenceFromNow(c.createdAt)}</p>
                    </li>)}
                </ul> :
                    <>
                        <img className="mx-auto" height={80} width={80} src="https://static.chotot.com/storage/chotot-icons/png/comment_empty.png" />
                        <p className="mx-auto text-center">Chưa có bình luận nào.
                            <br />
                            Hãy để lại bình luận cho người bán.
                        </p>
                    </>
                }
                <div className="flex justify-center">
                    <PaginationStack totalPage={totalPages} currentPage={page} />
                </div>
            </div>
            <div className="border-t p-4 flex items-center text-2xl border-gray-200">
                <input value={comment}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleCreateComment();
                        }
                    }}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Nhập bình luận"
                    className="p-5 w-full border-2 rounded-4xl border-gray-200" />
                <span onClick={() => handleCreateComment()} className={`px-4 ${isPending ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'} text-5xl`}><IoMdSend /></span>
            </div>
        </Section >
    )
}

export default Comment
