
import AssetList from "./PostList"
import useGetPostsHome from "./useGetPostsHome";
import MiniSpinner from "../../ui/MiniSpinner";
import { POST_TYPE } from "../../utils/constant";
function PostForSell() {
    const { isLoading, content, totalElements } = useGetPostsHome("SELL");
    if (isLoading) return <MiniSpinner />

    return (
        <AssetList type={POST_TYPE.SELL} data={content} totalElements={totalElements} />
    )
}

export default PostForSell
