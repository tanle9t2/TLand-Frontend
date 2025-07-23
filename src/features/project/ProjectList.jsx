import Button from "../../ui/Button"
import ProjectCard from "./ProjectCard"

const data = [
    {
        title: "Bcons City - Green Emerald",
        location: "Quận Bình Tân, Tp Hồ Chí Minh",
        price: "37 - 50 triệu/m²",
        image: "https://cdn.chotot.com/YIQhoB38unJXGhy51dTPW0JP6txaPBnLdm8GavaFoj4/preset:property_project_large/plain/4910_overview_1734490515.jpg"
    },
    {
        title: "Bcons City - Green Emerald",
        location: "Quận Bình Tân, Tp Hồ Chí Minh",
        price: "37 - 50 triệu/m²",
        image: "https://cdn.chotot.com/YIQhoB38unJXGhy51dTPW0JP6txaPBnLdm8GavaFoj4/preset:property_project_large/plain/4910_overview_1734490515.jpg"
    },
    {
        title: "Bcons City - Green Emerald",
        location: "Quận Bình Tân, Tp Hồ Chí Minh",
        price: "37 - 50 triệu/m²",
        image: "https://cdn.chotot.com/YIQhoB38unJXGhy51dTPW0JP6txaPBnLdm8GavaFoj4/preset:property_project_large/plain/4910_overview_1734490515.jpg"
    },
    {
        title: "Bcons City - Green Emerald",
        location: "Quận Bình Tân, Tp Hồ Chí Minh",
        price: "37 - 50 triệu/m²",
        image: "https://cdn.chotot.com/YIQhoB38unJXGhy51dTPW0JP6txaPBnLdm8GavaFoj4/preset:property_project_large/plain/4910_overview_1734490515.jpg"
    },
]
function ProjectList() {
    return (
        <div>
            <div className="flex border-t-gray-200 border-t-2 pt-8">
                {data.map(item => <ProjectCard info={item} />)}
            </div>
            <div className="py-5 flex justify-center">
                <Button>
                    Xem thêm n tin khác
                </Button>
            </div>
        </div>
    )
}

export default ProjectList
