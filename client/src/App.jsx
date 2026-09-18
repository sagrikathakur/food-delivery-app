import React, { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import CartSidebar from './components/CartSidebar'
import AuthModal from './components/AuthModal'
import ProtectedRoute from './components/ProtectedRoute'

import Hero from './Pages/Hero'
import Home from './Pages/Home'
import Fragrances from './Pages/Fragrances'
import Collections from './Pages/Collections'
import About from './Pages/About'
import Product from './Pages/Product'
import CheckoutPage from './Pages/CheckoutPage'
import OrderTrackingPage from './Pages/OrderTrackingPage'
import ProfilePage from './Pages/ProfilePage'
import AdminDashboard from './Pages/AdminDashboard'

const PROTECTED_VIEWS = ['checkout', 'tracking', 'profile', 'admin']

const AppContent = () => {
  const { user } = useAuth()
  const [currentView, setCurrentView] = useState('home')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('login')
  const [initialResetToken, setInitialResetToken] = useState('')

  // Shopping Bag / Cart State
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if (token) {
      setInitialResetToken(token)
      setModalMode('reset')
      setModalOpen(true)
    }
  }, [])

  // Clear cart when user logs out
  useEffect(() => {
    if (!user) {
      setCartItems([])
    }
  }, [user])

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

  const handleNavigate = (view) => {
    if (!user && PROTECTED_VIEWS.includes(view)) {
      handleOpenAuthModal('login')
      return
    }
    setCurrentView(view)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSelectProduct = (product) => {
    setSelectedProduct(product)
    setCurrentView('product')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenCart = () => {
    if (!user) {
      handleOpenAuthModal('login')
      return
    }
    setCartOpen(true)
  }

  const handleAddToCart = (product) => {
    if (!user) {
      handleOpenAuthModal('login')
      return false
    }

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id || item.name === product.name)
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id || item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [
        ...prev,
        {
          id: product.id || `item_${Date.now()}`,
          name: product.name,
          size: product.size || '100 ml',
          price: Number(product.price) || 0,
          quantity: 1,
          image: product.image,
        },
      ]
    })
    setCartOpen(true)
    return true
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
    if (!user) {
      handleOpenAuthModal('login')
      return
    }
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
          onNavigate={handleNavigate}
          cartCount={totalCartCount}
          onOpenCart={handleOpenCart}
          transparent={currentView === 'home'}
        />

        <main>
          {currentView === 'home' && (
            <>
              <Hero onOpenAuthModal={handleOpenAuthModal} onNavigate={handleNavigate} />
              <Home
                onAddToCart={handleAddToCart}
                onSelectProduct={handleSelectProduct}
                onNavigate={handleNavigate}
              />
            </>
          )}
          {currentView === 'fragrances' && (
            <Fragrances
              onAddToCart={handleAddToCart}
              onSelectProduct={handleSelectProduct}
            />
          )}
          {currentView === 'collections' && (
            <Collections
              onAddToCart={handleAddToCart}
              onSelectProduct={handleSelectProduct}
            />
          )}
          {currentView === 'product' && (
            <Product
              product={selectedProduct}
              onAddToCart={handleAddToCart}
              onSelectProduct={handleSelectProduct}
              onNavigate={handleNavigate}
            />
          )}
          {currentView === 'about' && <About />}
          {currentView === 'checkout' && (
            <ProtectedRoute
              onOpenAuthModal={handleOpenAuthModal}
              title="Secure Checkout"
              description="Sign in to complete your order and save your shipping addresses."
            >
              <CheckoutPage cartItems={cartItems} onOrderCompleted={handleOrderCompleted} />
            </ProtectedRoute>
          )}
          {currentView === 'tracking' && (
            <ProtectedRoute
              onOpenAuthModal={handleOpenAuthModal}
              title="Order Tracking"
              description="View live tracking updates for your recent fragrance purchases."
            >
              <OrderTrackingPage onContinueShopping={() => handleNavigate('fragrances')} />
            </ProtectedRoute>
          )}
          {currentView === 'profile' && (
            <ProtectedRoute
              onOpenAuthModal={handleOpenAuthModal}
              title="Member Profile & Addresses"
              description="Manage your account profile, saved delivery addresses, and preferences."
            >
              <ProfilePage onOpenAuthModal={handleOpenAuthModal} />
            </ProtectedRoute>
          )}
          {currentView === 'admin' && (
            <ProtectedRoute
              onOpenAuthModal={handleOpenAuthModal}
              title="Admin Dashboard"
              description="Administrator access required."
            >
              <AdminDashboard onOpenAuthModal={handleOpenAuthModal} />
            </ProtectedRoute>
          )}
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
            <button onClick={() => handleNavigate('fragrances')} className="hover:text-amber-800 cursor-pointer">
              Fragrances
            </button>
            <button onClick={() => handleNavigate('collections')} className="hover:text-amber-800 cursor-pointer">
              Collections
            </button>
            <button onClick={() => handleNavigate('about')} className="hover:text-amber-800 cursor-pointer">
              About Us
            </button>
            <button onClick={() => handleNavigate('profile')} className="hover:text-amber-800 cursor-pointer">
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
        onOpenAuthModal={handleOpenAuthModal}
        user={user}
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