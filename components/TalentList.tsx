import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Talent {
  id: number;
  name: string;
  email: string;
  phone: string;
  category: string;
  status: string;
  notes?: string;
  created_at: string;
}

function TalentList() {
  const [talents, setTalents] = useState<Talent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchTalents();
  }, [categoryFilter, statusFilter]);

  const fetchTalents = async () => {
    try {
      setLoading(true);
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const params = new URLSearchParams();
      
      if (categoryFilter) params.append('category', categoryFilter);
      if (statusFilter) params.append('status', statusFilter);
      
      const res = await axios.get(`${API_URL}/api/talents?${params}`);
      setTalents(res.data || []);
    } catch (err) {
      setError('Failed to load talents');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-12">Loading talents...</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Talent Management</h2>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="">All Categories</option>
              <option value="actor">Actor</option>
              <option value="dancer">Dancer</option>
              <option value="model">Model</option>
              <option value="singer">Singer</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="">All Statuses</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
              <option value="retired">Retired</option>
            </select>
          </div>
        </div>
      </div>

      {/* Talents Table */}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {talents.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No talents found. Add your first talent to get started.
                </td>
              </tr>
            ) : (
              talents.map((talent) => (
                <tr key={talent.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{talent.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{talent.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{talent.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {talent.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      talent.status === 'available' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {talent.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TalentList;
