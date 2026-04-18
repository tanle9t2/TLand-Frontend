import React from "react";
import SearchHeader from "./SearchHeader";
import SearchFilter from "./SearchFilter";
import SearchList from "./SearchList";

function Search() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <SearchHeader />
            <div className="mx-auto">
                <div className="flex flex-col lg:grid lg:grid-cols-4 gap-8 py-8">

                    <div className="lg:col-span-1">
                        <SearchFilter />
                    </div>

                    <div className="lg:col-span-3">
                        <SearchList />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Search;