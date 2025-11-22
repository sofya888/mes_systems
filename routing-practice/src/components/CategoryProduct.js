import React from "react";
import { useParams } from "react-router-dom";
import "./CategoryProduct.css";

const CategoryProduct = () => {
  const { categoryName, productId } = useParams();

  const categories = {
    electronics: "Электроника",
    books: "Книги",
    clothing: "Одежда",
    "ноутбуки": "Ноутбуки",
    "смартфоны": "Смартфоны",
    "электроника": "Электроника"
  };

  const key = decodeURIComponent(categoryName).toLowerCase();
  const categoryRussian = categories[key] || categoryName;

  return (
    <div className="category-product">
      <h2>Продукт в категории</h2>
      <div className="category-info">
        <div className="info-card">
          <h3>Информация о продукте</h3>
          <p><strong>Название категории: </strong>{categoryRussian}</p>
          <p><strong>ID продукта: </strong>{productId}</p>
          <p><strong>Полный путь: </strong>/category/{categoryName}/product/{productId}</p>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
