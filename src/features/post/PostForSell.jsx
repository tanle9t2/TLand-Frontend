import SyncLoader from "react-spinners/SyncLoader";
import AssetList from "./PostList"
import useGetPostsHome from "../asset/useGetPostsHome";
import MiniSpinner from "../../ui/MiniSpinner";

function PostForSell() {
    const { isLoading, content } = useGetPostsHome("RENT");
    if (isLoading) return <MiniSpinner />

    return (
        <AssetList data={content} />
    )
}

export default PostForSell
