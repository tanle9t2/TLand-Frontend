import { useMemo, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SearchFilterItem from "./SearchFilterItem";
import useGetProvince from "../asset/useGetProvince";
import MiniSpinner from "../../ui/MiniSpinner";

import { FILTER_PRICE_RENT, FILTER_PRICE_SELL, PROPERTIES } from "../../utils/constant";
import { useSearchParams } from "react-router-dom";
import useGetFilters from "./useGetFilters";


function SearchFilter() {
    const { isLoading, provinces } = useGetProvince()
    const { isLoading: loadingFilters, filters } = useGetFilters()
    const [searchParams] = useSearchParams();


    const provinceParams = searchParams.get("province");
    if (isLoading) return <MiniSpinner />

    const PRICE_FILTER = (searchParams.get("type") === "SELL") ? FILTER_PRICE_SELL : FILTER_PRICE_RENT
    return (
        <div className="space-y-4">
            <SearchFilterItem params="price" title="Lọc theo khoảng giá" filter={PRICE_FILTER} />
            {!provinceParams && <SearchFilterItem params="province" title="Vị trí BĐS" filter={provinces} />}
            {
                filters?.map(f => {
                    let items = [];
                    const grouped = f.items.reduce((acc, item) => {
                        const { label, value } = item;
                        if (!acc[label]) {
                            acc[label] = [];
                        }
                        acc[label].push({ label: value });
                        return acc;
                    }, {});

                    Object.entries(grouped).forEach(([key, value]) => {
                        items.push(<SearchFilterItem key={key} params={key} title={PROPERTIES[key].label} filter={value} />);
                    });

                    console.log(grouped);
                    return items;
                })
            }

        </div>
    )
}

export default SearchFilter
