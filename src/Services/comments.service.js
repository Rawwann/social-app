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

export function updateComment(postIdOrId, maybeId, data) {
    let url;
    if (data === undefined) {
        const commentId = postIdOrId;
        data = maybeId;
        if (!commentId) return Promise.reject("commentId is required");
        url = `${BASE_URL}/comments/${commentId}`;
    } else {
        const postId = postIdOrId;
        const commentId = maybeId;
        if (!postId || !commentId) return Promise.reject("postId and commentId are required");
        url = `${BASE_URL}/posts/${postId}/comments/${commentId}`;
    }
    const token = localStorage.getItem("userToken");
    console.log("updateComment request url", url, "data", data);
    return axios.put(url, data, {
        headers: { token: token }
    });
}

export function deleteComment(postIdOrId, maybeId) {
    let url;
    if (maybeId === undefined) {
        const commentId = postIdOrId;
        if (!commentId) {
            console.error("deleteComment called without commentId");
            return Promise.reject("commentId is required");
        }
        url = `${BASE_URL}/comments/${commentId}`;
    } else {
        const postId = postIdOrId;
        const commentId = maybeId;
        if (!postId || !commentId) {
            console.error("deleteComment called without postId or commentId");
            return Promise.reject("postId and commentId are required");
        }
        url = `${BASE_URL}/posts/${postId}/comments/${commentId}`;
    }
    const token = localStorage.getItem("userToken");
    console.log("deleteComment request url", url);
    return axios.delete(url, {
        headers: { token: token }
    });
}