import SyncLoader from "react-spinners/SyncLoader";
import AssetList from "./AssetList"
import useGetPostsHome from "./useGetPostsHome";

function AssetForSell() {
    const { isLoading, content } = useGetPostsHome("RENT");
    if (isLoading) return <SyncLoader />

    return (
        <AssetList data={content} />
    )
}

export default AssetForSell
