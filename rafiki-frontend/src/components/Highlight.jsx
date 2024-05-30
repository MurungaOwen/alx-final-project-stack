import React from 'react';
import "../styles/highlight.css";
const HighlightSection = () => {
  return (
    <section className="py-12 bg-gray-50 highlight">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">
              Streamline Rent Payments and Property Management with Our Platform
            </h2>
            <p className="mb-4">
              Our platform simplifies the process of rent payment and property management, providing streamlined solutions for both tenants and landlords.
            </p>
            <ul className="list-disc list-inside mb-4 ml-2">
              <li>Secure rent payments</li>
              <li>Real-time updates</li>
              <li>Efficient service request resolution</li>
            </ul>
            <a href="#" className="border border-purple-700  px-4 py-2 mt-3 hover:rounded-lg">Get Started</a>
          </div>
          <div className="md:w-1/2">
            <img src="/success.svg" alt="Platform Screenshot" className="w-fit h-80 rounded-1/2 shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightSection;
