function EmptySearch() {
    return (
        <div className="bg-white">
            <div className="flex justify-center p-5">
                <img className="w-[200px] h-[130px]" src="/public/empty-search.png" />
            </div>
            <div className="text-center space-y-5 p-5">
                <p className="font-bold text-3xl">Không tìm thấy kết quả từ khóa đã nhập</p>
                <p className="text-xl">
                    Hãy chắc chắn rằng tất cả các từ đều đúng chính tả.
                    <br />
                    Hãy thử những từ khóa khác hoặc những từ khóa chung hơn.
                </p>
            </div>
        </div>
    )
}

export default EmptySearch
