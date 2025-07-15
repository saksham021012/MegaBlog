import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting } 
    } = useForm();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const login = async (data) => {
        setError("");
        setIsLoading(true);
        
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin(userData));
                    navigate("/");
                }
            }
        } catch (error) {
            setError(error.message || "Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                    {/* Logo Section */}
                    <div className="flex justify-center mb-8">
                        <Logo width="120px" />
                    </div>
                    
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Welcome Back
                        </h2>
                        <p className="text-gray-600">
                            Sign in to your account
                        </p>
                    </div>
                    
                    {/* Sign Up Link */}
                    <div className="text-center mb-6">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                    
                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <p className="text-red-700 text-sm font-medium">{error}</p>
                            </div>
                        </div>
                    )}
                    
                    {/* Form */}
                    <form onSubmit={handleSubmit(login)} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <Input
                                label="Email Address"
                                placeholder="Enter your email"
                                type="email"
                                disabled={isLoading}
                                className={`transition-all duration-200 ${
                                    errors.email 
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                }`}
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Please enter a valid email address",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        
                        {/* Password Field */}
                        <div>
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                disabled={isLoading}
                                className={`transition-all duration-200 ${
                                    errors.password 
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                }`}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters long",
                                    },
                                })}
                            />
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        
                        {/* Forgot Password Link */}
                        <div className="text-right">
                            <Link
                                to="/forgot-password"
                                className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                        
                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isLoading || isSubmitting}
                            className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 py-3 text-lg font-semibold"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </div>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </form>
                </div>
                
                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        By signing in, you agree to our{" "}
                        <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;