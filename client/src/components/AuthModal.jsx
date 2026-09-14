import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const PasswordRequirements = ({ value = '' }) => {
  const reqs = [
    { label: '6+ characters', valid: value.length >= 6 },
    { label: 'Uppercase letter (A-Z)', valid: /[A-Z]/.test(value) },
    { label: 'Lowercase letter (a-z)', valid: /[a-z]/.test(value) },
    { label: 'Number (0-9)', valid: /[0-9]/.test(value) },
    { label: 'Symbol (!@#$)', valid: /[^A-Za-z0-9]/.test(value) },
  ]

  return (
    <div className="mt-2 text-xs space-y-1 text-gray-500 bg-gray-50 p-2.5 rounded-md border border-gray-200">
      <span className="font-semibold text-gray-700 block mb-1">Password Requirements:</span>
      {reqs.map((r, idx) => (
        <div key={idx} className="flex items-center gap-1.5">
          <span className={r.valid ? 'text-green-600 font-bold' : 'text-gray-400'}>
            {r.valid ? '✓' : '•'}
          </span>
          <span className={r.valid ? 'text-green-700 font-medium' : 'text-gray-600'}>
            {r.label}
          </span>
        </div>
      ))}
    </div>
  )
}

const AuthModal = ({ isOpen, onClose, initialMode = 'login', initialToken = '' }) => {
  const { login, register, forgotPassword, resetPassword } = useAuth()
  const [mode, setMode] = useState(initialMode) // 'login', 'register', 'forgot', 'reset'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    resetToken: initialToken,
    newPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  React.useEffect(() => {
    if (initialToken) {
      setFormData((prev) => ({ ...prev, resetToken: initialToken }))
      setMode('reset')
    }
  }, [initialToken])

  if (!isOpen) return null

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccessMsg('')
    setLoading(true)

    try {
      if (mode === 'login') {
        await login({ email: formData.email, password: formData.password })
        onClose()
      } else if (mode === 'register') {
        await register(formData)
        setSuccessMsg('Registration successful! Logging you in...')
        await login({ email: formData.email, password: formData.password })
        onClose()
      } else if (mode === 'forgot') {
        const res = await forgotPassword(formData.email)
        setSuccessMsg(res.message || 'Password reset link sent to your email.')
      } else if (mode === 'reset') {
        const res = await resetPassword(formData.resetToken, formData.newPassword)
        setSuccessMsg(res.message || 'Password reset successfully! Please sign in with your new password.')
        setMode('login')
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const switchMode = (newMode) => {
    setMode(newMode)
    setError('')
    setSuccessMsg('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          {mode === 'login' && 'Welcome Back'}
          {mode === 'register' && 'Create an Account'}
          {mode === 'forgot' && 'Forgot Password'}
          {mode === 'reset' && 'Reset Password'}
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          {mode === 'login' && 'Enter your credentials to access your account'}
          {mode === 'register' && 'Fill in your details to get started'}
          {mode === 'forgot' && 'Enter your email address to receive password reset instructions'}
          {mode === 'reset' && 'Enter your reset token and new password'}
        </p>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
            {error}
          </div>
        )}

        {/* Success Alert */}
        {successMsg && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-md">
            {successMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          )}

          {(mode === 'login' || mode === 'register' || mode === 'forgot') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          )}

          {(mode === 'login' || mode === 'register') && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => switchMode('forgot')}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <input
                type="password"
                name="password"
                required
                minLength={6}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              {mode === 'register' && <PasswordRequirements value={formData.password} />}
            </div>
          )}

          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 234 567 890"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          )}

          {mode === 'reset' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reset Token
                </label>
                <input
                  type="text"
                  name="resetToken"
                  required
                  value={formData.resetToken}
                  onChange={handleChange}
                  placeholder="Paste your 64-character reset token"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  required
                  minLength={6}
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <PasswordRequirements value={formData.newPassword} />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors text-sm disabled:opacity-50"
          >
            {loading
              ? 'Processing...'
              : mode === 'login'
              ? 'Sign In'
              : mode === 'register'
              ? 'Register'
              : mode === 'forgot'
              ? 'Send Reset Token'
              : 'Set New Password'}
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="mt-6 text-center text-sm text-gray-600">
          {mode === 'login' && (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => switchMode('register')}
                className="text-blue-600 font-medium hover:underline focus:outline-none"
              >
                Sign up
              </button>
            </p>
          )}

          {mode === 'register' && (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => switchMode('login')}
                className="text-blue-600 font-medium hover:underline focus:outline-none"
              >
                Log in
              </button>
            </p>
          )}

          {(mode === 'forgot' || mode === 'reset') && (
            <div className="flex justify-between items-center text-xs">
              <button
                onClick={() => switchMode('login')}
                className="text-blue-600 font-medium hover:underline focus:outline-none"
              >
                &larr; Back to Login
              </button>
              {mode === 'forgot' && (
                <button
                  onClick={() => switchMode('reset')}
                  className="text-blue-600 font-medium hover:underline focus:outline-none"
                >
                  Already have a token?
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthModal

