import PostForRent from "../features/post/PostForRent";
import Section from "../ui/Section";
import PostDetailData from "../features/post/PostDetailData";

function PostDetailPage() {

    return (
        <div className="min-h-screen p-6 ">

            <PostDetailData />
            <Section>
                <h1 className="font-bold pl-3 py-5 text-3xl">Tin đăng tương tự</h1>
                <PostForRent />
            </Section>
        </div >
    );

}

export default PostDetailPage
