import React from 'react';
import "../styles/feature.css";
const FeatureSection = () => {
  return (
    <section className="py-12 bg-gray-50 features">
      <div className="container mx-auto px-4">
        <div className='border w-fit border-purple-600 p-2 m-2 hover:rounded-lg'>What we offer</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 content">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center ">
            <div className="mb-4">
              <img src="/interface.svg" alt="" className=''/>
            </div>
            <h3 className="text-xl font-semibold mb-4">Effortlessly manage your rental properties and track rent payments with our user-friendly interface.</h3>
            <p className="mb-4">Our platform connects tenants, landlords, and service providers, streamlining the rental process.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="mb-4">
              <img src="/rent.svg" alt="" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Access a wide range of services for your rental property needs.</h3>
            <p className="mb-4">Find plumbers, painters, water suppliers, and garbage collection with ease.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="mb-4">
              <img src="/goals.svg" alt="" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Stay organized and keep track of your property maintenance and repairs.</h3>
            <p className="mb-4">Efficiently manage service requests and ensure timely resolution.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
