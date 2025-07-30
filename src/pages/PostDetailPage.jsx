import AssetForRent from "../features/post/PostForRent";
import Post from "../features/post/Post";
import Comment from "../ui/Comment";
import Contact from "../ui/Contact";
import Section from "../ui/Section";

function PostDetailPage() {
    return (
        <div className="min-h-screen p-6 ">
            < div className="mx-auto w-full grid grid-cols-[0.9fr_auto] gap-10" >
                <Post />
                <div className="sticky top-6 self-start">
                    <Contact />
                    <Comment />
                </div>
            </ div>
            <Section>
                <h1 className="font-bold pl-3 py-5 text-3xl">Tin đăng tương tự</h1>
                <AssetForRent />
            </Section>
        </div >
    );

}

export default PostDetailPage
