import axios from 'axios'

const BASE_URL = "https://route-posts.routemisr.com"
const AUTH_ENDPOINT = "users";


export const changePassword = (data) => {
    return axios.patch(`${BASE_URL}/${AUTH_ENDPOINT}/change-password`, data, {
        headers: {
            'token': localStorage.getItem("userToken"),
            'Content-Type': 'application/json'
        }
    });
};