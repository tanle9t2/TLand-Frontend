import AssetList from "./PostList"

import MiniSpinner from "../../ui/MiniSpinner";
import useGetPostsHome from "./useGetPostsHome";

function PostForRent() {
    const { isLoading, content } = useGetPostsHome("RENT");
    if (isLoading) return <MiniSpinner />

    return (
        <AssetList data={content} />
    )
}

export default PostForRent
