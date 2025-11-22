import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  setFilters,
} from "../slices/productsSlice";
import { MOCK_PRODUCTS } from "../../mock/products";

export const fetchProducts = (filters = {}) => async (dispatch, getState) => {
  try {
    dispatch(fetchProductsStart());
    const current = getState().products.filters;
    const merged = { ...current, ...filters };
    dispatch(setFilters(merged));

    await new Promise((r) => setTimeout(r, 400)); // имитация сети

    const norm = (s) => (s || "").toString().toLowerCase();
    const byCategory = (p) =>
      merged.category && merged.category !== "all"
        ? norm(p.category) === norm(merged.category)
        : true;
    const bySearch = (p) =>
      merged.search ? norm(p.title).includes(norm(merged.search)) : true;

    let list = MOCK_PRODUCTS.filter((p) => byCategory(p) && bySearch(p));

    if (merged.sortBy === "price") {
      list = list.slice().sort((a, b) => a.price - b.price);
    } else {
      list = list.slice().sort((a, b) => a.title.localeCompare(b.title));
    }

    dispatch(
      fetchProductsSuccess({
        products: list,
        totalCount: list.length,
      })
    );
  } catch (e) {
    dispatch(fetchProductsFailure("Ошибка загрузки товаров"));
  }
};
