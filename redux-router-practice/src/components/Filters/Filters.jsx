import "./Filters.css";

const Filters = ({ filters, onFilterChange }) => {
  const handle = (patch) => onFilterChange(patch);
  return (
    <div className="filters">
      <select
        value={filters.category}
        onChange={(e) => handle({ category: e.target.value })}
      >
        <option value="all">Все категории</option>
        <option value="electronics">Электроника</option>
        <option value="appliances">Бытовая техника</option>
        <option value="books">Книги</option>
        <option value="wearables">Гаджеты</option>
      </select>

      <input
        type="search"
        placeholder="Поиск..."
        value={filters.search}
        onChange={(e) => handle({ search: e.target.value })}
      />

      <select
        value={filters.sortBy}
        onChange={(e) => handle({ sortBy: e.target.value })}
      >
        <option value="name">По названию</option>
        <option value="price">По цене</option>
      </select>
    </div>
  );
};

export default Filters;
