import FullPageSpinner from "../../ui/FullPageSpinner";
import useGetPost from "./useGetPost";
import Thumbnail from "../../ui/Thumbnail"
import PostDetail from "./PostDetail"

import Contact from "../../ui/Contact"
import Comment from "../../ui/Comment"
import MapboxGeocoding from "../map/MapboxGeocoding";
import Section from "../../ui/Section";
function PostDetailData() {
    const { isLoading, post } = useGetPost();
    if (isLoading) return <FullPageSpinner />
    const { assetDetail, userInfo } = post

    return (
        < div className="mx-auto w-full grid grid-cols-[0.9fr_auto] gap-10" >
            <div className="overflow-hidden">
                <Thumbnail images={assetDetail.contents} />
                <PostDetail phoneNumber={userInfo.phoneNumber} post={post} />
                <Section>
                    <h1 className="font-bold text-3xl p-4">Xem trên bản đồ</h1>
                    <MapboxGeocoding address={`${assetDetail.address}, ${assetDetail.ward}, ${assetDetail.province}`} />
                </Section>

            </div>
            <div className="sticky top-6 self-start">
                <Contact userInfo={userInfo} />
                <Comment />
            </div>
        </div >
    )
}

export default PostDetailData
