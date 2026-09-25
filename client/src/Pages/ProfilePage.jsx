import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import AddressCard from '../components/AddressCard';
import { getAddresses, addAddress, deleteAddress, setDefaultAddress } from '../services/addressService';
import { changePassword, updateProfile } from '../services/userService';

const ProfilePage = ({ onOpenAuthModal }) => {
  const { user, accessToken, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'addresses', 'password'

  // User Profile Form
  const [profileData, setProfileData] = useState({ name: user?.name || '', phone: user?.phone || '' });
  const [profileMsg, setProfileMsg] = useState('');

  // Password Form
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordMsg, setPasswordMsg] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  // Addresses
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
  });
  const [addressMsg, setAddressMsg] = useState('');

  useEffect(() => {
    if (user) {
      setProfileData({ name: user.name || '', phone: user.phone || '' });
    }
  }, [user]);

  const loadAddresses = async () => {
    if (!accessToken) return;
    try {
      const res = await getAddresses(accessToken);
      if (res.data) setAddresses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (accessToken && activeTab === 'addresses') {
      loadAddresses();
    }
  }, [accessToken, activeTab]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileMsg('');
    try {
      await updateProfile(profileData, accessToken);
      setProfileMsg('Profile updated successfully!');
    } catch (err) {
      setProfileMsg(err.message || 'Error updating profile');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordMsg('');
    setPasswordErr('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordErr('Passwords do not match');
      return;
    }

    try {
      await changePassword(passwordData, accessToken);
      setPasswordMsg('Password changed successfully!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setPasswordErr(err.message || 'Error changing password');
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    setAddressMsg('');
    try {
      await addAddress(newAddress, accessToken);
      setAddressMsg('Address added successfully!');
      setShowAddressForm(false);
      setNewAddress({
        fullName: '',
        phone: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
      });
      loadAddresses();
    } catch (err) {
      setAddressMsg(err.message || 'Error adding address');
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await deleteAddress(id, accessToken);
      loadAddresses();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSetDefaultAddress = async (id) => {
    try {
      await setDefaultAddress(id, accessToken);
      loadAddresses();
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4 pt-28">
        <h2 className="text-2xl font-serif font-bold text-stone-900">Sign In Required</h2>
        <p className="text-xs text-stone-500 font-light">Please sign in to view your account details and addresses.</p>
        <button
          onClick={() => onOpenAuthModal('login')}
          className="px-6 py-2.5 bg-stone-900 text-white font-medium text-xs uppercase tracking-wider rounded-md"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-amber-800 font-semibold">Account Dashboard</span>
          <h1 className="text-2xl font-serif text-stone-900 font-bold">{user.name || user.email}</h1>
          <p className="text-xs text-stone-500 font-mono mt-0.5">{user.email} • Role: {user.role}</p>
        </div>
        <button
          onClick={logout}
          className="px-4 py-2 border border-stone-300 text-stone-700 text-xs font-semibold rounded-md hover:bg-stone-100 transition-colors"
        >
          Sign Out
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-stone-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 uppercase tracking-wider border-b-2 ${
            activeTab === 'profile' ? 'border-amber-800 text-amber-900' : 'border-transparent text-stone-400'
          }`}
        >
          Profile Details
        </button>
        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-3 uppercase tracking-wider border-b-2 ${
            activeTab === 'addresses' ? 'border-amber-800 text-amber-900' : 'border-transparent text-stone-400'
          }`}
        >
          Saved Addresses
        </button>
        <button
          onClick={() => setActiveTab('password')}
          className={`pb-3 uppercase tracking-wider border-b-2 ${
            activeTab === 'password' ? 'border-amber-800 text-amber-900' : 'border-transparent text-stone-400'
          }`}
        >
          Security & Password
        </button>
      </div>

      {/* TAB 1: PROFILE DETAILS */}
      {activeTab === 'profile' && (
        <div className="max-w-lg bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <h3 className="font-serif text-stone-900 text-base font-bold">Personal Information</h3>
          {profileMsg && <div className="p-3 bg-amber-50 text-amber-900 text-xs rounded-md">{profileMsg}</div>}

          <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
            <div>
              <label className="block text-stone-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full px-3 py-2 border border-stone-200 rounded-md text-stone-900 focus:outline-none focus:border-amber-800"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">Phone Number</label>
              <input
                type="text"
                placeholder="+1 (555) 000-0000"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-stone-200 rounded-md text-stone-900 focus:outline-none focus:border-amber-800"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-stone-900 hover:bg-black text-white font-medium text-xs uppercase tracking-wider rounded-md"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}

      {/* TAB 2: ADDRESSES */}
      {activeTab === 'addresses' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-stone-900 text-base font-bold">Shipping & Billing Addresses</h3>
            <button
              onClick={() => setShowAddressForm(!showAddressForm)}
              className="px-4 py-2 bg-stone-900 text-white text-xs font-medium uppercase tracking-wider rounded-md"
            >
              {showAddressForm ? 'Cancel' : '+ Add New Address'}
            </button>
          </div>

          {addressMsg && <div className="p-3 bg-amber-50 text-amber-900 text-xs rounded-md">{addressMsg}</div>}

          {showAddressForm && (
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-4 max-w-lg">
              <h4 className="font-serif font-bold text-stone-900 text-sm">New Atelier Delivery Address</h4>
              <form onSubmit={handleAddAddress} className="space-y-3 text-xs">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={newAddress.fullName}
                  onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
                <input
                  type="text"
                  required
                  placeholder="Phone Number"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
                <input
                  type="text"
                  required
                  placeholder="Street Address Line 1"
                  value={newAddress.addressLine1}
                  onChange={(e) => setNewAddress({ ...newAddress, addressLine1: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="Apartment, Suite (Optional)"
                  value={newAddress.addressLine2}
                  onChange={(e) => setNewAddress({ ...newAddress, addressLine2: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <input
                    type="text"
                    required
                    placeholder="State"
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Postal Code"
                    value={newAddress.postalCode}
                    onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber-800 text-white font-medium text-xs uppercase tracking-wider rounded-md"
                >
                  Save Address
                </button>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.length === 0 ? (
              <p className="text-xs text-stone-500 italic col-span-2">No addresses saved yet.</p>
            ) : (
              addresses.map((addr) => (
                <AddressCard
                  key={addr.id}
                  address={{
                    id: addr.id,
                    type: addr.full_name,
                    street: `${addr.address_line1} ${addr.address_line2 || ''}`,
                    city: `${addr.city}, ${addr.state} ${addr.postal_code}`,
                    phone: addr.phone,
                    isDefault: addr.is_default,
                  }}
                  onSelect={() => handleSetDefaultAddress(addr.id)}
                  onDelete={() => handleDeleteAddress(addr.id)}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 3: PASSWORD */}
      {activeTab === 'password' && (
        <div className="max-w-lg bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <h3 className="font-serif text-stone-900 text-base font-bold">Change Password</h3>
          {passwordMsg && <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-md">{passwordMsg}</div>}
          {passwordErr && <div className="p-3 bg-rose-50 text-rose-800 text-xs rounded-md">{passwordErr}</div>}

          <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
            <div>
              <label className="block text-stone-700 font-medium mb-1">Current Password</label>
              <input
                type="password"
                required
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="w-full px-3 py-2 border border-stone-200 rounded-md text-stone-900 focus:outline-none focus:border-amber-800"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">New Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="w-full px-3 py-2 border border-stone-200 rounded-md text-stone-900 focus:outline-none focus:border-amber-800"
              />
            </div>
            <div>
              <label className="block text-stone-700 font-medium mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="w-full px-3 py-2 border border-stone-200 rounded-md text-stone-900 focus:outline-none focus:border-amber-800"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-stone-900 hover:bg-black text-white font-medium text-xs uppercase tracking-wider rounded-md"
            >
              Update Password
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
