import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3001", // đổi nếu bạn dùng port khác
});

// Tìm user theo email + password (login)
export const apiListProducts = async () => {
    const res = await api.get("/products");
    return res.data; // mảng 0..1 phần tử
};
export const apiGetProduct = async (id) => {
    const res = await api.get(`/products/${id}`);
    return res.data; // trả về object product
};
export const apiCreateProduct = async (payload) => {
    const res = await api.post("/products", { ...payload });
    return res.data; // trả về object product mới tạo
};
export const apiRemoveProduct = async (id) => {
    const res = await api.delete(`/products/${id}`);
    return res.data; // trả về object product đã xóa
};
export const apiUpdateProduct = async (id, payload) => {
  const res = await api.patch(`/products/${id}`, { ...payload });
  return res.data; // trả về object sản phẩm đã cập nhật
};