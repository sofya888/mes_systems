import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <div className="product-card">
      <h3><Link to={`/products/${product.id}`}>{product.title}</Link></h3>
      <p className="price">{product.price.toLocaleString()} ₽</p>
      <p className="desc">{product.description}</p>
      <div className="actions">
        <Link to={`/products/${product.id}`}>Подробнее</Link>
        <button onClick={() => dispatch(addToCart(product))}>В корзину</button>
      </div>
    </div>
  );
};

export default ProductCard;
