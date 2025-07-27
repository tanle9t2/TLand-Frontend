import Post from "../features/post/Post";
import Comment from "../ui/Comment";
import Contact from "../ui/Contact";

function PostDetailPage() {
    return (
        <div className="min-h-screen p-6 flex ">
            < div className="mx-auto w-full grid grid-cols-[0.9fr_auto] gap-10" >
                <Post />
                <div className="sticky top-6 self-start">
                    <Contact />
                    <Comment />
                </div>
            </ div>
        </div >
    );

}

export default PostDetailPage
