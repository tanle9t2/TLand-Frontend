import { Link } from "react-router-dom"
import Button from "../../ui/Button"

function PostCreatedEmpty() {
    return (
        <div className="bg-white ">
            <div className="py-20">
                <img className="w-[457px] h-[275px] mx-auto" src="/public/post-create-banner.png" />
                <p className="text-4xl font-bold text-center mt-5">ĐĂNG NHANH - BÁN GỌN</p>
                <p className="text-4xl font-bold text-center mt-5">Bạn chưa có tài sản nào. Hãy tạo tài sản để bắt đầu!</p>
            </div>
            <div className="justify-around flex">
                <Link to="/create-asset">
                    <Button>
                        Tạo tài sản ngay
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default PostCreatedEmpty
