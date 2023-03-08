import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [profile, setProfile] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("profile AuthContext:");
    console.log(profile);
  }, [profile]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/user/profile`, {
          withCredentials: true,
        });

        setLoggedIn(true);
        setProfile(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProfile();
  }, []);

  //To test you can use:
  // Admin:      Email: admin@gmail.com , Pass: password
  // Organizer:  Email: organizer@gmail.com , Pass: password
  // Client:     Email: client@gmail.com  , Pass: password

  const login = async (payload) => {
    try {
      const apiResponse = await axios.post(
        `${apiUrl}/api/user/login`,
        payload,
        { withCredentials: true }
      );
      setLoggedIn(true);
      setProfile(apiResponse.data);
      if (apiResponse.data.profile.account.account_type) {
        switch (apiResponse.data.profile.account.account_type) {
          case "client":
            navigate("/");
            break;
          case "organizer":
            navigate("/organizer/dashboard");
            break;
          case "admin":
            navigate("/admin");
            break;
          default:
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    console.log("Signing out.....");

    await axios.get(`${apiUrl}/api/user/logout`, { withCredentials: true });
    console.log("Signed out.....");

    setProfile(null);
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ profile, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
