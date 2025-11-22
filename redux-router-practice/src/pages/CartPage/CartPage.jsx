import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, clearCart } from "../../store/slices/cartSlice";

const CartPage = () => {
  const { items } = useSelector((s) => s.cart);
  const dispatch = useDispatch();
  const total = items.reduce((t, i) => t + i.price * i.quantity, 0);

  return (
    <div>
      <h1>Корзина</h1>
      {items.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <>
          <ul>
            {items.map((i) => (
              <li key={i.id} style={{ marginBottom: 8 }}>
                {i.title} — {i.quantity} шт. × {i.price.toLocaleString()} ₽
                <button onClick={() => dispatch(addToCart(i))} style={{ marginLeft: 8 }}>+</button>
                <button onClick={() => dispatch(removeFromCart(i.id))} style={{ marginLeft: 4 }}>Удалить</button>
              </li>
            ))}
          </ul>
          <p><b>Итого:</b> {total.toLocaleString()} ₽</p>
          <button onClick={() => dispatch(clearCart())}>Очистить корзину</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
