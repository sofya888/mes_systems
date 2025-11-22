import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  return (
    <nav className="navigation">
      <h2>Практика маршрутизации</h2>
      <div className="nav-links">
        <Link to="/" className="nav-link">Главная</Link>
        <Link to="/user/1" className="nav-link">Профиль 1</Link>
        <Link to="/user/2" className="nav-link">Профиль 2</Link>
        <Link to="/user/3" className="nav-link">Профиль 3</Link>
        <Link to="/product/laptop" className="nav-link">Ноутбук</Link>
        <Link to="/product/phone" className="nav-link">Телефон</Link>
        <Link to="/category/electronics/product/123" className="nav-link">Электроника-123</Link>
      </div>
    </nav>
  );
};

export default Navigation;
