import { AUTH_REQUEST } from "../utils/axiosConfig";

export async function getUSerProfile() {
    const res = await AUTH_REQUEST.get(`/user-service/api/v1/user/profile`)
    return res.data;
}