import MiniSpinner from "../../ui/MiniSpinner";
import SearchItem from "./SearchItem"
import useSearch from "./useSearch";


function SearchList() {
    const { isLoading, posts } = useSearch()
    if (isLoading) return <MiniSpinner />
    console.log(posts)
    return (
        <div className="col-span-3 space-y-4">
            {posts.map((item) => (
                <SearchItem key={item.id} item={item} />
            ))}
        </div>
    )
}

export default SearchList
