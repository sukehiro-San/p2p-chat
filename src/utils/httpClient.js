import axios from 'axios';

export const BASE_PATH = 'http://localhost:8000/admin';

const axiosClient = axios.create({
    baseURL: BASE_PATH
})

axiosClient.interceptors.request.use(
    function (response) {
        const access_token = localStorage.getItem('token');
        Object.assign(response.headers, {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + access_token,
        })
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        // if(error.response.status === 401 || error.response.status === 403) window.location.href = '/login'
        return Promise.reject(error);
    }
)

export default axiosClient;