import React, { useState } from 'react'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Hero from './Pages/Hero'
import AuthModal from './components/AuthModal'

const AppContent = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('login')
  const [initialResetToken, setInitialResetToken] = useState('')

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if (token) {
      setInitialResetToken(token)
      setModalMode('reset')
      setModalOpen(true)
    }
  }, [])

  const handleOpenAuthModal = (mode = 'login') => {
    setModalMode(mode)
    setModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-slate-50 bg-mesh-pattern text-slate-900 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      <div>
        <Navbar onOpenAuthModal={handleOpenAuthModal} />
        <main>
          <Hero onOpenAuthModal={handleOpenAuthModal} />
        </main>
      </div>

      <footer className="border-t border-slate-200/80 bg-white/60 backdrop-blur-sm py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-semibold text-slate-700">NexusAuth System Active</span>
          </div>
          <p>© 2026 NexusAuth Platform. Built for security, speed, and elegance.</p>
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