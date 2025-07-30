import SyncLoader from "react-spinners/SyncLoader";
import PostDetail from "./PostDetail"
import useGetPost from "./useGetPost"
import Thumbnail from "../../ui/Thumbnail";

function Post() {
    const { isLoading, post } = useGetPost();
    if (isLoading) return <SyncLoader />

    const { assetDetail } = post;

    return (
        <div className="overflow-hidden">
            <Thumbnail images={assetDetail.contents} />
            <PostDetail post={post} />
        </div>
    )
}

export default Post
