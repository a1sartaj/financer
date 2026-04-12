import React, { ChangeEvent,  useState } from "react";
import {  LoginInput } from "../types/types";
import axiosInstance from "../api/axiosInstance";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";


const Login = () => {

    const [loginData, setLoginData] = useState<LoginInput>(
        {
            email: '',
            password: ''
        }
    )
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!loginData.email || !loginData.password) {
            setError('All fields are requred')
            return;
        }

        try {
            setLoading(true)

            const response = await axiosInstance.post('/financer/login', loginData)
            setUser(response?.data?.user)
            navigate('/')
            toast.success(response?.data?.message)

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(error?.response?.data)
                setError(error?.response?.data?.message)
            } else {
                console.error(error)
            }
        } finally {
            setLoading(false)
        }

    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value })
        setError(null)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">

            {/* Card */}
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-sm">

                {/* Title */}
                <h1 className="text-2xl font-bold text-text-primary text-center">
                    Welcome Back
                </h1>
                <p className="text-text-secondary text-center mt-1">
                    Login to your finance dashboard
                </p>

                {/* Form */}
                <div className="mt-6 space-y-4">

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-text-secondary mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            name="email"
                            onChange={handleOnChange}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm text-text-secondary mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 rounded-lg border border-border bg-background text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            name="password"
                            onChange={handleOnChange}
                        />
                    </div>

                    {/* Login Button */}
                    <button disabled={loading} type="submit" className="w-full bg-primary hover:bg-primary-light text-white py-2 rounded-lg font-medium transition">
                        Login
                    </button>

                    {/* Error field */}
                    {error && <p className="text-red-500 text-xs -mt-3">{error}</p>}

                </div>

                {/* Footer */}
                <p className="text-center text-sm text-text-secondary mt-6">
                    Don't have an account?{" "}
                    <a href="https://www.a1sartaj.in" target="_black" className="text-primary cursor-pointer hover:underline">
                        Contact Admin
                    </a>
                </p>

            </form>
        </div>
    );
};

export default Login;