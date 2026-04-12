import { createContext, useEffect, useState } from "react";
import { AuthContextType, User } from "../types/types";
import axiosInstance from "../api/axiosInstance";
import axios, { isAxiosError } from "axios";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)


    const fetchUser = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.get('/financer/get-me')
            setUser(response?.data?.user)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(error?.response?.data)
            } else {
                console.error(error)
            }
            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const handleLogout = async () => {
        try {
            const response = await axiosInstance.post('/financer/logout')

            setUser(null)
        
            
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error)
            } else {
                console.log(error)
            }
        }
    }

    const value = {
        user, setUser,
        loading, setLoading,
        handleLogout
    }

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider>
    )
}