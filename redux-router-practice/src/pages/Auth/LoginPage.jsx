import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../../store/actions/authActions";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { loading, error } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const submit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(form));
    navigate(from, { replace: true });
  };

  return (
    <form onSubmit={submit} style={{ maxWidth: 360 }}>
      <h2>Вход</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <label>Email</label>
      <input type="email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required />
      <label>Пароль</label>
      <input type="password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} required />
      <button type="submit" disabled={loading} style={{ marginTop: 8 }}>
        {loading ? "Вход..." : "Войти"}
      </button>
      <p style={{marginTop:8,fontSize:12}}>Подсказка: используйте email с подстрокой <code>admin</code>, чтобы войти как администратор.</p>
    </form>
  );
};
export default LoginPage;
