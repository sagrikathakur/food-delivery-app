import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  loginUser,
  registerUser,
  logoutUser,
  logoutAllUser,
  refreshToken as refreshTokenService,
  getCurrentUser,
  forgotPassword as forgotPasswordService,
  resetPassword as resetPasswordService,
} from '../services/authService'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Try to restore session on app initial load via HttpOnly refresh cookie
  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await refreshTokenService()
        if (res.data?.accessToken) {
          setAccessToken(res.data.accessToken)
          const userRes = await getCurrentUser(res.data.accessToken)
          setUser(userRes.data)
        }
      } catch (err) {
        // Unauthenticated on initial load is expected if not logged in
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (credentials) => {
    setError(null)
    try {
      const res = await loginUser(credentials)
      const { user: userData, accessToken: token } = res.data
      setUser(userData)
      setAccessToken(token)
      return res
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const register = async (userData) => {
    setError(null)
    try {
      const res = await registerUser(userData)
      // Automatically log in after registration or prompt login
      return res
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const forgotPassword = async (email) => {
    setError(null)
    try {
      return await forgotPasswordService(email)
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const resetPassword = async (token, newPassword) => {
    setError(null)
    try {
      return await resetPasswordService(token, newPassword)
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const logout = async () => {
    try {
      await logoutUser()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      setUser(null)
      setAccessToken(null)
    }
  }

  const logoutAll = async () => {
    try {
      if (accessToken) {
        await logoutAllUser(accessToken)
      }
    } catch (err) {
      console.error('Logout all error:', err)
    } finally {
      setUser(null)
      setAccessToken(null)
    }
  }

  const value = {
    user,
    accessToken,
    loading,
    error,
    login,
    register,
    forgotPassword,
    resetPassword,
    logout,
    logoutAll,
    clearError: () => setError(null),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
