
import { ADDRESS_API } from "../utils/axiosConfig";

export async function getProvinces() {
    const res = await ADDRESS_API.get(`/new-provinces?limit=34`)
    return res.data.data;
}
export async function getWards(provinceCode) {
    console.log(provinceCode)
    const res = await ADDRESS_API.get(`new-provinces/${provinceCode}/wards?limit=999`)
    return res.data.data;
}