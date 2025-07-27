import SyncLoader from "react-spinners/SyncLoader";
import PostDetail from "./PostDetail"
import PostThumb from "./PostThumb"
import useGetPost from "./useGetPost"

function Post() {
    const { isLoading, post } = useGetPost();
    if (isLoading) return <SyncLoader />

    const { assetDetail } = post;

    return (
        <div className="overflow-hidden">
            <PostThumb images={assetDetail.contents} />
            <PostDetail post={post} />
        </div>
    )
}

export default Post
