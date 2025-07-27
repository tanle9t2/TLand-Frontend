import { IoMdSend } from "react-icons/io"
import Section from "./Section"

function Comment() {
    return (
        <Section>
            <div className="p-4">
                <h1 className="font-bold text-3xl">Bình luận</h1>
            </div>
            <div className="py-10">
                <img className="mx-auto" height={80} width={80} src="https://static.chotot.com/storage/chotot-icons/png/comment_empty.png" />
                <p className="mx-auto text-center">Chưa có bình luận nào.
                    <br />
                    Hãy để lại bình luận cho người bán.
                </p>
            </div>
            <div className="border-t p-4 flex items-center text-2xl border-gray-200">
                <input placeholder="Nhập bình luận" className="p-5 w-full border-2 rounded-4xl border-gray-200" />
                <span className="px-4 cursor-pointer text-5xl"><IoMdSend /></span>
            </div>

        </Section>
    )
}

export default Comment
