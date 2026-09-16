import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  getAdminStats,
  getAdminUsers,
  updateUserRole,
  toggleUserStatus,
  registerAdminAccount,
} from '../services/adminService'

const AdminDashboard = ({ onOpenAuthModal }) => {
  const { user, accessToken, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('users')

  const [stats, setStats] = useState({ total_users: 0, total_admins: 0, active_users: 0 })
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  // New Admin Form State
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', password: '', phone: '' })
  const [msg, setMsg] = useState('')

  const loadData = async () => {
    if (!accessToken || user?.role !== 'admin') return
    try {
      const [statsData, usersData] = await Promise.all([
        getAdminStats(accessToken),
        getAdminUsers(accessToken),
      ])
      if (statsData?.data) setStats(statsData.data)
      if (usersData?.data) setUsers(usersData.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [user, accessToken])

  // Handle Role Change
  const handleRoleChange = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin'
    await updateUserRole(userId, newRole, accessToken)
    setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)))
  }

  // Handle Status Toggle (Enable/Disable)
  const handleStatusChange = async (userId, currentStatus) => {
    const newStatus = !currentStatus
    await toggleUserStatus(userId, newStatus, accessToken)
    setUsers(users.map((u) => (u.id === userId ? { ...u, is_active: newStatus } : u)))
  }

  // Create Admin Submit
  const handleCreateAdmin = async (e) => {
    e.preventDefault()
    setMsg('')
    try {
      await registerAdminAccount(newAdmin, accessToken)
      setMsg('Admin account created successfully!')
      setNewAdmin({ name: '', email: '', password: '', phone: '' })
      loadData()
      setActiveTab('users')
    } catch (err) {
      setMsg(err.message || 'Error creating admin')
    }
  }

  // Access check
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Admin Access Required</h2>
        <p className="text-sm text-slate-500">You must be logged in as an Administrator to view this dashboard.</p>
        {!user && (
          <button
            onClick={() => onOpenAuthModal('login')}
            className="px-6 py-2.5 bg-indigo-600 text-white font-semibold text-xs rounded-lg uppercase tracking-wider"
          >
            Sign In
          </button>
        )}
      </div>
    )
  }

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-12 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-xs text-slate-500">Manage registered users and system administrators.</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-600 font-medium">{user.email} (Admin)</span>
          <button onClick={logout} className="px-3 py-1.5 bg-rose-50 text-rose-600 text-xs font-semibold rounded-md border border-rose-200">
            Logout
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold uppercase">Total Users</div>
          <div className="text-2xl font-bold text-slate-900 mt-1">{stats.total_users || 0}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold uppercase">Total Admins</div>
          <div className="text-2xl font-bold text-indigo-600 mt-1">{stats.total_admins || 0}</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-semibold uppercase">Active Accounts</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">{stats.active_users || 0}</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-4 border-b border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-2 border-b-2 uppercase tracking-wider ${
            activeTab === 'users' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500'
          }`}
        >
          Users List ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('create')}
          className={`pb-2 border-b-2 uppercase tracking-wider ${
            activeTab === 'create' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500'
          }`}
        >
          + Add New Admin
        </button>
      </div>

      {/* TAB 1: USERS LIST */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-72 px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-indigo-500 text-slate-900"
          />

          <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
                  <th className="p-3">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-400">Loading users...</td>
                  </tr>
                ) : filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono text-slate-400">#{u.id}</td>
                    <td className="p-3 font-medium text-slate-900">{u.name}</td>
                    <td className="p-3 text-slate-600">{u.email}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        u.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        u.is_active ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'
                      }`}>
                        {u.is_active ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => handleRoleChange(u.id, u.role)}
                        className="px-2 py-1 text-[10px] font-semibold border rounded bg-white hover:bg-slate-50 text-slate-700"
                      >
                        {u.role === 'admin' ? 'Make User' : 'Make Admin'}
                      </button>
                      <button
                        onClick={() => handleStatusChange(u.id, u.is_active)}
                        className={`px-2 py-1 text-[10px] font-semibold border rounded ${
                          u.is_active ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                        }`}
                      >
                        {u.is_active ? 'Disable' : 'Enable'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: CREATE ADMIN */}
      {activeTab === 'create' && (
        <div className="max-w-md bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Add New Administrator</h2>
          
          {msg && <div className="p-3 text-xs bg-indigo-50 text-indigo-700 rounded-md">{msg}</div>}

          <form onSubmit={handleCreateAdmin} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Name</label>
              <input
                type="text"
                required
                placeholder="Admin Name"
                value={newAdmin.name}
                onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-md text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Email</label>
              <input
                type="email"
                required
                placeholder="admin@gmail.com"
                value={newAdmin.email}
                onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                className="w-full px-3 py-2 border rounded-md text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="Password123!"
                value={newAdmin.password}
                onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                className="w-full px-3 py-2 border rounded-md text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Phone (Optional)</label>
              <input
                type="text"
                placeholder="1234567890"
                value={newAdmin.phone}
                onChange={(e) => setNewAdmin({ ...newAdmin, phone: e.target.value })}
                className="w-full px-3 py-2 border rounded-md text-slate-900 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 text-white font-semibold rounded-md uppercase tracking-wider hover:bg-indigo-700"
            >
              Create Admin Account
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
