import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = useSelector((s) => s.products.items.find((p) => p.id === id));
  const dispatch = useDispatch();

  if (!product) {
    return <div>Товар не найден. Откройте каталог и выберите товар.</div>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <p><b>Цена:</b> {product.price.toLocaleString()} ₽</p>
      <p>{product.description}</p>
      <button onClick={() => dispatch(addToCart(product))}>Добавить в корзину</button>
    </div>
  );
};

export default ProductDetailPage;
