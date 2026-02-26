import axios from 'axios'

const BASE_URL = "https://route-posts.routemisr.com"

export function addNewComment(postId, content, image = null) {
    const token = localStorage.getItem("userToken")
    const formData = new FormData()

    formData.append('content', content)
    if (image) {
        formData.append('image', image)
    }

    return axios.post(`${BASE_URL}/posts/${postId}/comments`, formData, {
        headers: { token }
    })
}

export function updateComment(commentId, content, image = null) {
    console.log("updateComment called with commentId:", commentId, "content:", content);
    if (!commentId) {
        return Promise.reject("commentId is required");
    }
    const token = localStorage.getItem("userToken");
    const formData = new FormData();
    formData.append('content', content);
    if (image) formData.append('image', image);
    return axios.put(`${BASE_URL}/comments/${commentId}`, formData, {
        headers: { token }
    });
}

export function deleteComment(commentId) {
    console.log("deleteComment called with commentId:", commentId);
    if (!commentId) {
        console.error("commentId is undefined or missing");
        return Promise.reject("commentId is required");
    }
    const token = localStorage.getItem("userToken");
    return axios.delete(`${BASE_URL}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
}