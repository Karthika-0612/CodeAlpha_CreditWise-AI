import api from "../api/client";

export async function registerUser(data) {
  const response = await api.post("/register", data);

  return response.data;
}
export const login = async (email, password) => {
  const response = await api.post("/login", {
    email,
    password,
  });

  localStorage.setItem("token", response.data.access_token);

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
