import FullPageSpinner from "../../ui/FullPageSpinner";
import useGetPost from "./useGetPost";
import Thumbnail from "../../ui/Thumbnail"
import PostDetail from "./PostDetail"
import Contact from "../../ui/Contact"
import Comment from "../../ui/Comment"
import MapboxGeocoding from "../map/MapboxGeocoding";
import Section from "../../ui/Section";
import { HiOutlineMapPin } from "react-icons/hi2";

function PostDetailData() {
    const { isLoading, post } = useGetPost();
    if (isLoading) return <FullPageSpinner />
    const { assetDetail, userInfo } = post

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-[1280px] mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
                <div className="min-w-0 space-y-6">
                    <Thumbnail images={assetDetail.contents} />
                    <PostDetail phoneNumber={userInfo.phoneNumber} post={post} />

                    <Section>
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                    <HiOutlineMapPin className="text-[2rem] text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-[1.6rem] font-bold text-gray-900">Xem trên bản đồ</h3>
                                    <p className="text-[1.2rem] text-gray-500">{`${assetDetail.address}, ${assetDetail.ward}, ${assetDetail.province}`}</p>
                                </div>
                            </div>
                            <div className="rounded-xl overflow-hidden border border-gray-100">
                                <MapboxGeocoding address={`${assetDetail.address}, ${assetDetail.ward}, ${assetDetail.province}`} />
                            </div>
                        </div>
                    </Section>
                </div>

                <div className="space-y-6 lg:sticky lg:top-[100px] self-start">
                    <Contact userInfo={userInfo} />
                    <Comment />
                </div>
            </div>
        </div>
    )
}

export default PostDetailData
