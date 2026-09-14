import React, { useState } from 'react'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AuthModal from './components/AuthModal'

const AppContent = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('login')

  const handleOpenAuthModal = (mode = 'login') => {
    setModalMode(mode)
    setModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar onOpenAuthModal={handleOpenAuthModal} />
      <Hero onOpenAuthModal={handleOpenAuthModal} />
      <AuthModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialMode={modalMode}
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