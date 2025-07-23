function CardCategory({ icon, title, content }) {
    return (
        <div className="flex items-center py-8 shadow-md hover:bg-gray-200 cursor-pointer">
            <div>
                <img className="w-[48px] h-[48px] min-w-[48px]" src={icon} alt={title} />
            </div>
            <div className="px-3">
                <h1 className="font-bold text-3xl">
                    {title}
                </h1>
                <p className="text-xl text-gray-500">
                    {content}
                </p>
            </div>
        </div>
    )
}

export default CardCategory
