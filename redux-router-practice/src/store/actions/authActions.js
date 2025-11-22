import { loginStart, loginSuccess, loginFailure } from "../slices/authSlice";

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    // Имитация API
    await new Promise((r) => setTimeout(r, 700));
    const role = credentials.email.includes("admin") ? "admin" : "user";
    const user = { id: "u1", name: credentials.email.split("@")[0], email: credentials.email, role };
    dispatch(loginSuccess(user));
    localStorage.setItem("user", JSON.stringify(user));
  } catch (e) {
    dispatch(loginFailure("Ошибка авторизации"));
  }
};

export const checkAuth = () => (dispatch) => {
  const user = localStorage.getItem("user");
  if (user) {
    dispatch(loginSuccess(JSON.parse(user)));
  }
};
