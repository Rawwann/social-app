import axios from "axios"

const baseURL = "https://route-posts.routemisr.com";
const POSTS_ENDPOINT = "posts";
const USERS_ENDPOINT = "users";

export default function getUserPosts(userID) {
    return axios.request({
        url: `${baseURL}/${USERS_ENDPOINT}/${userID}/${POSTS_ENDPOINT}`,
        method: "get",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        }
    })

}


export function getProfileInfo() {
    return axios.request({
        url: `${baseURL}/${USERS_ENDPOINT}/profile-data`,
        method: "get",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        }
    })

}
