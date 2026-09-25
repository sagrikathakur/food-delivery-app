import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import CartSidebar from './components/CartSidebar'
import AuthModal from './components/AuthModal'
import ProtectedRoute from './components/ProtectedRoute'
import Footer from './components/Footer'

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

export default function App() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('login')
  const [initialResetToken, setInitialResetToken] = useState('')

  // Shopping Bag / Cart State
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])

  // Check URL query parameters for reset tokens
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const token = params.get('token')
    if (token) {
      setInitialResetToken(token)
      setModalMode('reset')
      setModalOpen(true)
    }
  }, [location.search])

  // Clear cart when user logs out
  useEffect(() => {
    if (!user) {
      setCartItems([])
    }
  }, [user])

  const handleOpenAuthModal = (mode = 'login') => {
    setModalMode(mode)
    setModalOpen(true)
  }

  const handleNavigate = (path) => {
    const targetPath = path.startsWith('/') ? path : `/${path === 'home' ? '' : path}`
    const protectedPaths = ['/checkout', '/tracking', '/profile', '/admin']
    if (!user && protectedPaths.includes(targetPath)) {
      handleOpenAuthModal('login')
      return
    }
    navigate(targetPath)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSelectProduct = (product) => {
    setSelectedProduct(product)
    handleNavigate('/product')
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
      setCartItems((prev) => prev.filter((item) => item.id !== id))
      return
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    )
  }

  const handleRemoveCartItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const isHome = location.pathname === '/' || location.pathname === '/home'

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col justify-between selection:bg-amber-800 selection:text-white relative font-sans">
      <div>
        <Navbar
          onOpenAuthModal={handleOpenAuthModal}
          currentView={location.pathname}
          onNavigate={handleNavigate}
          cartCount={totalCartCount}
          onOpenCart={handleOpenCart}
          transparent={isHome}
        />

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero onOpenAuthModal={handleOpenAuthModal} onNavigate={handleNavigate} />
                  <Home
                    onAddToCart={handleAddToCart}
                    onSelectProduct={handleSelectProduct}
                    onNavigate={handleNavigate}
                  />
                </>
              }
            />
            <Route
              path="/fragrances"
              element={
                <Fragrances
                  onAddToCart={handleAddToCart}
                  onSelectProduct={handleSelectProduct}
                />
              }
            />
            <Route
              path="/collections"
              element={
                <Collections
                  onAddToCart={handleAddToCart}
                  onSelectProduct={handleSelectProduct}
                />
              }
            />
            <Route
              path="/product"
              element={
                <Product
                  product={selectedProduct}
                  onAddToCart={handleAddToCart}
                  onSelectProduct={handleSelectProduct}
                  onNavigate={handleNavigate}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute onOpenAuthModal={handleOpenAuthModal} title="Checkout">
                  <CheckoutPage
                    cartItems={cartItems}
                    onOrderCompleted={() => {
                      setCartItems([])
                      handleNavigate('/tracking')
                    }}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tracking"
              element={
                <ProtectedRoute onOpenAuthModal={handleOpenAuthModal} title="Tracking">
                  <OrderTrackingPage onContinueShopping={() => handleNavigate('/fragrances')} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute onOpenAuthModal={handleOpenAuthModal} title="Profile">
                  <ProfilePage onOpenAuthModal={handleOpenAuthModal} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute onOpenAuthModal={handleOpenAuthModal} title="Admin">
                  <AdminDashboard onOpenAuthModal={handleOpenAuthModal} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>

      <Footer onNavigate={handleNavigate} />

      {/* Shopping Bag Drawer */}
      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setCartOpen(false)
          handleNavigate('/checkout')
        }}
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