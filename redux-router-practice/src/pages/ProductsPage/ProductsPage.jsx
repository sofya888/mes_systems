import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../../store/actions/productsActions";
import { setFilters } from "../../store/slices/productsSlice";
import ProductCard from "../../components/ProductCard/ProductCard";
import Filters from "../../components/Filters/Filters";
import "./ProductsPage.css";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { items, loading, error, filters } = useSelector((s) => s.products);

  useEffect(() => {
    const urlFilters = {};
    for (const [k, v] of searchParams.entries()) urlFilters[k] = v;
    dispatch(fetchProducts(urlFilters));
  }, [dispatch, searchParams]);

  const handleFilterChange = (patch) => {
    const merged = { ...filters, ...patch };
    dispatch(setFilters(patch));
    const params = new URLSearchParams();
    Object.entries(merged).forEach(([k, v]) => {
      if (v && v !== "all") params.set(k, v);
    });
    setSearchParams(params);
    // fetchProducts сработает за счёт эффекта выше
  };

  if (loading) return <div className="loading">Загрузка товаров...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <div className="products-page">
      <h1>Каталог товаров</h1>
      <Filters filters={filters} onFilterChange={handleFilterChange} />
      <div className="grid">
        {items.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
      {items.length === 0 && <div className="empty">Товары не найдены</div>}
    </div>
  );
};

export default ProductsPage;
