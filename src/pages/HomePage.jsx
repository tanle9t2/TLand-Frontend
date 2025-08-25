import PostForRent from "../features/post/PostForRent"
import PostForSell from "../features/post/PostForSell"
import Banner from "../ui/Banner"
import CardCategory from "../ui/CardCategory"
import Section from "../ui/Section"
import MiniChatbox from '../features/chatbot/MiniChatbox'
function HomePage() {
    return (
        <div>
            <Section>
                <Banner />
            </Section>
            <Section>
                <h1 className="font-bold pl-3 py-5 text-3xl">Cho thuê bất động sản</h1>
                <PostForRent />
            </Section>
            <Section>
                <h1 className="font-bold pl-3 py-5 text-3xl">Mua bán bất động sản</h1>
                <PostForSell />
            </Section>
            {/* <Section>
                <h1 className="font-bold pl-3 py-5 text-3xl">Dự án được quan tâm</h1>
                <ProjectList />
            </Section> */}
            <MiniChatbox />
        </div>
    )
}

export default HomePage
