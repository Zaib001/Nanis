import { createContext, useContext, useState } from "react";
import { loginUser } from "../services/api";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async ({ email, password }) => {
      const user = await loginUser({ email, password });
      console.log(user);
      setUser(user);
 };

  const logout = () => {
    window.location.href = "/login";
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach((cookie) => {
      const name = cookie.split("=")[0].trim();
      document.cookie =
        name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    });
  };

  return <AuthContext.Provider value={{ login, logout, user }}>{children}</AuthContext.Provider>;
}


export function useAuth()  {
  return useContext(AuthContext);
}
