// import "../styles/navbar.css";
// import React, { useState } from "react";

// export default function Navbar() {
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleMenu = () => {
//         setIsOpen(!isOpen);
//     };

//     return (
//         <nav className="bg-white shadow-md">
//             <div className="container mx-auto px-3 py-3 flex justify-between items-center">
//                 <div className="logo font-bold text-xl">
//                     Raf<span className="text-purple-600">iki</span>
//                 </div>
//                 <div className="hidden md:flex space-x-4">
//                     <a href="#" className="text-gray-600 hover:text-purple-700">Rent Payment</a>
//                     <a href="#" className="text-gray-600 hover:text-purple-700">Landlord Portal</a>
//                     <a href="#" className="text-gray-600">Service</a>
//                     <a href="#" className="text-gray-600">More <span className="m-1">+</span></a>
//                 </div>
//                 <div className="hidden md:flex">
//                     <button className="bg-white text-gray-800 border border-gray-800 px-4 py-2 mr-2">Log In</button>
//                     <button className="bg-purple-600 text-white px-4 py-2">Sign Up</button>
//                 </div>
//                 <div className="md:hidden">
//                     <button onClick={toggleMenu} className="text-gray-800">
//                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
//                         </svg>
//                     </button>
//                 </div>
//             </div>
//             {isOpen && (
//                 <div className="md:hidden px-2 pt-2 pb-3 space-y-1 text-center">
//                     <a href="#" className="block text-gray-600">Rent Payment</a>
//                     <a href="#" className="block text-gray-600">Landlord Portal</a>
//                     <a href="#" className="block text-gray-600">Service</a>
//                     <a href="#" className="block text-gray-600">More <span className="m-1">+</span></a>
//                     <button className="w-2/3 bg-white text-gray-800 border border-gray-800 px-4 py-2 mt-2">Log In</button>
//                     <button className="w-2/3 bg-purple-600 text-white px-4 py-2 mt-2">Sign Up</button>
//                 </div>
//             )}
//         </nav>
//     );
// }
import React, { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-3 py-3 flex justify-between items-center">
                <div className="logo font-bold text-xl">
                    Raf<span className="text-purple-600">iki</span>
                </div>
                <div className="hidden md:flex space-x-4">
                    <a href="#" className="text-gray-600">Rent Payment</a>
                    <a href="#" className="text-gray-600">Landlord Portal</a>
                    <a href="#" className="text-gray-600">Service</a>
                    <a href="#" className="text-gray-600">More <span className="m-1">+</span></a>
                </div>
                <div className="hidden md:flex">
                    <a href="/login" className="bg-white text-gray-800 border border-gray-800 px-4 py-2 mr-2">Log In</a>
                    <a href="/register" className="bg-purple-600 text-white px-4 py-2">Sign Up</a>
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-gray-800">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                        </svg>
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden flex space-x-4 px-2 pt-2 pb-3 space-y-1 text-center">
                    <a href="#" className=" text-gray-600">Rent Payment</a>
                    <a href="#" className=" text-gray-600">Landlord Portal</a>
                    <a href="#" className="block text-gray-600">Service</a>
                    <a href="#" className="block text-gray-600">More <span className="m-1">+</span></a>
                </div>
            )}
        </nav>
    );
}
