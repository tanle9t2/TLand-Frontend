
import { ADDRESS_API } from "../utils/axiosConfig";
import { MAP_BOX_TOKEN } from "../utils/secretKey";

export async function getProvinces() {
    const res = await ADDRESS_API.get(`/new-provinces?limit=34`)
    return res.data.data;
}
export async function getWards(provinceCode) {
    const res = await ADDRESS_API.get(`new-provinces/${provinceCode}/wards?limit=999`)
    return res.data.data;
}
export async function getCoordinates(address) {
    const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            address
        )}.json?access_token=${MAP_BOX_TOKEN}&limit=1&country=VN&language=vi`
    );
    const data = await response.json();
    return data;
}