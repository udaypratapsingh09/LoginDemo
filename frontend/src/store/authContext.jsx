import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create AuthContext
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [cookies, removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  // Verify the user on app load
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.token) {
        setUsername(null);
        setUserId(null);
        return;
      }

      try {
        setPending(true);
        const { data } = await axios.post(
          `${API_BASE_URL}/auth/`,
          {},
          { withCredentials: true }
        );
        setPending(false);
        const { success, verified } = data;
        console.log(data);
        if (success) {
          setUsername(data.username);
          setUserId(data.userId);
          setEmailVerified(data.verified);
          if (!verified) {
            toast.error("Please verify your account before proceding");
            navigate("/");
          }
        } else {
          removeCookie("token");
          setEmailVerified(data.verified);
          toast.dismiss();
          if (path != "/signup" && path != "/login") {
            toast.error("You need to login");
            navigate("/login");
          }
        }
      } catch (error) {
        setPending(false);
        console.error("Auth verification failed:", error);
        removeCookie("token");
        toast.error("Auth failed");
        navigate("/login");
      }
    };

    verifyUser();
  }, [cookies, navigate, removeCookie, path]);

  // Logout Function
  const logout = () => {
    removeCookie("token");
    setUsername(null);
    setUserId(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        userId,
        emailVerified,
        pending,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Use AuthContext
export const useAuth = () => useContext(AuthContext);
