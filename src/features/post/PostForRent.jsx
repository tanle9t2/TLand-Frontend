import AssetList from "./PostList"
import useGetPostsHome from "../asset/useGetPostsHome"
import MiniSpinner from "../../ui/MiniSpinner";

function PostForRent() {
    const { isLoading, content } = useGetPostsHome("RENT");
    if (isLoading) return <MiniSpinner />

    return (
        <AssetList data={content} />
    )
}

export default PostForRent
