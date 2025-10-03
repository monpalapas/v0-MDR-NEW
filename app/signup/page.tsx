"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password || !fullName) {
      setError("Please fill in all fields")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      console.log("[v0] Attempting signup for email:", email)
      const supabase = createClient()

      if (!supabase) {
        throw new Error("Failed to initialize Supabase client")
      }

      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/admin`,
          data: {
            full_name: fullName,
          },
        },
      })

      if (authError) {
        console.error("[v0] Signup error:", authError)
        throw authError
      }

      console.log("[v0] Signup successful, user:", data.user?.email)
      setSuccess(true)

      // Redirect after a short delay to show success message
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (error: unknown) {
      console.error("[v0] Signup failed:", error)
      if (error instanceof Error) {
        if (error.message.includes("User already registered")) {
          setError("An account with this email already exists. Please log in instead.")
        } else if (error.message.includes("Password should be at least")) {
          setError("Password must be at least 6 characters long.")
        } else {
          setError(error.message)
        }
      } else {
        setError("An unexpected error occurred during signup. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-check text-white text-3xl"></i>
          </div>
          <h2 className="text-3xl font-bold text-blue-950 mb-4">Account Created!</h2>
          <p className="text-gray-600 mb-6">
            Your account has been successfully created. Please check your email to verify your account.
          </p>
          <p className="text-sm text-gray-500">Redirecting to login page...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen gap-12 w-full max-w-6xl mx-auto">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 flex-col items-center text-center text-white">
        <div className="relative mb-8">
          <div className="w-48 h-48 bg-yellow-500 rounded-full opacity-20 absolute -top-6 -left-6"></div>
          <div className="w-48 h-48 bg-blue-950 rounded-full opacity-20 absolute -bottom-6 -right-6"></div>
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-8 border-yellow-500 floating-animation flex items-center justify-center">
            <i className="fas fa-user-plus text-yellow-500 text-7xl"></i>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Join MDRRMO</h1>
        <p className="text-xl max-w-md opacity-90">
          Create an account to access disaster management resources and stay informed about emergency updates
        </p>
        <div className="mt-8 flex items-center justify-center space-x-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-3 animate-pulse">
              <i className="fas fa-bell text-blue-950"></i>
            </div>
            <div className="text-left">
              <p className="font-semibold">Stay Informed</p>
              <p className="text-sm opacity-80">Real-time Alerts</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
              <i className="fas fa-hands-helping text-blue-950"></i>
            </div>
            <div className="text-left">
              <p className="font-semibold">Get Involved</p>
              <p className="text-sm opacity-80">Community Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 max-w-md">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl transform transition-all hover:shadow-3xl">
          {/* Mobile Logo */}
          <div className="flex flex-col items-center mb-8 lg:hidden">
            <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-user-plus text-blue-950 text-3xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-blue-950">Create Account</h2>
            <p className="text-gray-600 mt-2">Join our community</p>
          </div>

          {/* Desktop Logo */}
          <div className="hidden lg:block text-center mb-8">
            <h2 className="text-3xl font-bold text-blue-950">Create Account</h2>
            <p className="text-gray-600 mt-2">Sign up to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name Field */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                <i className="fas fa-user mr-2 text-blue-950"></i>Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-950 focus:outline-none focus:ring-3 focus:ring-blue-950/10 transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                <i className="fas fa-envelope mr-2 text-blue-950"></i>Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-950 focus:outline-none focus:ring-3 focus:ring-blue-950/10 transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                <i className="fas fa-lock mr-2 text-blue-950"></i>Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-950 focus:outline-none focus:ring-3 focus:ring-blue-950/10 transition-all duration-300 pr-12"
                  placeholder="Create a password"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-blue-950 transition-colors duration-200"
                  >
                    <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                <i className="fas fa-lock mr-2 text-blue-950"></i>Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-950 focus:outline-none focus:ring-3 focus:ring-blue-950/10 transition-all duration-300"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Sign Up Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-950 to-blue-800 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-800 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>Creating Account...
                  </>
                ) : (
                  <>
                    <i className="fas fa-user-plus mr-2"></i>Sign Up
                  </>
                )}
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-blue-950 hover:text-blue-700">
                  Sign In
                </Link>
              </p>
            </div>

            {/* Security Notice */}
            <div className="text-center text-xs text-gray-500 pt-4">
              <p>
                <i className="fas fa-shield-alt mr-1"></i>
                Your information is securely encrypted
              </p>
            </div>
          </form>

          {/* Emergency Contact */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600">Need help? Contact support:</p>
              <div className="mt-2 flex justify-center space-x-4">
                <a href="tel:911" className="text-blue-950 hover:text-blue-700">
                  <i className="fas fa-phone mr-1"></i>911
                </a>
                <span className="text-gray-300">|</span>
                <a href="mailto:support@mdrrmo.gov.ph" className="text-blue-950 hover:text-blue-700">
                  <i className="fas fa-envelope mr-1"></i>support@mdrrmo.gov.ph
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
