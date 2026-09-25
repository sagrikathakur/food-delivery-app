import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import perfumeModalImg from '../assets/Elegant Perfume and Flowers Still Life.png'

const AuthModal = ({ isOpen, onClose, initialMode = 'login', initialToken = '' }) => {
  const { login, register, forgotPassword, resetPassword } = useAuth()
  const [mode, setMode] = useState(initialMode) // 'login', 'register', 'forgot', 'reset'
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    resetToken: initialToken,
    newPassword: '',
    confirmPassword: '',
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

    if (mode === 'reset' && formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      if (mode === 'login') {
        await login({ email: formData.email, password: formData.password })
        onClose()
      } else if (mode === 'register') {
        await register(formData)
        setSuccessMsg('Account created successfully!')
        await login({ email: formData.email, password: formData.password })
        onClose()
      } else if (mode === 'forgot') {
        const res = await forgotPassword(formData.email)
        setSuccessMsg(res.message || 'Password reset link sent.')
      } else if (mode === 'reset') {
        const res = await resetPassword(formData.resetToken, formData.newPassword, formData.confirmPassword)
        setSuccessMsg(res.message || 'Password updated! Please sign in.')
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
    setShowPassword(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col md:flex-row overflow-hidden relative border border-stone-200 animate-modal-in">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition-colors"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Left Side: Elegant Perfume Image Panel */}
        <div className="hidden md:flex md:w-5/12 relative bg-stone-900 overflow-hidden min-h-[420px]">
          <img
            src={perfumeModalImg}
            alt="Ocean Parfums"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle natural vignette */}
          <div className="absolute inset-0 bg-stone-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/20" />

          <div className="relative z-10 p-6 flex flex-col justify-end text-white space-y-1">
            <span className="text-[10px] tracking-widest uppercase text-stone-300 font-medium">
              Ocean Parfums
            </span>
            <h3 className="font-serif text-lg font-light leading-snug">
              Sign in to manage your account and orders.
            </h3>
          </div>
        </div>

        {/* Right Side: Elegant Form Panel */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between bg-white">
          <div>
            <div className="mb-5">
              <h2 className="text-xl font-serif font-bold text-stone-900 tracking-tight">
                {mode === 'login' && 'Sign in'}
                {mode === 'register' && 'Create Account'}
                {mode === 'forgot' && 'Reset Password'}
                {mode === 'reset' && 'Set New Password'}
              </h2>
              <p className="text-xs text-stone-500 mt-1 font-light">
                {mode === 'login' && 'Enter your email and password to log in.'}
                {mode === 'register' && 'Enter your information to create an account.'}
                {mode === 'forgot' && 'Enter your email to receive password reset instructions.'}
                {mode === 'reset' && 'Enter your reset token and new password.'}
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-lg">
                {error}
              </div>
            )}

            {/* Success Alert */}
            {successMsg && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs rounded-lg">
                {successMsg}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    className="w-full px-3 py-2 bg-stone-50/50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-800 transition-all placeholder:text-stone-400"
                  />
                </div>
              )}

              {(mode === 'login' || mode === 'register' || mode === 'forgot') && (
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full px-3 py-2 bg-stone-50/50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-800 transition-all placeholder:text-stone-400"
                  />
                </div>
              )}

              {(mode === 'login' || mode === 'register') && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-medium text-stone-700">
                      Password
                    </label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => switchMode('forgot')}
                        className="text-[11px] font-medium text-stone-600 hover:text-stone-900"
                      >
                        Forgot?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                      required
                      minLength={6}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-3 pr-9 py-2 bg-stone-50/50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-800 transition-all placeholder:text-stone-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 text-xs"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
              )}

              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 bg-stone-50/50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-800 transition-all placeholder:text-stone-400"
                  />
                </div>
              )}

              {mode === 'reset' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Reset Token
                    </label>
                    <input
                      type="text"
                      name="resetToken"
                      required
                      value={formData.resetToken}
                      onChange={handleChange}
                      placeholder="Paste reset token"
                      className="w-full px-3 py-2 bg-stone-50/50 border border-stone-200 rounded-lg text-xs font-mono text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-800 transition-all placeholder:text-stone-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="newPassword"
                        required
                        minLength={6}
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full pl-3 pr-9 py-2 bg-stone-50/50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-800 transition-all placeholder:text-stone-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600 text-xs"
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      required
                      minLength={6}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-3 pr-9 py-2 bg-stone-50/50 border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900/10 focus:border-stone-800 transition-all placeholder:text-stone-400"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-medium tracking-wider uppercase rounded-lg text-xs transition-colors disabled:opacity-50 mt-2 shadow-xs"
              >
                {loading
                  ? 'Please wait...'
                  : mode === 'login'
                  ? 'Sign in'
                  : mode === 'register'
                  ? 'Create account'
                  : mode === 'forgot'
                  ? 'Send reset link'
                  : 'Update password'}
              </button>
            </form>
          </div>

          {/* Footer Navigation */}
          <div className="mt-6 text-center text-xs text-stone-500 pt-3 border-t border-stone-100">
            {mode === 'login' && (
              <p>
                Don't have an account?{' '}
                <button
                  onClick={() => switchMode('register')}
                  className="text-stone-900 font-semibold hover:underline"
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
                  className="text-stone-900 font-semibold hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}

            {(mode === 'forgot' || mode === 'reset') && (
              <div className="flex justify-between items-center text-[11px]">
                <button
                  onClick={() => switchMode('login')}
                  className="text-stone-900 font-semibold hover:underline"
                >
                  &larr; Back to sign in
                </button>
                {mode === 'forgot' && (
                  <button
                    onClick={() => switchMode('reset')}
                    className="text-stone-900 font-semibold hover:underline"
                  >
                    Enter reset token
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthModal
