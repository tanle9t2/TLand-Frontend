import { useEffect, useState } from "react"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import FullPageSpinner from "../../ui/FullPageSpinner"
import useGetPostUser from "../post/useGetPostUser"
import PostItem from "./PostItem"
import Button from "../../ui/Button"

function MainPost() {
    const [curPage, setPage] = useState(0)
    const { isLoading, posts, totalElements, isLast } = useGetPostUser({ page: curPage })
    const [curPosts, setCurPosts] = useState([])

    useEffect(() => {
        if (!isLoading && posts) {
            setCurPosts(prev => {
                const newPosts = posts.filter(p => !prev.some(existing => existing.id === p.id));
                return [...prev, ...newPosts];
            });
        }
    }, [isLoading, posts])

    if (isLoading && curPage === 0) return <div className="h-64 relative"><FullPageSpinner /></div>

    function handleOnClickExpend() {
        setPage(prev => prev + 1)
    }

    return (
        <section className="w-full animate-fade-in-up">
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 2, borderBottom: '1px solid', borderColor: 'grey.200' }}>
                <Typography variant="h4" component="h2" sx={{ fontWeight: 800, color: 'zinc.900', letterSpacing: '-0.03em' }}>
                    Danh sách Bài đăng
                </Typography>
                <Typography variant="body2" sx={{ color: 'zinc.600', fontWeight: 700, bgcolor: 'zinc.100', px: 2, py: 0.5, borderRadius: 2 }}>
                    {totalElements} tin
                </Typography>
            </Box>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {curPosts.map((post) => (
                    <PostItem key={post.id} post={post} />
                ))}
            </div>

            {!isLast && curPosts.length > 0 && (
                <div className="mt-16 flex justify-center">
                    <Button
                        onClick={() => handleOnClickExpend()}
                        disabled={isLoading}
                    >
                        {isLoading ? "Đang tải..." : "Xem thêm tin khác"}
                    </Button>
                </div>
            )}

            {curPosts.length === 0 && !isLoading && (
                <div className="py-20 text-center text-zinc-500">
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>Người dùng này chưa có bài đăng nào.</Typography>
                </div>
            )}
        </section>
    )
}

export default MainPost
