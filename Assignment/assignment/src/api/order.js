import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3001", // đổi nếu bạn dùng port khác
});

// Tìm user theo email + password (login)
export const apiListOrder = async () => {
    const res = await api.get("/orders");
    return res.data; // mảng 0..1 phần tử
};
export const apiGetOrder = async (id) => {
    const res = await api.get(`/orders/${id}`);
    return res.data; // trả về object order
};
export const apiCreateOrder = async (order) => {
    const res = await api.post("/orders", order);
    return res.data; // trả về object order vừa tạo
};
