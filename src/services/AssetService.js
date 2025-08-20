import { API, AUTH_REQUEST } from "../utils/axiosConfig";

export async function getAllCategories() {
    const res = await API.get(`/asset-service/api/v1/public/categories`)
    return res.data;
}
export async function getAsset(assetId) {
    const res = await AUTH_REQUEST.get(`/asset-service/api/v1/asset/${assetId}`)
    return res.data;
}
export async function getAssets({ page, size }) {
    const res = await AUTH_REQUEST.get(`/asset-service/api/v1/assets`, {
        params: { page, size }
    })
    return res.data;
}

export async function getAssetsDraft() {
    const res = await AUTH_REQUEST.get(`/asset-service/api/v1/assets/draft`)
    return res.data;
}



export async function uploadAssetImage(assetId, file) {
    console.log(file)
    const formData = new FormData();
    formData.append('file', file);
    if (assetId)
        formData.append("assetId", assetId)

    const res = await AUTH_REQUEST.post(`/asset-service/api/v1/asset/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return res.data;
}

export async function deleteAsset(id) {
    const res = await AUTH_REQUEST.delete(`/asset-service/api/v1/asset/${id}`,);
    return res.data;
}

export async function creatAsset(request) {
    const res = await AUTH_REQUEST.put(`/asset-service/api/v1/asset`, request);

    return res.data;
}