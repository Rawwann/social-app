import { useQuery } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode'
import { createContext, useEffect, useState } from "react";
import { getProfileInfo } from '../Services/profile.service';

export const AuthContext = createContext("")

export default function AuthProvider({ children }) {
    const [userToken, setUserToken] = useState(localStorage.getItem("userToken") || null);


    function saveUserToken(token) {
        setUserToken(token);
        localStorage.setItem("userToken", token);
    }

    function removeUserToken() {
        setUserToken(null);
        localStorage.removeItem("userToken");
    }

    // const [userId, setUserId] = useState(null)

    // useEffect(() => {
    //     if (userToken) {
    //         const decoded = jwtDecode(userToken)
    //         console.log(decoded)
    //         setUserId(decoded.user)
    //     }
    // }, [userToken])

    const { data: userInfo, isLoading } = useQuery({
        queryKey: ['user-profile'],
        queryFn: getProfileInfo,
        select: (res) => res.data.data.user,
        enabled: !!userToken
    });


    return (
        <AuthContext.Provider value={{ userToken, saveUserToken, removeUserToken, userInfo, isLoading, userId: userInfo?._id }}>
            {children}
        </AuthContext.Provider>
    )
}