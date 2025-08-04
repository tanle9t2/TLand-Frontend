import { Link } from "react-router-dom"
import Button from "../../ui/Button"

function PostMangeEmpty() {
    return (
        <div className="text-center py-20">
            <img className="w-[457px] h-[275px] mx-auto" src="/public/post-create-banner.png" />

            <h3 className="text-2xl font-semibold mb-2">Không tìm thấy tin đăng</h3>
            <p className="text-gray-500 mb-4">Bạn hiện tại không có tin đăng nào cho trạng thái này</p>
            <Link to="/create-post">
                <Button variant="primary">
                    Đăng tin
                </Button>
            </Link>
        </div>
    )
}

export default PostMangeEmpty
