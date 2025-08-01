import { API } from "../utils/axiosConfig";

export async function getAllCategories() {
    const res = await API.get(`/asset-service/api/v1/categories`)
    return res.data;
}
export async function getAsset(assetId) {
    const res = await API.get(`/asset-service/api/v1/asset/${assetId}`)
    return res.data;
}
export async function getAssets({ page, size }) {
    const res = await API.get(`/asset-service/api/v1/assets`, {
        params: { page, size }
    })
    return res.data;
}

export async function getAssetsDraft() {
    const res = await API.get(`/asset-service/api/v1/assets/draft`)
    return res.data;
}



export async function uploadAssetImage(assetId, file) {
    console.log(file)
    const formData = new FormData();
    formData.append('file', file);
    if (assetId)
        formData.append("assetId", assetId)

    const res = await API.post(`/asset-service/api/v1/asset/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return res.data;
}

export async function creatAsset(request) {
    const res = await API.put(`/asset-service/api/v1/asset`, request);

    return res.data;
}