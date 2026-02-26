import axios from 'axios'

const BASE_URL = "https://linked-posts.routemisr.com"

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

