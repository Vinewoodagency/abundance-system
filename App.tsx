import React, { useState } from 'react';
import Dashboard from './components/Dashboard.tsx';
import TalentList from './components/TalentList.tsx';
import BookingForm from './components/BookingForm.tsx';

type View = 'dashboard' | 'talents' | 'booking';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-purple-600">Abundance CRM</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'dashboard'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView('talents')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'talents'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Talents
              </button>
              <button
                onClick={() => setCurrentView('booking')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'booking'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                New Booking
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'talents' && <TalentList />}
        {currentView === 'booking' && <BookingForm />}
      </main>
    </div>
  );
}

export default App;
