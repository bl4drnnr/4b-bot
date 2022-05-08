import axios from "axios";

const api = axios.create({
    baseURL: 'http://127.0.0.1:5000'
})

export const updateRates = async () => {
    const result = await api.get('/c/u-r');
    return result;
}