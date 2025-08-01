import Button from "../../ui/Button"
import AssetList from "../asset/AssetList";
import { Box, Modal } from "@mui/material";

import MiniSpinner from "../../ui/MiniSpinner";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useGetAssetInfinite from "../asset/useGetAssetInfinite";
import PostCreateForm from "./PostCreateForm";
import PostCreatedEmpty from "./PostCreatedEmpty";

function PostCreated() {
    const {
        isLoading,
        assets,
        fetchNextPage,
        hasMore,
        page
    } = useGetAssetInfinite()
    if (isLoading) return <MiniSpinner />
    return (
        assets.length ? <PostCreateForm assets={assets}
            fetchNextPage={fetchNextPage}
            hasMore={hasMore}
            page={page} />
            : <PostCreatedEmpty />
    )
}

export default PostCreated
