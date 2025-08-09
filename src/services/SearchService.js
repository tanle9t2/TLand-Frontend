import { API } from "../utils/axiosConfig";

export async function search({ params }) {
    const res = await API.get(`/search-service/api/v1/search`, {
        params: { ...params }
    })
    return res.data;
}