import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Stats {
  totalTalents: number;
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
}

function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalTalents: 0,
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      
      const talentsRes = await axios.get(`${API_URL}/api/talents`);
      const bookingsRes = await axios.get(`${API_URL}/api/bookings`);
      
      const talents = talentsRes.data || [];
      const bookings = bookingsRes.data || [];
      
      const pending = bookings.filter((b: any) => b.status === 'pending').length;
      const confirmed = bookings.filter((b: any) => b.status === 'confirmed').length;

      setStats({
        totalTalents: talents.length,
        totalBookings: bookings.length,
        pendingBookings: pending,
        confirmedBookings: confirmed,
      });
    } catch (err) {
      setError('Failed to load dashboard stats');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-red-600 text-center py-12">{error}</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h2>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Talents */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Talents</dt>
            <dd className="mt-1 text-3xl font-extrabold text-gray-900">{stats.totalTalents}</dd>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Bookings</dt>
            <dd className="mt-1 text-3xl font-extrabold text-gray-900">{stats.totalBookings}</dd>
          </div>
        </div>

        {/* Pending Bookings */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>
            <dd className="mt-1 text-3xl font-extrabold text-yellow-600">{stats.pendingBookings}</dd>
          </div>
        </div>

        {/* Confirmed Bookings */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Confirmed</dt>
            <dd className="mt-1 text-3xl font-extrabold text-green-600">{stats.confirmedBookings}</dd>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="space-y-2 text-gray-600">
          <p>✓ View all talents and their availability</p>
          <p>✓ Create new bookings for events</p>
          <p>✓ Track booking status and revenue</p>
          <p>✓ Manage talent information and contacts</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
