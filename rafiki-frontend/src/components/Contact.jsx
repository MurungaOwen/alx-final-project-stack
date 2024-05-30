import React from 'react';

const ContactForm = () => {
  return (
    <div className="flex flex-row items-center justify-center min-h-screen bg-purple-400">
      <div className="image-container w-1/2 overflow-hidden lg:block hidden">
        <img
          className="object-cover w-full h-full"
          src="/in"
          alt="Contact Us"
        />
      </div>
      <div className="form-container w-full lg:w-1/2 bg-white rounded-md shadow-md px-8 py-10">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Contact Us</h2>
        <form>
          <div className="form-group mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-50 rounded-md shadow-sm w-full block px-3 py-2 text-gray-700 border border-gray-300"
              required
            />
          </div>
          <div className="form-group mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-50 rounded-md shadow-sm w-full block px-3 py-2 text-gray-700 border border-gray-300"
              required
            />
          </div>
          <div className="form-group mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="mt-1 focus:outline-none focus:ring focus:ring-purple-500 focus:ring-opacity-50 rounded-md shadow-sm w-full block px-3 py-2 text-gray-700 border border-gray-300 resize-none"
              required
            />
          </div>
          <button
            type="submit"
            className="py-2 px-4 bg-purple-500 text-white font-medium rounded-md shadow focus:outline-none hover:bg-purple-700 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
