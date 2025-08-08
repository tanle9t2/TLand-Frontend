import React from "react";
import SearchHeader from "./SearchHeader";
import SearchFilter from "./SearchFilter";
import SearchList from "./SearchList";

function Search() {
    return (
        <div className="bg-gray-50">
            <SearchHeader />
            <div className="grid py-4 grid-cols-4 gap-6">
                <SearchList />
                <SearchFilter />
            </div>
        </div>
    );
}
export default Search;