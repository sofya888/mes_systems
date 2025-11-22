import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumbs.css";

// Для дружелюбных названий в крошках
const usersData = {
  1: { name: "Анна Петрова" },
  2: { name: "Иван Сидоров" },
  3: { name: "Мария Иванова" }
};
const productsData = {
  laptop: { name: "Ноутбук Gaming Pro" },
  phone: { name: "Смартфон SuperPhone" },
  123: { name: "Наушники AudioMax" }
};
const categoryNames = {
  electronics: "Электроника",
  books: "Книги",
  clothing: "Одежда"
};

const Breadcrumbs = () => {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  let pathAcc = "";
  const crumbs = segments.map((seg, idx) => {
    pathAcc += `/${seg}`;
    const prev = segments[idx - 1];

    let label = seg;
    if (prev === "user") label = usersData[seg]?.name || `Пользователь ${seg}`;
    else if (prev === "product") label = productsData[seg]?.name || `Продукт ${seg}`;
    else if (prev === "category") label = categoryNames[seg] || seg;
    else if (seg === "user") label = "Пользователь";
    else if (seg === "product") label = "Продукт";
    else if (seg === "category") label = "Категория";

    return { href: pathAcc, label };
  });

  return (
    <nav className="breadcrumbs">
      <Link to="/">Главная</Link>
      {crumbs.map((c, i) => (
        <span key={c.href}>
          {" > "}
          {i < crumbs.length - 1 ? <Link to={c.href}>{c.label}</Link> : <span>{c.label}</span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
