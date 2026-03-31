import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Package,
  Calendar,
  ArrowRight
} from 'lucide-react';
import AdminLayout from '../layouts/AdminLayout';

const Dashboard = () => {
  const stats = [
    { title: 'Total Sales', value: '$128,430', change: '+12.5%', isUp: true, icon: <ShoppingBag size={24} />, color: 'bg-indigo-50 text-indigo-600' },
    { title: 'Total Revenue', value: '$94,220', change: '+8.2%', isUp: true, icon: <DollarSign size={24} />, color: 'bg-green-50 text-green-600' },
    { title: 'Total Stocks', value: '12,450', change: '-3.1%', isUp: false, icon: <Package size={24} />, color: 'bg-orange-50 text-orange-600' },
    { title: 'Total Users', value: '45,210', change: '+15.4%', isUp: true, icon: <Users size={24} />, color: 'bg-purple-50 text-purple-600' },
  ];

  const recentTrans = [
    { id: 1, user: 'John Doe', amount: '$120.00', status: 'Completed', date: '2026-03-31' },
    { id: 2, user: 'Sarah Smith', amount: '$85.50', status: 'Pending', date: '2026-03-31' },
    { id: 3, user: 'Mike Johnson', amount: '$240.00', status: 'Completed', date: '2026-03-30' },
    { id: 4, user: 'Emily Davis', amount: '$56.00', status: 'Cancelled', date: '2026-03-30' },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-stone-900">Welcome back, Admin!</h2>
            <p className="text-stone-500 mt-1">Here is what's happening with your store today.</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-stone-200 rounded-xl text-stone-600 hover:bg-stone-50 shadow-sm transition-colors">
            <Calendar size={18} />
            <span className="text-sm font-medium">Last 30 Days</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.color}`}>
                  {stat.icon}
                </div>
                <div className={`flex items-center space-x-1 text-sm font-bold ${stat.isUp ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.isUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div>
                <p className="text-stone-500 text-sm font-medium">{stat.title}</p>
                <h3 className="text-3xl font-bold text-stone-900 mt-1">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sales Performance Card */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-stone-900">Sales Performance</h3>
              <select className="bg-stone-50 border-none text-sm font-medium text-stone-500 rounded-lg px-3 py-1 outline-none">
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
            </div>
            {/* Placeholder for Chart */}
            <div className="h-64 bg-stone-50/50 rounded-2xl flex items-end justify-between px-6 pb-4 space-x-2">
              {[40, 70, 45, 90, 65, 80, 50, 75, 60, 85, 55, 95].map((height, i) => (
                <div key={i} className="flex-1 max-w-[24px] bg-indigo-500 rounded-t-lg transition-all hover:bg-indigo-600 cursor-pointer group relative" style={{ height: `${height}%` }}>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ${height * 100}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-stone-100">
              <div className="flex items-center space-x-8">
                <div>
                  <p className="text-stone-400 text-xs font-medium uppercase tracking-wider">This Week</p>
                  <p className="text-xl font-bold text-stone-900">$24,500</p>
                </div>
                <div>
                  <p className="text-stone-400 text-xs font-medium uppercase tracking-wider">Last Week</p>
                  <p className="text-xl font-bold text-stone-900">$18,200</p>
                </div>
              </div>
              <button className="flex items-center space-x-2 text-indigo-600 font-bold text-sm hover:translate-x-1 transition-transform">
                <span>View Full Report</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Recent Transactions Card */}
          <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
            <h3 className="text-xl font-bold text-stone-900 mb-6">Recent Transactions</h3>
            <div className="space-y-6">
              {recentTrans.map((trans) => (
                <div key={trans.id} className="flex items-center justify-between group cursor-pointer hover:bg-stone-50 -mx-2 px-2 py-2 rounded-xl transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-stone-100 rounded-full border border-stone-200 flex items-center justify-center font-bold text-stone-400 text-xs">
                      {trans.user.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-stone-900">{trans.user}</p>
                      <p className="text-xs text-stone-400 font-medium">{trans.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-stone-900">{trans.amount}</p>
                    <p className={`text-[10px] font-bold uppercase ${
                      trans.status === 'Completed' ? 'text-green-600' : 
                      trans.status === 'Pending' ? 'text-orange-600' : 'text-red-600'
                    }`}>{trans.status}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 rounded-2xl border border-stone-200 text-sm font-bold text-stone-600 hover:bg-stone-50 transition-colors">
              View All Transactions
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
