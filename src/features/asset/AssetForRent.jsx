import AssetList from "./AssetList"
import SyncLoader from 'react-spinners/SyncLoader';
import useGetPostsHome from "./useGetPostsHome"

function AssetForRent() {
    const { isLoading, content } = useGetPostsHome("RENT");
    if (isLoading) return <SyncLoader />

    return (
        <AssetList data={content} />
    )
}

export default AssetForRent
