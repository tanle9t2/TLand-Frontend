import MiniSpinner from "../../ui/MiniSpinner";
import EmptySearch from "./EmptySearch";
import SearchItem from "./SearchItem"
import useSearch from "./useSearch";


function SearchList() {
    const { isLoading, posts } = useSearch()
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
        </div>
    )
}

export default SearchList
