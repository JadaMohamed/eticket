import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('profile AuthContext:')
        console.log(profile);
    }, [profile])


    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const { data } = await axios.get(`${apiUrl}/api/user/profile`, { withCredentials: true });
                setProfile(data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchUserProfile();
    }, []);

    //To test you can use:
    // Admin:      Email: davidwang@example.com , Pass: password789
    // Organizer:  Email: organizer@example.com , Pass: organizerpassword
    // Client:     Email: bobsmith@example.com  , Pass: password789

    const login = async (payload) => {
        try {
            const apiResponse = await axios.post(
                `${apiUrl}/api/user/login`,
                payload,
                { withCredentials: true }
            );
            setProfile(apiResponse.data);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    const logout = async () => {
        await axios.get(`${apiUrl}/api/user/logout`,
            { withCredentials: true }
        );
        setProfile(null);
    }

    return (
        <AuthContext.Provider value={{ profile, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
