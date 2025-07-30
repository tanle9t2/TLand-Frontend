import Button from "../../ui/Button"
import AssetCard from "./PostCard"


function PostList({ data }) {
    return (
        <div>
            <div className="flex border-t-gray-200 border-t-2 pt-8">
                {data.map(item => <AssetCard key={item.id} post={item} />)}
            </div>
            <div className="py-5 flex justify-center">
                <Button>
                    Xem thêm n tin khác
                </Button>
            </div>
        </div>
    )
}

export default PostList
