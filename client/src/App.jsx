import React, { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import CartSidebar from './components/CartSidebar'
import AuthModal from './components/AuthModal'

import Hero from './Pages/Hero'
import Fragrances from './Pages/Fragrances'
import Collections from './Pages/Collections'
import About from './Pages/About'
import CheckoutPage from './Pages/CheckoutPage'
import OrderTrackingPage from './Pages/OrderTrackingPage'
import ProfilePage from './Pages/ProfilePage'
import AdminDashboard from './Pages/AdminDashboard'

const AppContent = () => {
  const { user } = useAuth()
  const [currentView, setCurrentView] = useState('home')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('login')
  const [initialResetToken, setInitialResetToken] = useState('')

  // Shopping Bag / Cart State
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Oceanic Breeze Eau de Parfum',
      size: '100 ml',
      price: 135.00,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=300',
    },
    {
      id: '2',
      name: 'Velvet Amber & Vanilla',
      size: '50 ml',
      price: 95.00,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=300',
    },
  ])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if (token) {
      setInitialResetToken(token)
      setModalMode('reset')
      setModalOpen(true)
    }
  }, [])

  // Auto switch view to admin if admin user logs in initially
  useEffect(() => {
    if (user?.role === 'admin' && currentView === 'home') {
      setCurrentView('admin')
    }
  }, [user])

  const handleOpenAuthModal = (mode = 'login') => {
    setModalMode(mode)
    setModalOpen(true)
  }

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          size: product.size || '100 ml',
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ]
    })
    setCartOpen(true)
  }

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(id)
      return
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    )
  }

  const handleRemoveCartItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleCheckoutClick = () => {
    setCartOpen(false)
    setCurrentView('checkout')
  }

  const handleOrderCompleted = (orderData) => {
    setCartItems([])
    setCurrentView('tracking')
  }

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col justify-between selection:bg-amber-800 selection:text-white relative">
      <div>
        <Navbar
          onOpenAuthModal={handleOpenAuthModal}
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view)}
          cartCount={totalCartCount}
          onOpenCart={() => setCartOpen(true)}
          transparent={currentView === 'home'}
        />

        <main>
          {currentView === 'home' && <Hero onOpenAuthModal={handleOpenAuthModal} />}
          {currentView === 'fragrances' && <Fragrances onAddToCart={handleAddToCart} />}
          {currentView === 'collections' && <Collections onAddToCart={handleAddToCart} />}
          {currentView === 'about' && <About />}
          {currentView === 'checkout' && (
            <CheckoutPage cartItems={cartItems} onOrderCompleted={handleOrderCompleted} />
          )}
          {currentView === 'tracking' && (
            <OrderTrackingPage onContinueShopping={() => setCurrentView('fragrances')} />
          )}
          {currentView === 'profile' && <ProfilePage onOpenAuthModal={handleOpenAuthModal} />}
          {currentView === 'admin' && <AdminDashboard onOpenAuthModal={handleOpenAuthModal} />}
        </main>
      </div>

      <footer className="border-t border-stone-200/80 bg-white/80 backdrop-blur-sm py-8 text-center text-xs text-stone-500 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-stone-900 text-sm">Ocean Parfums Atelier</span>
            <span className="text-[10px] uppercase tracking-widest text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
              Est. 2020
            </span>
          </div>

          <div className="flex items-center gap-6 text-[11px] font-medium text-stone-600">
            <button onClick={() => setCurrentView('fragrances')} className="hover:text-amber-800">
              Fragrances
            </button>
            <button onClick={() => setCurrentView('collections')} className="hover:text-amber-800">
              Collections
            </button>
            <button onClick={() => setCurrentView('about')} className="hover:text-amber-800">
              About Us
            </button>
            <button onClick={() => setCurrentView('profile')} className="hover:text-amber-800">
              My Profile
            </button>
          </div>

          <p>© 2026 Ocean Parfums. All rights reserved.</p>
        </div>
      </footer>

      {/* Shopping Bag Drawer */}
      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleCheckoutClick}
      />

      {/* Authentication Modal */}
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