import { useEffect, useState } from "react"
import Button from "../../ui/Button"
import FullPageSpinner from "../../ui/FullPageSpinner"
import useGetPostUser from "../post/useGetPostUser"
import PostItem from "./PostItem"
function MainPost() {
    const [curPage, setPage] = useState(0)
    const { isLoading, posts, totalElements, isLast } = useGetPostUser({ page: curPage })
    const [curPosts, setCurPosts] = useState([])
    useEffect(() => {
        if (!isLoading && posts) {
            setCurPosts(prev => [...prev, ...posts])
        }
    }, [isLoading, posts])
    if (isLoading) return <FullPageSpinner />
    function handleOnClickExpend() {
        setPage(prev => prev + 1)
    }

    return (
        <div className="col-span-5 rounded-lg bg-white">
            <div>
                <h2 className="text-3xl font-bold p-4 border-b border-b-gray-300">Đang hiển thị ({totalElements})</h2>
            </div>
            <div className="grid py-4 place-items-center sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {curPosts.map((post) => (
                    <PostItem key={post.id} post={post} />
                ))}
            </div>
            {!isLast && <div className="flex justify-center border-t border-t-gray-300">
                <Button onClick={() => handleOnClickExpend()}>
                    Xem thêm
                </Button>
            </div>}
        </div>
    )
}

export default MainPost
