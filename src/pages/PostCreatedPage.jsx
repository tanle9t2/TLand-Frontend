import ModalCreate from "../ui/ModalCreate"
import PostCreated from "../features/post/PostCreated"
import PostCreatedForm from "../features/post/PostCreatedForm"

function PostCreatedPage() {

    return (
        <div className="bg-white grid grid-cols-[0.4fr_0.6fr] gap-2">
            <PostCreated />
            <PostCreatedForm />
        </div>
    )
}

export default PostCreatedPage
