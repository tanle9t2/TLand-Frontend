import { API } from "../utils/axiosConfig";

export async function getAllCategories() {
    const res = await API.get(`/asset-service/api/v1/categories`)
    return res.data;
}