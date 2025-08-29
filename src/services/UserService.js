import { API, AUTH_REQUEST } from "../utils/axiosConfig";

export async function getUSerProfile() {
    const res = await AUTH_REQUEST.get(`/user-service/api/v1/user/profile`)
    return res.data;
}
export async function updateProfile({ firstName, lastName, email, description, phoneNumber, taxCode, cid, dob, sex }) {
    const res = await AUTH_REQUEST.put(`/user-service/api/v1/user`, { firstName, lastName, email, description, phoneNumber, taxCode, cid, dob, sex })
    return res.data;
}
export async function uploadMedia({ file, type }) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    const res = await AUTH_REQUEST.post(`/user-service/api/v1/user/upload-media`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
}

export async function getUserInfo() {
    const res = await AUTH_REQUEST.get(`/user-service/api/v1/user`)
    return res.data;
}
export async function followUser({ followerId }) {
    const res = await AUTH_REQUEST.post(`/user-service/api/v1/user/follow/${followerId}`)
    return res.data;
}
export async function unfollower({ followerId }) {
    const res = await AUTH_REQUEST.delete(`/user-service/api/v1/user/unfollow/${followerId}`)
    return res.data;
}
export async function checkFollow({ followerId }) {
    const res = await AUTH_REQUEST.get(`/user-service/api/v1/user/follow/${followerId}`)
    return res.data;
}


export async function signUp({ username, lastName, firstName, email, password }) {
    const res = await API.post(`/user-service/api/v1/user/sign-up`, { username, lastName, firstName, email, password })
    return res.data;
}
export async function getUserLadingPage({ userId }) {
    const res = await API.get(`/user-service/api/v1/public/user/page/${userId}`)
    return res.data;
}