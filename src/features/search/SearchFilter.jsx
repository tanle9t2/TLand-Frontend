import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SearchFilterItem from "./SearchFilterItem";
import useGetProvince from "../asset/useGetProvince";
import MiniSpinner from "../../ui/MiniSpinner";


function SearchFilter() {
    const { isLoading, provinces } = useGetProvince()
    if (isLoading) return <MiniSpinner />
    return (
        <div className="space-y-4">
            <SearchFilterItem title="Vị trí BĐS" filter={provinces} />
        </div>
    )
}

export default SearchFilter
