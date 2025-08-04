import Button from "../../ui/Button"
import AssetCard from "./PostCard"


function PostList({ data, totalElements }) {
    return (
        <div>
            <div className="flex border-t-gray-200 border-t-2 py-8">
                {data.map(item => <AssetCard key={item.id} post={item} />)}
            </div>
            {totalElements > 5 && <div className="py-5 flex justify-center">
                <Button>
                    Xem thêm tin khác
                </Button>
            </div>}
        </div>
    )
}

export default PostList
