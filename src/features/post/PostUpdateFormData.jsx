import MiniSpinner from "../../ui/MiniSpinner";
import PostUpdateForm from "./PostUpdateForm";
import useGetPost from "./useGetPost";

function PostUpdateFormData() {
    const { isLoading, post } = useGetPost();
    if (isLoading) return <MiniSpinner />
    return (
        <PostUpdateForm post={post} />
    )
}

export default PostUpdateFormData
