import MiniSpinner from "../../ui/MiniSpinner";
import PaginationStack from "../../ui/PaginationStack";
import EmptySearch from "./EmptySearch";
import SearchItem from "./SearchItem"
import useSearch from "./useSearch";


function SearchList() {
    const { isLoading, posts, page, totalPages } = useSearch()
    if (isLoading) return <div className="col-span-3">
        <MiniSpinner />
    </div>
    return (
        <div className="col-span-3 space-y-4">
            {posts.length ?
                posts.map((item) => (
                    <SearchItem key={item.id} item={item} />
                ))
                : <EmptySearch />}
            <div className="flex justify-center text-3xl">
                <PaginationStack totalPage={totalPages} currentPage={parseInt(page)} />
            </div>
        </div>
    )
}

export default SearchList
