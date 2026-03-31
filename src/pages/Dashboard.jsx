import React from 'react';
import { LayoutDashboard, Package, Users, ShoppingCart } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard icon={<Package size={24} />} title="Total Products" value="124" color="bg-blue-50 text-blue-600" />
        <StatsCard icon={<ShoppingCart size={24} />} title="Recent Orders" value="45" color="bg-green-50 text-green-600" />
        <StatsCard icon={<Users size={24} />} title="Customers" value="1,205" color="bg-purple-50 text-purple-600" />
        <StatsCard icon={<Package size={24} />} title="Stock Alerts" value="12" color="bg-red-50 text-red-600" />
      </div>
      
      <div className="mt-12 bg-white p-8 rounded-3xl shadow-sm border border-stone-100">
        <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
        <p className="text-stone-500 italic">No recent activity to show.</p>
      </div>
    </div>
  );
};

const StatsCard = ({ icon, title, value, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex items-center space-x-4">
    <div className={`p-3 rounded-xl ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-stone-500 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-stone-900">{value}</h3>
    </div>
  </div>
);

export default Dashboard;
