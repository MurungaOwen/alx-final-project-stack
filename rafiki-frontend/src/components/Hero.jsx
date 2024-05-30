import React from 'react';
export default function Hero() {
  return (
    <div className="hero bg-cover bg-center" style={{ backgroundImage: "url('/pattern.svg')" }}>
      <div className="container mx-auto px-4 py-16 flex flex-row items-center justify-between"> {/* flex-row for all devices */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold text-white leading-tight">Simplify Rent</h1>
          <p className="text-xl text-purple-500 mt-4">Welcome to Rafiki property manager..</p>
          <p className="text-base text-gray-500 mt-4">Our platform connects tenants and landlords, making rent payments hassle-free and transparent. Easily track which houses have been paid and manage services like plumbing, painting, water supply, and garbage collection.</p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-6 focus:outline-none">Get Started</button>
        </div>
        <div className="w-1/2 md:flex justify-center items-center hidden">
          <img src="/hero1.svg" alt="" className="w-3/4"/>
        </div>
      </div>
    </div>
  );
}
