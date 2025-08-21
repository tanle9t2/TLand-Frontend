import FullPageSpinner from "../../ui/FullPageSpinner";
import useGetPost from "./useGetPost";
import Thumbnail from "../../ui/Thumbnail"
import PostDetail from "./PostDetail"

import Contact from "../../ui/Contact"
import Comment from "../../ui/Comment"
function PostDetailData() {
    const { isLoading, post } = useGetPost();
    if (isLoading) return <FullPageSpinner />
    const { assetDetail, userInfo } = post
    return (
        < div className="mx-auto w-full grid grid-cols-[0.9fr_auto] gap-10" >
            <div className="overflow-hidden">
                <Thumbnail images={assetDetail.contents} />
                <PostDetail phoneNumber={userInfo.phoneNumber} post={post} />
            </div>
            <div className="sticky top-6 self-start">
                <Contact userInfo={userInfo} />
                <Comment />
            </div>
        </div>
    )
}

export default PostDetailData
