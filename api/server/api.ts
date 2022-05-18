import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:5000"
});

export const getUpdatedRates = async () => {
    const result = await api.get("/c/u-r");
    return result;
};

export const notifyUser = async (data: object) => {
    const result = await api.post("/u/n", data);
    return result;
};
