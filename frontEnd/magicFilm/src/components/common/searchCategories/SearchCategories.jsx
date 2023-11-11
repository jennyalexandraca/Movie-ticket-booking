import "./searchCategories.css";
import { Link } from "react-router-dom";

const SearchCategories = ({ categories, activeButtonCategory }) => {
  return (
    <div className="container-filter-search-categories">
      {/* <h2 className="title-category-filter">Filtra por categoría</h2> */}
      <div className="container-buttons-search-categories">
        {categories.map((cat) => {
          return (
            <Link
              key={cat.id}
              className={
                activeButtonCategory == cat.id
                  ? "button-search-categories activeButtonCategory"
                  : "button-search-categories"
              }
              to={`/category/${cat.id}`}
            >
              {cat.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SearchCategories;
