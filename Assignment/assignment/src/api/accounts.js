import axios from "axios";

export const accounts = axios.create({
  baseURL: "http://localhost:3001", // đổi nếu bạn dùng port khác
});

// Tìm user theo email + password (login)
export const apiLogin = async (email, password) => {
  const res = await accounts.get("/accounts", { params: { email, password } });
  return res.data; // mảng 0..1 phần tử
};

// Kiểm tra email đã tồn tại
export const apiCheckEmail = async (email) => {
  const res = await accounts.get("/accounts", { params: { email } });
  return res.data; // mảng
};

// Đăng ký user mới (ép id = number)
export const apiRegister = async (payload) => {
  const res = await accounts.post("/accounts", { ...payload });
  return res.data;
};
// Lấy wishlist: trả về mảng wishlist (hoặc [] nếu chưa có)
export const apiGetWishlist = async (id) => {
  const res = await accounts.get(`/accounts/${id}`);
  return res.data?.wishlist ?? [];
};

// Ghi wishlist: PATCH chỉ trường wishlist và trả về mảng wishlist mới
export const apiPostWishlist = async (id, wishlist) => {
  const res = await accounts.patch(`/accounts/${id}`, { wishlist });
  return res.data?.wishlist ?? [];
};

export const apiGetAllAccount = async () => {
  const res = await accounts.get("/accounts");
  return res.data; // mảng tất cả tài khoản
};
export const apiUpdateAccount = async (id, payload) => {
  const res = await accounts.patch(`/accounts/${id}`, { ...payload });
  return res.data;
};