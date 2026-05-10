
import { ADDRESS_API } from "../utils/axiosConfig";
import { GOONG_API_KEY } from "../utils/constant";
import { MAP_BOX_TOKEN } from "../utils/secretKey";

export async function getProvinces() {
    const res = await ADDRESS_API.get(`/p`)
    return res.data;
}
export async function getWards(provinceCode) {
    const res = await ADDRESS_API.get(`/w/?province=${provinceCode}`)
    return res.data;
}
export async function getCoordinates(address) {
    const response = await fetch(
        `https://rsapi.goong.io/geocode?address=${encodeURIComponent(address)}&api_key=${GOONG_API_KEY}`
    );
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        return null;
    }

    const location = data.results[0].geometry.location;

    return {
        lat: location.lat,
        lng: location.lng,
        raw: data
    };
}