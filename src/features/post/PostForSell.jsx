
import AssetList from "./PostList"
import useGetPostsHome from "./useGetPostsHome";
import MiniSpinner from "../../ui/MiniSpinner";

function PostForSell() {
    const { isLoading, content, totalElements } = useGetPostsHome("SELL");
    if (isLoading) return <MiniSpinner />

    return (
        <AssetList data={content} totalElements={totalElements} />
    )
}

export default PostForSell
