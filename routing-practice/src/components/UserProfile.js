import React from "react";
import { useParams, Link } from "react-router-dom";
import "./UserProfile.css";

const usersData = {
  1: { name: "Анна Петрова", email: "anna@example.com", city: "Москва" },
  2: { name: "Иван Сидоров", email: "ivan@example.com", city: "Санкт-Петербург" },
  3: { name: "Мария Иванова", email: "maria@example.com", city: "Казань" }
};

const UserProfile = () => {
  const { userId } = useParams();
  const user = usersData[userId];

  return (
    <div className="user-profile">
      <h2>Профиль пользователя</h2>

      {user ? (
        <div className="user-info">
          <div className="user-card">
            <h3>{user.name}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Город:</strong> {user.city}</p>
          </div>

          <div className="user-actions">
            <Link to="/product/laptop" className="action-link">Посмотреть товары</Link>
            <Link to="/" className="action-link">На главную</Link>
          </div>
        </div>
      ) : (
        <div className="user-not-found">
          <p>Пользователь с ID "{userId}" не найден</p>
          <p>Доступные пользователи: 1, 2, 3</p>
          <Link to="/" className="back-link">Вернуться на главную</Link>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
