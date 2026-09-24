import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Talent {
  id: number;
  name: string;
}

interface FormData {
  talent_id: string;
  client_name: string;
  booking_date: string;
  location: string;
  rate: string;
  status: string;
}

function BookingForm() {
  const [talents, setTalents] = useState<Talent[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    talent_id: '',
    client_name: '',
    booking_date: '',
    location: '',
    rate: '',
    status: 'pending',
  });

  useEffect(() => {
    fetchTalents();
  }, []);

  const fetchTalents = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const res = await axios.get(`${API_URL}/api/talents`);
      setTalents(res.data || []);
    } catch (err) {
      setError('Failed to load talents');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      
      await axios.post(`${API_URL}/api/bookings`, {
        talent_id: parseInt(formData.talent_id),
        client_name: formData.client_name,
        booking_date: formData.booking_date,
        location: formData.location,
        rate: parseFloat(formData.rate),
        status: formData.status,
      });

      setSubmitted(true);
      setFormData({
        talent_id: '',
        client_name: '',
        booking_date: '',
        location: '',
        rate: '',
        status: 'pending',
      });

      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError('Failed to create booking');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Create New Booking</h2>

      <div className="bg-white shadow rounded-lg p-8 max-w-2xl">
        {submitted && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
            Booking created successfully!
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Talent Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Talent *</label>
            <select
              name="talent_id"
              value={formData.talent_id}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
            >
              <option value="">Select a talent</option>
              {talents.map((talent) => (
                <option key={talent.id} value={talent.id}>
                  {talent.name}
                </option>
              ))}
            </select>
          </div>

          {/* Client Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Client Name *</label>
            <input
              type="text"
              name="client_name"
              value={formData.client_name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
              placeholder="Enter client name"
            />
          </div>

          {/* Booking Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Booking Date *</label>
            <input
              type="datetime-local"
              name="booking_date"
              value={formData.booking_date}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
              placeholder="Enter event location"
            />
          </div>

          {/* Rate */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Rate ($) *</label>
            <input
              type="number"
              name="rate"
              value={formData.rate}
              onChange={handleChange}
              required
              step="0.01"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
              placeholder="0.00"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md font-medium hover:bg-purple-700"
          >
            Create Booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
