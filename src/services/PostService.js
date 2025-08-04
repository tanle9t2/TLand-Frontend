import { API } from "../utils/axiosConfig";

export async function getPosts(page, size, type) {
    const res = await API.get('/post-service/api/v1/posts', {
        params: { page, size, type },
    });
    return res.data;
}
export async function getPostByStatus({ page, size, status }) {
    const res = await API.get('/post-service/api/v1/post/status', {
        params: { page, size, status }
    });
    return res.data;
}

export async function getPostById(postId) {
    const res = await API.get(`/post-service/api/v1/post/${postId}`)
    return res.data;
}
export async function createPost({ request }) {
    const res = await API.post(`/post-service/api/v1/post`, { ...request, userId: "eadd6456-a5ea-4d41-b71a-061541227b8d" })
    return res.data;
}
export async function getSummaryStatusPost() {
    const res = await API.get(`/post-service/api/v1/posts/status`)
    return res.data;
}