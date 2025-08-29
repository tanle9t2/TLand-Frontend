import { API, AUTH_REQUEST } from "../utils/axiosConfig";

export async function getPosts(page, size, type) {
    const res = await API.get('/post-service/api/v1/public/posts', {
        params: { page, size, type },
    });
    return res.data;
}
export async function getPostByStatus({ page, size, status, kw }) {
    const res = await AUTH_REQUEST.get('/post-service/api/v1/post/status', {
        params: { page, size, status, kw }
    });
    return res.data;
}

export async function getPostLanding({ page, size, userId }) {
    const res = await API.get('/post-service/api/v1/public/posts/landing', {
        params: { page, size, userId }
    });
    return res.data;
}


export async function getPostById(postId) {
    const res = await API.get(`/post-service/api/v1/public/post/${postId}`)
    return res.data;
}
export async function createPost({ request }) {
    const res = await AUTH_REQUEST.post(`/post-service/api/v1/post`, { ...request })
    return res.data;
}
export async function updatePost({ id, request }) {
    const res = await AUTH_REQUEST.put(`/post-service/api/v1/post/${id}`, { ...request })
    return res.data;
}
export async function showPost({ postId }) {
    const res = await AUTH_REQUEST.post(`/post-service/api/v1/post/${postId}/accept`);
    return res.data;
}
export async function deletePost(id) {
    const res = await AUTH_REQUEST.delete(`/post-service/api/v1/post/${id}`)
    return res.data;
}
export async function hidePost({ postId }) {
    const res = await AUTH_REQUEST.put(`/post-service/api/v1/post/${postId}/hide`);
    return res.data;
}

export async function getHistory({ id, page, size }) {
    const res = await AUTH_REQUEST.get(`/post-service/api/v1/posts/history/${id}`, {
        params: { page, size }
    })
    return res.data;
}

export async function getSummaryStatusPost() {
    const res = await AUTH_REQUEST.get(`/post-service/api/v1/posts/status`)
    return res.data;
}


export async function getComments({ postId, page, size }) {
    const res = await API.get(`/post-service/api/v1/public/post/${postId}/comments`, {
        params: { page, size },
    });
    return res.data;
}
export async function createComment({ postId, content }) {
    const res = await AUTH_REQUEST.post(`/post-service/api/v1/post/${postId}/comment`, {
        content
    });
    return res.data;
}