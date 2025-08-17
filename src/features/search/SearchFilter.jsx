import { useMemo, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SearchFilterItem from "./SearchFilterItem";
import useGetProvince from "../asset/useGetProvince";
import MiniSpinner from "../../ui/MiniSpinner";

import { FILTER_NAME, FILTER_PRICE_RENT, FILTER_PRICE_SELL, PROPERTIES } from "../../utils/constant";
import { useSearchParams } from "react-router-dom";
import useGetFilters from "./useGetFilters";


function SearchFilter() {
    const { isLoading, provinces } = useGetProvince()
    const { isLoading: loadingFilters, filters } = useGetFilters()
    const [searchParams] = useSearchParams();


    const provinceParams = searchParams.get("province");
    if (isLoading) return <MiniSpinner />

    const PRICE_FILTER = (searchParams.get("type") === "SELL") || !searchParams.get("type") ? FILTER_PRICE_SELL : FILTER_PRICE_RENT
    return (
        <div className="space-y-4">
            <SearchFilterItem params="price" title="Lọc theo khoảng giá" filter={PRICE_FILTER} />
            {!provinceParams && <SearchFilterItem params="province" title="Vị trí BĐS" filter={provinces} />}
            {
                filters?.map(f => {
                    let values = [];
                    f.items.flatMap(({ label, value }) => {
                        values.push(<SearchFilterItem key={label} params={label} title={FILTER_NAME[label]} filter={value} />);
                    });
                    return values;
                })
            }

        </div>
    )
}

export default SearchFilter
