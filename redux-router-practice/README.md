redux-router-practice

Короткое учебное приложение на React + Vite + Redux Toolkit + React Router.
Каталог товаров с фильтрами, корзиной, авторизацией (фиктивной) и защищёнными маршрутами.

Запуск:
```
npm i
npm run dev
# откройте http://localhost:5173
```

Скрипты
```
npm run dev       # локальная разработка
npm run build     # production-сборка
npm run preview   # предпросмотр сборки
```

Основные маршруты

/ — главная

/products — каталог (+ фильтры в query-параметрах)

/products/:id — карточка товара

/cart — корзина

/login, /register — аутентификация

/profile — только для авторизованных

/admin — только для админа

* → /404 — страница «не найдено»
