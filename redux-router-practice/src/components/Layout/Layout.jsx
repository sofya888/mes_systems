import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";
import "./Layout.css";

const Layout = ({ children }) => {
  const { isAuthenticated, user } = useSelector((s) => s.auth);
  const { items } = useSelector((s) => s.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    navigate("/");
  };

  const count = items.reduce((t, i) => t + i.quantity, 0);

  return (
    <div className="layout">
      <header className="header">
        <nav className="nav">
          <Link to="/" className="logo">MyStore</Link>
          <div className="links">
            <Link to="/">Главная</Link>
            <Link to="/products">Товары</Link>
            <Link to="/cart">
              Корзина {count > 0 && <span className="badge">{count}</span>}
            </Link>
            {isAuthenticated ? (
              <div className="user">
                <Link to="/profile">{user?.name || "Профиль"}</Link>
                {user?.role === "admin" && <Link to="/admin">Админка</Link>}
                <button onClick={handleLogout}>Выйти</button>
              </div>
            ) : (
              <div className="auth">
                <Link to="/login">Войти</Link>
                <Link to="/register">Регистрация</Link>
              </div>
            )}
          </div>
        </nav>
      </header>
      <main className="main">{children}</main>
      <footer className="footer">© 2024 MyStore</footer>
    </div>
  );
};

export default Layout;
