import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SearchFilterItem from "./SearchFilterItem";
import useGetProvince from "../asset/useGetProvince";
import MiniSpinner from "../../ui/MiniSpinner";

import { FILTER_PRICE_RENT, FILTER_PRICE_SELL } from "../../utils/constant";
import { useSearchParams } from "react-router-dom";
import useGetFilters from "./useGetFilters";


function SearchFilter() {
    const { isLoading, provinces } = useGetProvince()
    const { isLoading: loadingFilters, filters } = useGetFilters()
    const [searchParams] = useSearchParams();

    if (isLoading) return <MiniSpinner />
    console.log(filters)
    const PRICE_FILTER = (searchParams.get("type") === "SELL") ? FILTER_PRICE_SELL : FILTER_PRICE_RENT
    return (
        <div className="space-y-4">
            <SearchFilterItem params="price" title="Lọc theo khoảng giá" filter={PRICE_FILTER} />
            <SearchFilterItem params="province" title="Vị trí BĐS" filter={provinces} />
        </div>
    )
}

export default SearchFilter
