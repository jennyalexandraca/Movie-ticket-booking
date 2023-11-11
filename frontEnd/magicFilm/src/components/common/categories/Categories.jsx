import "./categories.css";
import { Link } from "react-router-dom";
const Categories = ({ categories }) => {
  return (
    <>
      <div className="container-categories">
        <div className="container-images">
          {categories.map((category) => (
            <Link key={category.id} to={`/category/${category.id}`}>
              <img className="zoom" src={category.zoom} alt={category.title} />
            </Link>
          ))}
        </div>
      </div>
      <div className="nav-menu">
        {categories.map((category) => (
          <Link key={category.id} to={`/category/${category.id}`}>
            <img src={category.logo} alt={category.title} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default Categories;
