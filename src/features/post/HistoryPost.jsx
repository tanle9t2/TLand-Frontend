import MiniSpinner from "../../ui/MiniSpinner"
import PaginationStack from "../../ui/PaginationStack"
import { POST_STATUS } from "../../utils/constant"
import { convertDate } from "../../utils/helper"
import useGetHistory from "./useGetHistory"

function HistoryPost() {
    const { isLoading, histories, totalPages, page } = useGetHistory()
    if (isLoading) return <MiniSpinner />
    histories.length
    return (
        histories.length ?
            <div className="bg-white">
                <h1 className="text-3xl font-bold p-4">Lịch sử bài đăng</h1>
                <ul className="text-xl">
                    {histories.map(item => <li className="p-4 cursor-pointer hover:bg-gray-200 border-b border-b-gray-200">
                        <div className="flex justify-between space-x-5 items-center">
                            <p className="truncate flex-1/2 w-0">{item.title}</p>
                            <p className={`px-3 py-1 
                            ${item.status === "SHOW" && "bg-green-400"}
                            ${item.status === "EXPIRED" && "bg-red-400"}
                            ${item.status === "SHOW" && "bg-green-400"}
                            rounded-lg`}>{POST_STATUS[item.status]}</p>
                        </div>
                        <p className="text-end">{convertDate(item.createdAt)}</p>
                    </li>)
                    }
                </ul >
                <div className="flex py-5 justify-center">
                    <PaginationStack totalPage={totalPages} page={page} />
                </div>
            </div >
            : null
    )
}

export default HistoryPost
