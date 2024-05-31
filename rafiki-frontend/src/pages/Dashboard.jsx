import React, { useState } from 'react';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection />;
      case 'requests':
        return <RequestsSection />;
      case 'tenants':
        return <TenantsSection />;
      case 'property':
        return <PropertySection />;
      case 'reports':
        return <ReportsSection />;
      case 'transactions':
        return <TransactionsSection />;
      default:
        return <DashboardSection />;
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
            <li className="mb-4"><button onClick={() => setActiveSection('dashboard')} className="w-full text-left py-2 px-4 rounded hover:bg-purple-700">Dashboard</button></li>
            <li className="mb-4"><button onClick={() => setActiveSection('requests')} className="w-full text-left py-2 px-4 rounded hover:bg-purple-700">New Requests</button></li>
            <li className="mb-4"><button onClick={() => setActiveSection('tenants')} className="w-full text-left py-2 px-4 rounded hover:bg-purple-700">My Tenants</button></li>
            <li className="mb-4"><button onClick={() => setActiveSection('property')} className="w-full text-left py-2 px-4 rounded hover:bg-purple-700">My Property</button></li>
            <li className="mb-4"><button onClick={() => setActiveSection('reports')} className="w-full text-left py-2 px-4 rounded hover:bg-purple-700">Reports</button></li>
            <li className="mb-4"><button onClick={() => setActiveSection('transactions')} className="w-full text-left py-2 px-4 rounded hover:bg-purple-700">All Transactions</button></li>
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

const DashboardSection = () => (
  <div>
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-purple-800">Dashboard</h1>
        <span className="text-gray-500">23 Mar 2019</span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="font-bold text-lg text-gray-700">$5,000</p>
          <p className="text-sm text-gray-500">Pending</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg text-gray-700">$15,000</p>
          <p className="text-sm text-gray-500">Collected</p>
        </div>
        <div>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-full">Pay Reminder</button>
        </div>
      </div>
    </div>
    {/* Add other dashboard elements here */}
  </div>
);

const RequestsSection = () => (
  <div>
    <h2 className="font-bold text-lg text-purple-800 mb-4">Tenant Request</h2>
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-purple-100 p-2 rounded-lg">
        <div>
          <p className="font-bold text-gray-700">Amelia Kimani</p>
          <p className="text-sm text-gray-500">23 May 2020</p>
        </div>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-full">View</button>
      </div>
      <div className="flex justify-between items-center bg-purple-100 p-2 rounded-lg">
        <div>
          <p className="font-bold text-gray-700">James Makau</p>
          <p className="text-sm text-gray-500">12 May 2020</p>
        </div>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-full">View</button>
      </div>
      <div className="flex justify-between items-center bg-purple-100 p-2 rounded-lg">
        <div>
          <p className="font-bold text-gray-700">Gladys Wanjiru</p>
          <p className="text-sm text-gray-500">23 Mar 2019</p>
        </div>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-full">View</button>
      </div>
    </div>
  </div>
);

const TenantsSection = () => (
  <div>
    <h2 className="font-bold text-lg text-purple-800 mb-4">My Tenants</h2>
    {/* Add tenants section elements here */}
  </div>
);

const PropertySection = () => (
  <div>
    <h2 className="font-bold text-lg text-purple-800 mb-4">My Property</h2>
    {/* Add property section elements here */}
  </div>
);

const ReportsSection = () => (
  <div>
    <h2 className="font-bold text-lg text-purple-800 mb-4">Reports</h2>
    {/* Add reports section elements here */}
  </div>
);

const TransactionsSection = () => (
  <div>
    <h2 className="font-bold text-lg text-purple-800 mb-4">All Transactions</h2>
    {/* Add transactions section elements here */}
  </div>
);

export default Dashboard;
