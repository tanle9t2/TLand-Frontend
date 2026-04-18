import { useNavigate } from "react-router-dom"
import Button from "../../ui/Button"
import PostCard from "./PostCard"


function PostList({ type, data, totalElements }) {
    const navigate = useNavigate()
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 border-t-gray-200 border-t-2 py-8">
                {data.map(item => <PostCard key={item.id} post={item} />)}
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
