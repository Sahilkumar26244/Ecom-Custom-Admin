import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Save,
  CheckCircle2
} from 'lucide-react';
import AdminLayout from '../layouts/AdminLayout';

const Settings = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'Sahil',
    lastName: 'Admin',
    email: 'sahil@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, India',
    bio: 'Experienced E-commerce Administrator managing product catalogs and store performance.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop'
  });

  const handleSave = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <AdminLayout title="Settings">
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        {/* Success Toast */}
        {showSuccess && (
          <div className="fixed top-24 right-8 z-[60] bg-white border-l-4 border-emerald-500 shadow-2xl rounded-2xl p-4 flex items-center space-x-4 animate-in slide-in-from-right duration-300">
            <div className="p-2 bg-emerald-50 text-emerald-500 rounded-xl">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="font-bold text-stone-900">Success!</p>
              <p className="text-sm text-stone-500">Profile changes saved successfully.</p>
            </div>
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
          <div className="h-32 bg-gradient-to-r from-indigo-500 to-violet-600"></div>
          <div className="px-8 pb-8">
            <div className="relative -mt-16 mb-6 inline-block">
              <div className="w-32 h-32 rounded-3xl border-4 border-white overflow-hidden shadow-xl bg-stone-100">
                <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button className="absolute bottom-2 -right-2 p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition-all border-2 border-white">
                <Camera size={18} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-stone-900">{profile.firstName} {profile.lastName}</h2>
                <p className="text-stone-500 font-medium">Administrator</p>
              </div>
              <button 
                onClick={handleSave}
                className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
              >
                <Save size={18} />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm space-y-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-indigo-50 text-indigo-500 rounded-xl">
                <User size={20} />
              </div>
              <h3 className="text-lg font-bold text-stone-900">Personal Info</h3>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">First Name</label>
                  <input 
                    type="text" 
                    value={profile.firstName}
                    onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">Last Name</label>
                  <input 
                    type="text" 
                    value={profile.lastName}
                    onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700">Bio</label>
                <textarea 
                  rows="3"
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-indigo-500 outline-none transition-all resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Contact & Location */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm space-y-6">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-indigo-50 text-indigo-500 rounded-xl">
                  <Mail size={20} />
                </div>
                <h3 className="text-lg font-bold text-stone-900">Contact Details</h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">Email Address</label>
                  <input 
                    type="email" 
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">Phone Number</label>
                  <input 
                    type="text" 
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-sm space-y-6">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-indigo-50 text-indigo-500 rounded-xl">
                  <MapPin size={20} />
                </div>
                <h3 className="text-lg font-bold text-stone-900">Location</h3>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-stone-700">Current Address</label>
                <input 
                  type="text" 
                  value={profile.location}
                  onChange={(e) => setProfile({...profile, location: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Street, City, Country"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;
