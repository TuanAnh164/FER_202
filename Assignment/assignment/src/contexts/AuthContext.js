import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { apiLogin, apiCheckEmail, apiRegister, apiGetAllAccount, apiUpdateAccount } from "../api/accounts";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState("/");
  const [accounts, setAccounts] = useState([]);
  // Khôi phục user từ localStorage (để không bị mất khi F5)
  useEffect(() => {
    const raw = localStorage.getItem("auth_user");
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch { }
    }
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("auth_user", JSON.stringify(user));
    else localStorage.removeItem("auth_user");
  }, [user]);

  const updateAccountHandler = useCallback(async (payload) => {
    try {
      const updated = await apiUpdateAccount(payload.id, payload);
      setAccounts(prev => prev.map(acc => acc.id === updated.id ? updated : acc));
    } catch (err) {
      console.error("Failed to update account:", err);
      throw err;
    }
  }, [setAccounts]);

  const fetchAccounts = async () => {
    const allAccounts = await apiGetAllAccount();
    setAccounts(allAccounts);
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const login = useCallback(async (email, password) => {
    // gọi json-server
    const list = await apiLogin(email, password);
    if (!Array.isArray(list) || list.length === 0) {
      throw new Error("Invalid email or password");
    }
    const u = list[0];
    // chỉ giữ thông tin cần thiết trong context
    setUser({ id: u.id, name: u.name, role: u.role || u.username, email: u.email, role: u.role });
    return u;
  }, []);

  const register = useCallback(async (data) => {
    // Validate cơ bản
    if (!data.name?.trim()) throw new Error("Name is required");
    if (!data.email?.includes("@")) throw new Error("Invalid email");
    if (!data.username?.trim()) throw new Error("Username is required");
    if (!data.password || data.password.length < 6) throw new Error("Password must be at least 6 chars");
    if (data.password !== data.confirm) throw new Error("Passwords do not match");

    // Kiểm tra email trùng
    const existed = await apiCheckEmail(data.email);
    if (existed.length > 0) throw new Error("Email already exists");

    // Chuẩn hoá payload theo đề: id (auto), username, email, password, secret question, answer, name, avatar, wishlist
    const payload = {
      role: "user",
      username: data.username,
      email: data.email,
      password: data.password,
      name: data.name,
      avatar: data.avatar || "",
      secretQuestion: data.secretQuestion || "",
      answer: data.answer || "",
      wishlist: [],
    };

    const created = await apiRegister(payload);

    // Đăng nhập luôn sau khi đăng ký
    setUser({ id: created.id, name: created.name || created.username, email: created.email });
    return created;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthCtx.Provider
      value={{
        user,
        login,
        logout,
        register,
        redirectAfterLogin,
        setRedirectAfterLogin,
        accounts,
        setAccounts,
        updateAccountHandler
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
