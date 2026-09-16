import React, { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Hero from './Pages/Hero'
import AdminDashboard from './Pages/AdminDashboard'
import AuthModal from './components/AuthModal'

const AppContent = () => {
  const { user } = useAuth()
  const [currentView, setCurrentView] = useState('home') // 'home' or 'admin'
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('login')
  const [initialResetToken, setInitialResetToken] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if (token) {
      setInitialResetToken(token)
      setModalMode('reset')
      setModalOpen(true)
    }
  }, [])

  // Auto switch view to admin if admin user logs in
  useEffect(() => {
    if (user?.role === 'admin') {
      setCurrentView('admin')
    } else {
      setCurrentView('home')
    }
  }, [user])

  const handleOpenAuthModal = (mode = 'login') => {
    setModalMode(mode)
    setModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-slate-50 bg-mesh-pattern text-slate-900 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <div>
        <Navbar
          onOpenAuthModal={handleOpenAuthModal}
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view)}
        />
        <main>
          {currentView === 'admin' ? (
            <AdminDashboard onOpenAuthModal={handleOpenAuthModal} />
          ) : (
            <Hero onOpenAuthModal={handleOpenAuthModal} />
          )}
        </main>
      </div>

      <footer className="border-t border-slate-200/80 bg-white/60 backdrop-blur-sm py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-medium text-slate-700">Ocean Parfums Studio</span>
          <p>© 2026 Ocean Parfums. All rights reserved.</p>
        </div>
      </footer>

      <AuthModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialMode={modalMode}
        initialToken={initialResetToken}
      />
    </div>
  )
}

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App