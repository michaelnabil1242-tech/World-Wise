import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const storedUser = JSON.parse(localStorage.getItem("user"));
const intialState = {
  user: storedUser,
  isAuthenticated: Boolean(storedUser),
  error: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    case "error":
      return { ...state, error: "the email or password doesn't match" };
    default:
      throw new Error("the action is unknown ");
  }
}
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, error }, dispatch] = useReducer(
    reducer,
    intialState,
  );
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
      localStorage.setItem("user", JSON.stringify(FAKE_USER));
    } else dispatch({ type: "error" });
  }
  function logout() {
    dispatch({ type: "logout" });
    localStorage.removeItem("user");
  }
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("the useAuth is used outside the provider range");
  return context;
}
export { AuthProvider, useAuth };
