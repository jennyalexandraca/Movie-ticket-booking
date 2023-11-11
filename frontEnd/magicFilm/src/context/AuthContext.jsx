import { createContext, useReducer } from "react";

export const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || {},
  accessToken: localStorage.getItem("token") || "",
};

const dispatchActions = {
  login: "LOGIN",
  logout: "LOGOUT",
};

const authReducer = (state, action) => {
  switch (action.type) {
    case dispatchActions.login:
      localStorage.setItem("token", action.payload.accessToken);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      };
    case dispatchActions.logout:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        user: {},
        accessToken: "",
      };

    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const data = {
    dispatch,
    dispatchActions,
    user: state.user,
    token: state.accessToken,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
