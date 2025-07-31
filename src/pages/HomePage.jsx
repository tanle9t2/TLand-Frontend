import PostForRent from "../features/post/PostForRent"
import PostForSell from "../features/post/PostForSell"
import Banner from "../ui/Banner"
import CardCategory from "../ui/CardCategory"
import Section from "../ui/Section"
const data = [{
    icon: "\\public\\icon-1.png",
    title: "Mua bán",
    content: "xxxxxxxxxx tin đăng mua bán"
},
{
    icon: "\\public\\icon-2.png",
    title: "Mua bán",
    content: "xxxxxxxxxx tin đăng mua bán"
},
{
    icon: "\\public\\icon-3.png",
    title: "Mua bán",
    content: "xxxxxxxxxx tinssssssssssssss đăng mua bán"
},
{
    icon: "\\public\\icon-4.png",
    title: "Mua bán",
    content: "xxxxxxxxxx tin đăng mua bán"
}]
function HomePage() {
    return (
        <div>
            <Section>
                <Banner />
                <div className="grid grid-cols-[0.25fr_0.25fr_0.25fr_0.25fr]">
                    {
                        data.map((item, index) => <CardCategory key={index} title={item.title} icon={item.icon} content={item.content} />)
                    }
                </div>
            </Section>
            <Section>
                <h1 className="font-bold pl-3 py-5 text-3xl">Mua bán bất động sản</h1>
                <PostForRent />
            </Section>
            <Section>
                <h1 className="font-bold pl-3 py-5 text-3xl">Cho thuê bất động sản</h1>
                <PostForSell />
            </Section>
            {/* <Section>
                <h1 className="font-bold pl-3 py-5 text-3xl">Dự án được quan tâm</h1>
                <ProjectList />
            </Section> */}
        </div>
    )
}

export default HomePage
