import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting },
        watch
    } = useForm()

    // Watch password for confirmation validation
    const password = watch("password")

    const create = async (data) => {
        setError("")
        setIsLoading(true)
        
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const currentUser = await authService.getCurrentUser()
                if (currentUser) {
                    dispatch(login(currentUser))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message || "Account creation failed. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                    {/* Logo Section */}
                    <div className="flex justify-center mb-8">
                        <Logo width="120px" />
                    </div>
                    
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            Create Account
                        </h2>
                        <p className="text-gray-600">
                            Join us and get started today
                        </p>
                    </div>
                    
                    {/* Sign In Link */}
                    <div className="text-center mb-6">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200"
                            >
                                Sign In
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
                    <form onSubmit={handleSubmit(create)} className="space-y-6">
                        {/* Full Name Field */}
                        <div>
                            <Input
                                label="Full Name"
                                placeholder="Enter your full name"
                                disabled={isLoading}
                                className={`transition-all duration-200 ${
                                    errors.name 
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                }`}
                                {...register("name", {
                                    required: "Full name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Name must be at least 2 characters long"
                                    },
                                    maxLength: {
                                        value: 50,
                                        message: "Name must be less than 50 characters"
                                    },
                                    pattern: {
                                        value: /^[a-zA-Z\s]+$/,
                                        message: "Name can only contain letters and spaces"
                                    }
                                })}
                            />
                            {errors.name && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        
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
                                        message: "Please enter a valid email address"
                                    }
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
                                        value: 8,
                                        message: "Password must be at least 8 characters long"
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                                        message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                                    }
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
                            {/* Password Strength Indicator */}
                            <div className="mt-2">
                                <div className="text-xs text-gray-500">
                                    Password must contain:
                                </div>
                                <div className="mt-1 space-y-1">
                                    <div className={`text-xs flex items-center ${
                                        password && password.length >= 8 ? 'text-green-600' : 'text-gray-400'
                                    }`}>
                                        <span className="mr-1">•</span>
                                        At least 8 characters
                                    </div>
                                    <div className={`text-xs flex items-center ${
                                        password && /[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-400'
                                    }`}>
                                        <span className="mr-1">•</span>
                                        One uppercase letter
                                    </div>
                                    <div className={`text-xs flex items-center ${
                                        password && /[a-z]/.test(password) ? 'text-green-600' : 'text-gray-400'
                                    }`}>
                                        <span className="mr-1">•</span>
                                        One lowercase letter
                                    </div>
                                    <div className={`text-xs flex items-center ${
                                        password && /\d/.test(password) ? 'text-green-600' : 'text-gray-400'
                                    }`}>
                                        <span className="mr-1">•</span>
                                        One number
                                    </div>
                                    <div className={`text-xs flex items-center ${
                                        password && /[@$!%*?&]/.test(password) ? 'text-green-600' : 'text-gray-400'
                                    }`}>
                                        <span className="mr-1">•</span>
                                        One special character
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Confirm Password Field */}
                        <div>
                            <Input
                                label="Confirm Password"
                                type="password"
                                placeholder="Confirm your password"
                                disabled={isLoading}
                                className={`transition-all duration-200 ${
                                    errors.confirmPassword 
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                }`}
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) => value === password || "Passwords do not match"
                                })}
                            />
                            {errors.confirmPassword && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>
                        
                        {/* Terms and Conditions */}
                        <div>
                            <label className="flex items-start">
                                <input
                                    type="checkbox"
                                    disabled={isLoading}
                                    className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    {...register("acceptTerms", {
                                        required: "You must accept the terms and conditions"
                                    })}
                                />
                                <span className="text-sm text-gray-600">
                                    I agree to the{" "}
                                    <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                                        Terms of Service
                                    </Link>{" "}
                                    and{" "}
                                    <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
                                        Privacy Policy
                                    </Link>
                                </span>
                            </label>
                            {errors.acceptTerms && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    {errors.acceptTerms.message}
                                </p>
                            )}
                        </div>
                        
                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isLoading || isSubmitting}
                            className="w-full bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 py-3 text-lg font-semibold"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating Account...
                                </div>
                            ) : (
                                "Create Account"
                            )}
                        </Button>
                    </form>
                </div>
                
                {/* Footer */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        By creating an account, you agree to our terms and conditions
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup