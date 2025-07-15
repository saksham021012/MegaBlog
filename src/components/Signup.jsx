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
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <Logo width="120px" />
                    </div>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                        <p className="text-gray-600">Join us and get started today</p>
                    </div>

                    {/* Login redirect */}
                    <div className="text-center mb-6">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200">
                                Sign In
                            </Link>
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center text-sm text-red-700 font-medium">
                                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9a1 1 0 012 0v4a1 1 0 11-2 0V9zm1-5a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit(create)} className="space-y-6">
                        {/* Name */}
                        <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            disabled={isLoading}
                            className={errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
                            {...register("name", {
                                required: "Full name is required",
                                minLength: { value: 2, message: "Name must be at least 2 characters" },
                                maxLength: { value: 50, message: "Name must be less than 50 characters" },
                                pattern: {
                                    value: /^[a-zA-Z\s]+$/,
                                    message: "Name can only contain letters and spaces"
                                }
                            })}
                        />
                        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}

                        {/* Email */}
                        <Input
                            label="Email Address"
                            placeholder="Enter your email"
                            type="email"
                            disabled={isLoading}
                            className={errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Please enter a valid email address"
                                }
                            })}
                        />
                        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}

                        {/* Password */}
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            disabled={isLoading}
                            className={errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 8, message: "Password must be at least 8 characters" },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                                    message: "Password must include uppercase, lowercase, number, and special character"
                                }
                            })}
                        />
                        {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}

                        {/* Password Strength */}
                        <div className="space-y-1 text-xs text-gray-600">
                            <div className={password?.length >= 8 ? 'text-green-600' : ''}>• At least 8 characters</div>
                            <div className={/[A-Z]/.test(password) ? 'text-green-600' : ''}>• One uppercase letter</div>
                            <div className={/[a-z]/.test(password) ? 'text-green-600' : ''}>• One lowercase letter</div>
                            <div className={/\d/.test(password) ? 'text-green-600' : ''}>• One number</div>
                            <div className={/[@$!%*?&]/.test(password) ? 'text-green-600' : ''}>• One special character</div>
                        </div>

                        {/* Confirm Password */}
                        <Input
                            label="Confirm Password"
                            type="password"
                            placeholder="Confirm your password"
                            disabled={isLoading}
                            className={errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
                            {...register("confirmPassword", {
                                required: "Please confirm your password",
                                validate: value => value === password || "Passwords do not match"
                            })}
                        />
                        {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>}

                        {/* Terms */}
                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                className="mt-1 mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
                                disabled={isLoading}
                                {...register("acceptTerms", {
                                    required: "You must accept the terms and conditions"
                                })}
                            />
                            <span className="text-sm text-gray-600">
                                I agree to the{' '}
                                <Link to="/terms" className="text-blue-600 hover:text-blue-500">Terms of Service</Link>{' '}
                                and{' '}
                                <Link to="/privacy" className="text-blue-600 hover:text-blue-500">Privacy Policy</Link>
                            </span>
                        </div>
                        {errors.acceptTerms && <p className="text-sm text-red-600">{errors.acceptTerms.message}</p>}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isLoading || isSubmitting}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg disabled:opacity-50"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin mr-2 h-5 w-5 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
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
                        By creating an account, you agree to our terms and conditions.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup
