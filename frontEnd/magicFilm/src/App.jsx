import "./assets/fonts/fonts.css";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ReservationContextReducerProvider from "./context/ReservationContextReducer ";

function App() {
  return (
    <BrowserRouter>
   
      <AuthContextProvider>
      <ReservationContextReducerProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AppRoutes />
        </LocalizationProvider>
        </ReservationContextReducerProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
