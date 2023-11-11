import SearchCategories from "../../common/searchCategories/SearchCategories";
import MoviesByCategories from "../../common/moviesByCategories/MoviesByCategories";

const CategoriesSection = ({
  category,
  dataMovies,
  activeButtonCategory,
  categories,
}) => {
  return (
    <div>
      <SearchCategories
        category={category}
        categories={categories}
        activeButtonCategory={activeButtonCategory}
      />
      {dataMovies ? (
        <MoviesByCategories dataMovies={dataMovies} />
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default CategoriesSection;
