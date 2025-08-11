import { API } from "../utils/axiosConfig";

export async function search({ params }) {

    const res = await API.get(`/search-service/api/v1/search?${params} `, {

    })
    return res.data;
}
export async function getSearchFilter({ params }) {

    const res = await API.get(`/search-service/api/v1/search/filters?${params} `, {

    })
    return res.data;
}