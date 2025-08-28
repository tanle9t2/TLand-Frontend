import { useNavigate } from "react-router-dom"
import Button from "../../ui/Button"
import AssetCard from "./PostCard"


function PostList({ type, data, totalElements }) {
    const navigate = useNavigate()
    return (
        <div>
            <div className="grid grid-cols-5 place-items-center border-t-gray-200 border-t-2 py-8">
                {data.map(item => <AssetCard key={item.id} post={item} />)}
            </div>
            {totalElements > 5 && <div className="py-5 flex justify-center">
                <Button onClick={() => navigate(`/search?type=${type}`)}>
                    Xem thêm tin khác
                </Button>
            </div>}
        </div>
    )
}

export default PostList
