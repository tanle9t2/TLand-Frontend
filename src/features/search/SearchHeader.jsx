import Select from 'react-select'
import useGetCategories from '../asset/useGetCategories';
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]
const LOCATION = [
    "TP. Hồ Chí Minh",
    "Hà Nội",
    "Đà Nẵng",
    "Cần Thơ",
    "Bình Dương"
]
const POST_TYPE = {
    "SELL": "Mua bán",
    "RENT": "Cho thuê"
}
function SearchHeader() {
    const type = Object.entries(POST_TYPE).map(([value, label]) => ({
        value,
        label,
    }));
    const { isLoading, categories } = useGetCategories()
    const cateOption = categories?.map(c => ({
        value: c.id,
        label: c.name
    }))
    return (
        <div className="bg-white">
            <h1 className="text-3xl font-bold p-4">Mua Bán Bất Động Sản Giá Tốt</h1>
            <div className='p-4 flex items-center'>
                <h1 className='text-3xl font-bold'>Lọc: </h1>
                <div className='flex space-x-5 p-4'>
                    <Select
                        className="text-2xl"
                        classNamePrefix="react-select"
                        placeholder="Loại hình kinh doanh" options={type} />
                    <Select
                        className="text-2xl"
                        classNamePrefix="react-select"
                        placeholder="Loại hình BĐS" options={cateOption} />
                </div>
            </div>
            <div className='p-4 text-2xl flex items-center space-x-7'>
                <h1 className='text-3xl font-bold'>Khu vực:</h1>
                {LOCATION.map(item => <p key={item} className='py-3 px-5 rounded-2xl border border-gray-200 hover:bg-gray-100 cursor-pointer'>{item}</p>)}
            </div>
        </div>
    )
}

export default SearchHeader
