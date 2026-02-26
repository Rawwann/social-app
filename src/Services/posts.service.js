import axios from "axios";

const BASE_URL = "https://route-posts.routemisr.com";
const POSTS_ENDPOINT = "posts";

export async function getAllPosts() {
    const token = localStorage.getItem("userToken");
    return axios.get(`${BASE_URL}/${POSTS_ENDPOINT}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            sort: "-createdAt",
        },
    });
}

export async function getSinglePost(id) {
    const token = localStorage.getItem("userToken")
    return axios.get(`${BASE_URL}/${POSTS_ENDPOINT}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export async function getPostComments(postId) {
    const token = localStorage.getItem("userToken")
    return axios.get(`${BASE_URL}/posts/${postId}/comments`, {
        headers: { token }
    })
}

export async function createPost(data) {
    const token = localStorage.getItem("userToken");
    return axios.post(`${BASE_URL}/${POSTS_ENDPOINT}`, data, {
        headers: {
            token: token
        }
    });
}

export async function deletePost(id) {
    const token = localStorage.getItem("userToken");
    return axios.delete(`${BASE_URL}/${POSTS_ENDPOINT}/${id}`, {
        headers: { token: token }
    });
}

export async function updatePost(id, data) {
    const token = localStorage.getItem("userToken");
    return axios.put(`${BASE_URL}/${POSTS_ENDPOINT}/${id}`, data, {
        headers: { token: token }
    });
}