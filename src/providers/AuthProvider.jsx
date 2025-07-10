import { createContext, useContext, useEffect, useState } from "react";
import { getUser, loginUser } from "../services/api";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async ({ email, password }) => {
    const user = await loginUser({ email, password });
    console.log(user);
    setUser(user.user);
  };
  
  const getUserState = async () => {
    const userDetails = await getUser();
    setUser(userDetails.user)
}

  useEffect(() => {
    console.log({insideUser:user})
    if (!user) {
    getUserState()
   }
  }, [user]);

  const logout = () => {
    window.location.href = "/login";
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(";").forEach((cookie) => {
      const name = cookie.split("=")[0].trim();
      document.cookie =
        name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
