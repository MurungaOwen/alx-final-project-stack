import React, { useState } from 'react';

const TenantDashboard = () => {
  const [activeSection, setActiveSection] = useState('payments');

  const renderSection = () => {
    switch (activeSection) {
      case 'payments':
        return <PaymentsSection />;
      case 'maintenance':
        return <MaintenanceSection />;
      default:
        return <PaymentsSection />;
    }
  };

  return (
    <div className="bg-white min-h-screen p-8">
      <div className="grid grid-cols-12 gap-4">
        {/* Sidebar */}
        <div className="col-span-12 md:col-span-3 bg-purple-600 text-white p-4 rounded-lg">
          <div className="flex items-center mb-6">
            <div className="text-2xl font-bold">Rafiki</div>
          </div>
          <ul>
            <li className="mb-4"><button onClick={() => setActiveSection('payments')} className="w-full text-left py-2 px-4 rounded hover:bg-purple-700">Payments</button></li>
            <li className="mb-4"><button onClick={() => setActiveSection('maintenance')} className="w-full text-left py-2 px-4 rounded hover:bg-purple-700">Maintenance Requests</button></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-span-12 md:col-span-9 p-4">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

const PaymentsSection = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission logic here
    alert(`Payment of ${amount} submitted for phone number ${phoneNumber}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-purple-800 mb-4">Payments</h1>
      <div className="space-y-4">
        <div className="bg-purple-100 p-4 rounded-lg">
          <h2 className="font-bold text-lg text-gray-700 mb-2">Make a Payment</h2>
          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-600">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Amount to Pay</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
                placeholder="Enter amount"
                required
              />
            </div>
            <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded-full">
              Pay Now
            </button>
          </form>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <h2 className="font-bold text-lg text-gray-700 mb-2">Payment History</h2>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span className="text-gray-600">May 2024</span>
              <span className="text-gray-600">$1200</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">April 2024</span>
              <span className="text-gray-600">$1200</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const MaintenanceSection = () => (
  <div>
    <h1 className="text-2xl font-bold text-purple-800 mb-4">Maintenance Requests</h1>
    <div className="space-y-4">
      <div className="bg-purple-100 p-4 rounded-lg">
        <h2 className="font-bold text-lg text-gray-700 mb-2">Submit a New Request</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-600">Issue</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
              placeholder="Describe the issue"
            />
          </div>
          <div>
            <label className="block text-gray-600">Preferred Date</label>
            <input
              type="date"
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
            />
          </div>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-full">
            Submit Request
          </button>
        </form>
      </div>
      <div className="bg-purple-100 p-4 rounded-lg">
        <h2 className="font-bold text-lg text-gray-700 mb-2">Previous Requests</h2>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span className="text-gray-600">Leaky Faucet</span>
            <span className="text-gray-600">Status: Fixed</span>
          </li>
          <li className="flex justify-between">
            <span className="text-gray-600">Broken Window</span>
            <span className="text-gray-600">Status: In Progress</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default TenantDashboard;
