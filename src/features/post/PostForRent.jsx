import AssetList from "./PostList"

import MiniSpinner from "../../ui/MiniSpinner";
import useGetPostsHome from "./useGetPostsHome";
import { POST_TYPE } from "../../utils/constant";
function PostForRent() {
    const { isLoading, content, totalElements } = useGetPostsHome("RENT");
    if (isLoading) return <MiniSpinner />

    return (
        <AssetList type={POST_TYPE.RENT} data={content} totalElements={totalElements} />
    )
}

export default PostForRent
