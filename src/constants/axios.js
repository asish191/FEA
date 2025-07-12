import axios from "axios";

export const movieApi = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000, // 10 second timeout
})