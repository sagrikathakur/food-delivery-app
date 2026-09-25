import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  getAdminStats,
  getAdminUsers,
  updateUserRole,
  toggleUserStatus,
  registerAdminAccount,
} from '../services/adminService';
import {
  getStoredProducts,
  addProductToCatalog,
  removeProductFromCatalog,
} from '../utils/catalogStorage';

const AdminDashboard = ({ onOpenAuthModal }) => {
  const { user, accessToken, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Backend Stats & Users state
  const [stats, setStats] = useState({ total_users: 0, total_admins: 0, active_users: 0 });
  const [users, setUsers] = useState([]);
  const [userSearch, setUserSearch] = useState('');
  const [loadingUsers, setLoadingUsers] = useState(true);

  // Products State
  const [products, setProducts] = useState(getStoredProducts());
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [notification, setNotification] = useState('');

  // Form for New Product
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    category: 'Aquatic & Fresh',
    family: 'Aquatic',
    price: '',
    size: '100 ml / 3.4 fl. oz.',
    concentration: 'Eau de Parfum',
    notes: '',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600',
    description: '',
    tag: 'New Release',
  });

  // Admin Registration State
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '', phone: '' });
  const [adminMsg, setAdminMsg] = useState('');

  // Analytics Graph Timeframe & Hover State
  const [chartTimeframe, setChartTimeframe] = useState('7d');
  const [hoveredDataPoint, setHoveredDataPoint] = useState(null);

  // Mock Orders State (COD Orders)
  const [orders, setOrders] = useState([
    {
      id: 'ORD-9821',
      customer: 'Sophia Loren',
      email: 'sophia@example.com',
      items: 'Oceanic Breeze (x1), Velvet Amber (x1)',
      total: 280.00,
      payment: 'Cash on Delivery',
      date: '2026-09-25',
      status: 'Processing',
    },
    {
      id: 'ORD-9820',
      customer: 'Alexander Wright',
      email: 'alex.w@example.com',
      items: 'Midnight Rose & Oud (x1)',
      total: 195.00,
      payment: 'Cash on Delivery',
      date: '2026-09-24',
      status: 'Shipped',
    },
    {
      id: 'ORD-9819',
      customer: 'Elena Rostova',
      email: 'elena@example.com',
      items: 'Smoked Wood & Saffron (x2)',
      total: 420.00,
      payment: 'Cash on Delivery',
      date: '2026-09-23',
      status: 'Delivered',
    },
    {
      id: 'ORD-9818',
      customer: 'Marcus Vance',
      email: 'marcus@example.com',
      items: 'Solar Citrus & Bergamot (x1)',
      total: 110.00,
      payment: 'Cash on Delivery',
      date: '2026-09-22',
      status: 'Pending',
    },
  ]);

  // Load backend data
  const loadData = async () => {
    if (!accessToken || !isAdminUser) return;
    try {
      const [statsData, usersData] = await Promise.all([
        getAdminStats(accessToken),
        getAdminUsers(accessToken),
      ]);
      if (statsData?.data) setStats(statsData.data);
      if (usersData?.data) setUsers(usersData.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const isAdminUser = user && (user.role === 'admin' || ['nupur@gmail.com', 'admin@gmail.com', 'sanusingh@gmail.com'].includes(user.email?.toLowerCase()));

  useEffect(() => {
    loadData();
    const syncCatalog = () => setProducts(getStoredProducts());
    window.addEventListener('ocean_catalog_updated', syncCatalog);
    return () => window.removeEventListener('ocean_catalog_updated', syncCatalog);
  }, [user, accessToken]);

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  // User Status Toggle
  const handleStatusChange = async (userId, currentStatus) => {
    const newStatus = !currentStatus;
    await toggleUserStatus(userId, newStatus, accessToken);
    setUsers(users.map((u) => (u.id === userId ? { ...u, is_active: newStatus } : u)));
    showToast(`User status ${newStatus ? 'enabled' : 'disabled'}`);
  };

  // Admin Registration Submit
  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    setAdminMsg('');
    try {
      await registerAdminAccount(newAdmin, accessToken);
      setAdminMsg('Administrator account provisioned successfully.');
      setNewAdmin({ name: '', email: '', password: '', phone: '' });
      loadData();
    } catch (err) {
      setAdminMsg(err.message || 'Error creating admin account.');
    }
  };

  // Product Handlers
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProductForm.name || !newProductForm.price) {
      alert('Please fill in Fragrance Name and Price.');
      return;
    }

    const updated = addProductToCatalog({
      name: newProductForm.name,
      category: newProductForm.category,
      family: newProductForm.family || newProductForm.category,
      price: Number(newProductForm.price),
      size: newProductForm.size,
      concentration: newProductForm.concentration,
      notes: newProductForm.notes || 'Botanical extracts & fragrance oils',
      image: newProductForm.image || 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600',
      description: newProductForm.description || 'Artisanal perfume formulation blended in small batches.',
      tag: newProductForm.tag || 'New Release',
      rating: 5.0,
      reviewsCount: 1,
    });

    setProducts(updated);
    setShowAddModal(false);
    setNewProductForm({
      name: '',
      category: 'Aquatic & Fresh',
      family: 'Aquatic',
      price: '',
      size: '100 ml / 3.4 fl. oz.',
      concentration: 'Eau de Parfum',
      notes: '',
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600',
      description: '',
      tag: 'New Release',
    });
    showToast(`"${newProductForm.name}" added to catalog.`);
  };

  const handleRemoveProduct = (productId, productName) => {
    if (window.confirm(`Are you sure you want to remove "${productName}" from the catalog?`)) {
      const updated = removeProductFromCatalog(productId);
      setProducts(updated);
      showToast(`Removed "${productName}" from catalog.`);
    }
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`Order ${orderId} updated to ${newStatus}.`);
  };

  // Graph Datasets
  const graphPoints7d = [
    { label: 'Mon', revenue: 1850, orders: 14 },
    { label: 'Tue', revenue: 2400, orders: 19 },
    { label: 'Wed', revenue: 2100, orders: 16 },
    { label: 'Thu', revenue: 3800, orders: 28 },
    { label: 'Fri', revenue: 4900, orders: 36 },
    { label: 'Sat', revenue: 6200, orders: 45 },
    { label: 'Sun', revenue: 5400, orders: 40 },
  ];

  const graphPoints30d = [
    { label: 'Wk 1', revenue: 14200, orders: 104 },
    { label: 'Wk 2', revenue: 18900, orders: 142 },
    { label: 'Wk 3', revenue: 23600, orders: 178 },
    { label: 'Wk 4', revenue: 28450, orders: 215 },
  ];

  const activeGraphData = chartTimeframe === '7d' ? graphPoints7d : graphPoints30d;
  const maxRevenue = Math.max(...activeGraphData.map((d) => d.revenue));

  // Access Guard
  if (!isAdminUser) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center text-center p-6 space-y-6 bg-stone-50">
        <div className="w-14 h-14 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center justify-center text-stone-700">
          <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div className="space-y-1.5 max-w-sm">
          <h2 className="text-xl font-serif font-bold text-stone-900">Administrator Access Required</h2>
          <p className="text-xs text-stone-500 font-light leading-relaxed">
            Please sign in with an authorized admin account to access the store management dashboard.
          </p>
        </div>
        {!user && (
          <button
            onClick={() => onOpenAuthModal('login')}
            className="px-6 py-2.5 bg-stone-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            Sign In to Admin Portal
          </button>
        )}
      </div>
    );
  }

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email?.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name?.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category?.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.notes?.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pt-24 pb-20">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-xl shadow-xl text-xs flex items-center gap-3 border border-stone-800 transition-all animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
          <span className="font-medium">{notification}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Sleek Minimal Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-stone-200 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-medium text-stone-500 uppercase tracking-wider">
                Admin Control Center
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span className="text-[11px] text-stone-400 font-light">Operational</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Dashboard Overview
            </h1>
          </div>

          {/* Admin Profile & Actions */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 bg-white border border-stone-200 rounded-xl shadow-2xs">
              <div className="w-7 h-7 rounded-full bg-stone-900 text-white text-xs font-semibold flex items-center justify-center font-mono">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-stone-900 leading-none">{user.name || 'Administrator'}</p>
                <p className="text-[10px] text-stone-500 font-mono mt-0.5">{user.email}</p>
              </div>
            </div>

            <button
              onClick={logout}
              type="button"
              className="px-3.5 py-2 text-xs font-semibold text-stone-700 hover:text-white bg-white hover:bg-black border border-stone-200 hover:border-black rounded-xl transition-all cursor-pointer shadow-2xs"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Minimal Navigation Tabs */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
          <div className="flex overflow-x-auto gap-1 border-b sm:border-b-0 border-stone-200 pb-2 sm:pb-0">
            {[
              { id: 'overview', label: 'Analytics' },
              { id: 'products', label: `Catalog (${products.length})` },
              { id: 'orders', label: `Orders (${orders.length})` },
              { id: 'users', label: `Accounts (${users.length})` },
              { id: 'add-admin', label: '+ Provision Admin' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-stone-900 text-white shadow-2xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'products' && (
            <button
              onClick={() => setShowAddModal(true)}
              type="button"
              className="px-4 py-2 bg-stone-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors shadow-2xs shrink-0 cursor-pointer"
            >
              + Add Fragrance
            </button>
          )}
        </div>

        {/* TAB 1: OVERVIEW & ANALYTICS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs space-y-1.5 hover:border-stone-300 transition-all">
                <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Gross Revenue</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-serif font-bold text-stone-900">$28,450.00</span>
                  <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">+18.4%</span>
                </div>
                <p className="text-[11px] text-stone-400 font-light">Fulfilled COD sales</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs space-y-1.5 hover:border-stone-300 transition-all">
                <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Active Catalog</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-serif font-bold text-stone-900">{products.length} Items</span>
                  <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">Live</span>
                </div>
                <p className="text-[11px] text-stone-400 font-light">4 Signature Bestsellers</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs space-y-1.5 hover:border-stone-300 transition-all">
                <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Registered Users</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-serif font-bold text-stone-900">{stats.total_users || users.length} Users</span>
                  <span className="text-[11px] font-mono font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200">{stats.total_admins || 2} Admins</span>
                </div>
                <p className="text-[11px] text-stone-400 font-light">{stats.active_users || users.length} active accounts</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-2xs space-y-1.5 hover:border-stone-300 transition-all">
                <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Fulfillment Rate</span>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-serif font-bold text-stone-900">98.2%</span>
                  <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">Optimal</span>
                </div>
                <p className="text-[11px] text-stone-400 font-light">{orders.length} COD orders tracked</p>
              </div>
            </div>

            {/* Revenue Analytics Chart */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-2xs space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-100 pb-4">
                <div>
                  <h3 className="text-lg font-serif font-bold text-stone-900">Sales Trajectory</h3>
                  <p className="text-xs text-stone-500 font-light">Daily revenue performance overview ($).</p>
                </div>

                <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl border border-stone-200/80">
                  <button
                    onClick={() => setChartTimeframe('7d')}
                    className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                      chartTimeframe === '7d' ? 'bg-white text-stone-900 shadow-2xs font-semibold' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    7 Days
                  </button>
                  <button
                    onClick={() => setChartTimeframe('30d')}
                    className={`px-3 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                      chartTimeframe === '30d' ? 'bg-white text-stone-900 shadow-2xs font-semibold' : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    30 Days
                  </button>
                </div>
              </div>

              {/* Smooth Area & Line Graph */}
              <div className="space-y-4">
                <div className="relative w-full h-56 bg-stone-50/50 rounded-xl border border-stone-200/60 p-4 pt-6 overflow-hidden">
                  {/* Subtle Background Grid Lines */}
                  <div className="absolute inset-x-4 inset-y-6 flex flex-col justify-between pointer-events-none opacity-40">
                    <div className="border-b border-dashed border-stone-300 w-full"></div>
                    <div className="border-b border-dashed border-stone-300 w-full"></div>
                    <div className="border-b border-dashed border-stone-300 w-full"></div>
                  </div>

                  <svg viewBox="0 0 600 200" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="chartAreaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1c1917" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#1c1917" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Gradient Fill Path */}
                    {(() => {
                      const n = activeGraphData.length;
                      const dx = 600 / Math.max(1, n - 1);
                      const points = activeGraphData.map((d, i) => {
                        const x = i * dx;
                        const y = 180 - (d.revenue / maxRevenue) * 140;
                        return { x, y, data: d };
                      });

                      const lineD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
                      const areaD = `${lineD} L 600 200 L 0 200 Z`;

                      return (
                        <>
                          <path d={areaD} fill="url(#chartAreaGradient)" />
                          <path d={lineD} fill="none" stroke="#1c1917" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          {points.map((p, i) => (
                            <g key={i} className="group cursor-pointer">
                              <circle
                                cx={p.x}
                                cy={p.y}
                                r="4.5"
                                className="fill-stone-900 stroke-white stroke-2 hover:r-6 transition-all"
                                onMouseEnter={() => setHoveredDataPoint(p.data)}
                                onMouseLeave={() => setHoveredDataPoint(null)}
                              />
                              {hoveredDataPoint?.label === p.data.label && (
                                <foreignObject x={Math.max(10, Math.min(480, p.x - 65))} y={Math.max(5, p.y - 45)} width="130" height="40" className="overflow-visible z-30">
                                  <div className="bg-stone-900 text-white text-[10px] font-mono p-1.5 px-2.5 rounded-lg shadow-lg border border-stone-700 text-center pointer-events-none">
                                    ${p.data.revenue.toLocaleString()} ({p.data.orders} orders)
                                  </div>
                                </foreignObject>
                              )}
                            </g>
                          ))}
                        </>
                      );
                    })()}
                  </svg>
                </div>

                {/* X-Axis Labels */}
                <div className="flex justify-between px-2 text-[11px] font-medium text-stone-500 font-mono">
                  {activeGraphData.map((d, i) => (
                    <span key={i} className={`transition-colors ${hoveredDataPoint?.label === d.label ? 'text-stone-900 font-bold' : ''}`}>
                      {d.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Scent Share Category Distribution */}
              <div className="pt-6 border-t border-stone-100 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Demand Share by Category</span>
                  <span className="text-[11px] text-stone-400 font-light">Based on active customer orders</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-stone-900">Aquatic & Fresh</span>
                      <span className="text-[11px] font-mono font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded-md">42%</span>
                    </div>
                    <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-stone-900 h-full w-[42%] rounded-full"></div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-stone-900">Amber & Spice</span>
                      <span className="text-[11px] font-mono font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md">31%</span>
                    </div>
                    <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-800 h-full w-[31%] rounded-full"></div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-stone-900">Woody & Oud</span>
                      <span className="text-[11px] font-mono font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md">27%</span>
                    </div>
                    <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-stone-700 h-full w-[27%] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CATALOG MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-2xs">
              <input
                type="text"
                placeholder="Search catalog by name or scent notes..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="px-3.5 py-2 text-xs border border-stone-200 rounded-lg bg-stone-50 focus:bg-white focus:outline-none text-stone-900 flex-1"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3.5 py-2 text-xs border border-stone-200 rounded-lg bg-stone-50 focus:bg-white text-stone-800 font-medium cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Aquatic & Fresh">Aquatic & Fresh</option>
                <option value="Amber & Spice">Amber & Spice</option>
                <option value="Floral & Rose">Floral & Rose</option>
                <option value="Woody & Oud">Woody & Oud</option>
                <option value="Citrus & Solar">Citrus & Solar</option>
                <option value="Gourmand & Vanilla">Gourmand & Vanilla</option>
              </select>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase text-[10px] tracking-wider">
                      <th className="p-4">Fragrance</th>
                      <th className="p-4">Category & Notes</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Concentration</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-stone-50/60 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-stone-100 overflow-hidden border border-stone-200 shrink-0">
                              <img src={p.image} alt={p.name} className="w-full h-full object-contain p-1" />
                            </div>
                            <div>
                              <h4 className="font-serif font-bold text-stone-900 text-sm">{p.name}</h4>
                              <span className="text-[11px] text-stone-400 font-light">{p.size || '100 ml'}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-100 text-stone-700 border border-stone-200/80 mb-1">
                            {p.category}
                          </span>
                          <p className="text-[11px] text-stone-500 font-light line-clamp-1">{p.notes}</p>
                        </td>
                        <td className="p-4 font-serif font-bold text-stone-900 text-sm">
                          ${Number(p.price).toFixed(2)}
                        </td>
                        <td className="p-4 text-stone-600 font-medium">
                          {p.concentration || 'Eau de Parfum'}
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleRemoveProduct(p.id, p.name)}
                            className="px-3 py-1.5 text-[11px] font-semibold text-rose-700 hover:text-white bg-rose-50 hover:bg-rose-700 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                            type="button"
                          >
                            Remove Product
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOMER ORDERS */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-2xs">
            <div className="p-5 border-b border-stone-100 flex justify-between items-center">
              <h3 className="font-serif font-bold text-stone-900 text-base">Cash on Delivery Orders</h3>
              <span className="text-xs bg-stone-100 text-stone-800 border border-stone-200 px-3 py-1 rounded-full font-medium">
                {orders.length} Tracked Orders
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase text-[10px] tracking-wider">
                    <th className="p-4">Order ID & Date</th>
                    <th className="p-4">Customer Details</th>
                    <th className="p-4">Items</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-stone-50/60 transition-colors">
                      <td className="p-4">
                        <span className="font-mono font-bold text-stone-900">{o.id}</span>
                        <p className="text-[11px] text-stone-400 font-light">{o.date}</p>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-stone-900">{o.customer}</span>
                        <p className="text-[11px] text-stone-400 font-light">{o.email}</p>
                      </td>
                      <td className="p-4 text-stone-600 font-light max-w-xs">{o.items}</td>
                      <td className="p-4 font-serif font-bold text-stone-900 text-sm">${o.total.toFixed(2)}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                          o.status === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : o.status === 'Shipped'
                            ? 'bg-blue-50 text-blue-800 border border-blue-200'
                            : 'bg-amber-50 text-amber-900 border border-amber-200'
                        }`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <select
                          value={o.status}
                          onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                          className="px-2.5 py-1 text-xs border border-stone-200 rounded-lg bg-white text-stone-800 font-medium cursor-pointer"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: USERS & ACCOUNTS */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center gap-4">
              <input
                type="text"
                placeholder="Search accounts by name or email..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-80 px-3.5 py-2 text-xs border border-stone-200 rounded-lg bg-white focus:outline-none text-stone-900"
              />
              <span className="text-xs text-stone-500 font-light">{filteredUsers.length} Registered Accounts</span>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase text-[10px] tracking-wider">
                      <th className="p-4">ID</th>
                      <th className="p-4">Name</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Role</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-stone-50/60 transition-colors">
                        <td className="p-4 font-mono text-stone-400">#{u.id}</td>
                        <td className="p-4 font-semibold text-stone-900">{u.name}</td>
                        <td className="p-4 text-stone-600">{u.email}</td>
                        <td className="p-4">
                          <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                            u.role === 'admin' ? 'bg-amber-50 text-amber-900 border border-amber-200' : 'bg-stone-100 text-stone-600'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            u.is_active ? 'text-emerald-700 bg-emerald-50' : 'text-rose-700 bg-rose-50'
                          }`}>
                            {u.is_active ? 'Active' : 'Disabled'}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleStatusChange(u.id, u.is_active)}
                            className={`px-3 py-1.5 text-[11px] font-semibold border rounded-lg transition-colors cursor-pointer ${
                              u.is_active
                                ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-black hover:text-white hover:border-black'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-black hover:text-white hover:border-black'
                            }`}
                            type="button"
                          >
                            {u.is_active ? 'Disable Account' : 'Enable Account'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PROVISION NEW ADMIN */}
        {activeTab === 'add-admin' && (
          <div className="max-w-md mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-stone-200/80 shadow-2xs space-y-5">
            <div className="space-y-1">
              <h3 className="text-lg font-serif font-bold text-stone-900">Provision Administrator</h3>
              <p className="text-xs text-stone-500 font-light">Create a new administrator account with full portal privileges.</p>
            </div>

            {adminMsg && (
              <div className="p-3 text-xs bg-stone-900 text-white rounded-lg font-medium">
                {adminMsg}
              </div>
            )}

            <form onSubmit={handleCreateAdmin} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="block text-stone-700 font-semibold">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Administrator Name"
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-stone-900 bg-stone-50/50"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-stone-700 font-semibold">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="admin@gmail.com"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-stone-900 bg-stone-50/50"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-stone-700 font-semibold">Password</label>
                <input
                  type="password"
                  required
                  placeholder="Password"
                  value={newAdmin.password}
                  onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                  className="w-full px-3.5 py-2 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-stone-900 bg-stone-50/50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-stone-900 hover:bg-black text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-2xs"
              >
                Create Admin Account
              </button>
            </form>
          </div>
        )}

        {/* MODAL: ADD FRAGRANCE */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
            <div className="bg-white max-w-xl w-full rounded-2xl shadow-xl border border-stone-200 p-6 sm:p-8 space-y-5 animate-fade-in">
              <div className="flex justify-between items-center border-b border-stone-100 pb-3">
                <h3 className="text-lg font-serif font-bold text-stone-900">Add New Fragrance</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 text-stone-400 hover:text-stone-700 rounded-lg transition-colors cursor-pointer"
                  type="button"
                >
                  <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="block text-stone-700 font-semibold">Fragrance Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Amber Cashmere"
                      value={newProductForm.name}
                      onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-stone-900 bg-stone-50 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-stone-700 font-semibold">Category *</label>
                    <select
                      value={newProductForm.category}
                      onChange={(e) => setNewProductForm({
                        ...newProductForm,
                        category: e.target.value,
                        family: e.target.value,
                      })}
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-stone-900 bg-stone-50 focus:bg-white cursor-pointer"
                    >
                      <option value="Aquatic & Fresh">Aquatic & Fresh</option>
                      <option value="Amber & Spice">Amber & Spice</option>
                      <option value="Floral & Rose">Floral & Rose</option>
                      <option value="Woody & Oud">Woody & Oud</option>
                      <option value="Citrus & Solar">Citrus & Solar</option>
                      <option value="Gourmand & Vanilla">Gourmand & Vanilla</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-stone-700 font-semibold">Price ($) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="165.00"
                      value={newProductForm.price}
                      onChange={(e) => setNewProductForm({ ...newProductForm, price: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-stone-900 bg-stone-50 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-stone-700 font-semibold">Volume / Size</label>
                    <input
                      type="text"
                      placeholder="100 ml / 3.4 fl. oz."
                      value={newProductForm.size}
                      onChange={(e) => setNewProductForm({ ...newProductForm, size: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-stone-900 bg-stone-50 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-stone-700 font-semibold">Scent Notes</label>
                  <input
                    type="text"
                    placeholder="Bergamot, Smoked Cedar, Tonka"
                    value={newProductForm.notes}
                    onChange={(e) => setNewProductForm({ ...newProductForm, notes: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg text-stone-900 bg-stone-50 focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-stone-700 font-semibold">Image URL</label>
                  <input
                    type="url"
                    value={newProductForm.image}
                    onChange={(e) => setNewProductForm({ ...newProductForm, image: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-200 rounded-lg text-stone-900 bg-stone-50 focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-3 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-stone-300 rounded-lg text-stone-700 font-semibold hover:bg-stone-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-stone-900 hover:bg-black text-white font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Publish
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
