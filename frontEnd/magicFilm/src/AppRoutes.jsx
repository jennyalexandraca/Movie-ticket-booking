import { Routes, Route } from "react-router-dom";
import HeaderLayoutContainer from "./components/layout/header/HeaderLayoutContainer";
import FooterLayoutContainer from "./components/layout/footer/FooterLayoutContainer";
import MovieDetailContainer from "./components/pages/movieDetail/MovieDetailContainer";
import Home from "./components/pages/home/Home";
import LoginContainer from "./components/pages/login/LoginContainer";
import CategoriesSectionContainer from "./components/pages/categoriesSection/CategoriesSectionContainer";
import AdminPanelContainer from "./components/pages/adminPanel/AdminPanelContainer";
import PrivateRoute from "./PrivateRoute";
import AddUserContainer from "./components/pages/addUser/AddUserContainer";
import EmailVerifyContainer from "./components/pages/emailVerify/EmailVerifyContainer";
import SidebarContainer from "./components/layout/sidebar/SidebarContainer";
import AddMovieContainer from "./components/common/addMovie/AddMovieContainer";
import AddCategoryContainer from "./components/common/addCategory/AddCategoryContainer";
import DeleteMovieContainer from "./components/common/deleteMovie/DeleteMovieContainer";
import SearchMoviesContainer from "./components/common/searchMovies/SearchMoviesContainer";
import ReservationContainer from "./components/pages/reservation/ReservationContainer";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<HeaderLayoutContainer />}>
        <Route element={<FooterLayoutContainer />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginContainer />} />
          <Route path="/details" element={<MovieDetailContainer />} />
          <Route path="/details/:id" element={<MovieDetailContainer />} />
          <Route path="/register" element={<AddUserContainer />} />
          <Route path="/verify" element={<EmailVerifyContainer />} />
          <Route path="/search" element={<SearchMoviesContainer />} />
          <Route path="/reservation/:id" element={<ReservationContainer />} />

          <Route
            path="/category/:category_id"
            element={<CategoriesSectionContainer />}
          />
          <Route element={<PrivateRoute />}>
            <Route element={<SidebarContainer />}>
              <Route path="/admin" element={<AdminPanelContainer />} />
              <Route path="/adduser" element={<AddUserContainer />} />
              <Route path="/movie" element={<AddMovieContainer />} />
              <Route path="/newcategory" element={<AddCategoryContainer />} />
              <Route path="/delete" element={<DeleteMovieContainer/>} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
