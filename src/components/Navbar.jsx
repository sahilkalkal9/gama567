import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = ({ activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false); // Close mobile menu on tab click
  };

  return (
    <nav className="bg-white fixed top-0 z-50 w-full shadow backdrop-blur backdrop-filter bg-opacity-70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/" className="cursor-default">
                <img 
                  className="block h-12 w-auto" 
                  src="/img/navbarlogo.png" // Ensure this path points to the public folder
                  alt="Gama 567" 
                />
              </a>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4">
              <a 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === "howtoplay" ? "bg-orange-500 text-white" : "bg-white text-orange-500 hover:bg-orange-50"
                }`} 
                href="/howtoplay"
                onClick={() => handleTabClick("howtoplay")}
              >
                How to Play
              </a>
              <a 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === "gamerules" ? "bg-orange-500 text-white" : "bg-white text-orange-500 hover:bg-orange-50"
                }`} 
                href="/gamerules"
                onClick={() => handleTabClick("gamerules")}
              >
                Game Rules
              </a>
              <a 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === "charts" ? "bg-orange-500 text-white" : "bg-white text-orange-500 hover:bg-orange-50"
                }`} 
                href="/charts"
                onClick={() => handleTabClick("charts")}
              >
                Charts
              </a>
              <a 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === "aboutus" ? "bg-orange-500 text-white" : "bg-white text-orange-500 hover:bg-orange-50"
                }`} 
                href="/aboutus"
                onClick={() => handleTabClick("aboutus")}
              >
                About Us
              </a>
              <a 
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === "terms" ? "bg-orange-500 text-white" : "bg-white text-orange-500 hover:bg-orange-50"
                }`} 
                href="/terms"
                onClick={() => handleTabClick("terms")}
              >
                Terms & Conditions
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white bg-opacity-90 backdrop-blur">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="/howtoplay"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activeTab === "howtoplay" ? "bg-orange-500 text-white" : "text-orange-500 hover:bg-orange-50"
              }`}
              onClick={() => handleTabClick("howtoplay")}
            >
              How to Play
            </a>
            <a
              href="/gamerules"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activeTab === "gamerules" ? "bg-orange-500 text-white" : "text-orange-500 hover:bg-orange-50"
              }`}
              onClick={() => handleTabClick("gamerules")}
            >
              Game Rules
            </a>
            <a
              href="/charts/app"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activeTab === "charts" ? "bg-orange-500 text-white" : "text-orange-500 hover:bg-orange-50"
              }`}
              onClick={() => handleTabClick("charts")}
            >
              Charts
            </a>
            <a
              href="/aboutus"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activeTab === "aboutus" ? "bg-orange-500 text-white" : "text-orange-500 hover:bg-orange-50"
              }`}
              onClick={() => handleTabClick("aboutus")}
            >
              About Us
            </a>
            <a
              href="/terms"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activeTab === "terms" ? "bg-orange-500 text-white" : "text-orange-500 hover:bg-orange-50"
              }`}
              onClick={() => handleTabClick("terms")}
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;