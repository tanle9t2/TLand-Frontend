import PostCreatedUploadImage from "./PostCreatedUploadImage"
import PostCreatedUploadVideo from "./PostCreatedUploadVideo"


function PostCreated() {
    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold mb-5">Hình ảnh và Video sản phẩm</h1>
            <div className="w-full mb-5">
                <PostCreatedUploadImage />
            </div>
            <div>
                <PostCreatedUploadVideo />
            </div>
        </div>
    )
}

export default PostCreated
