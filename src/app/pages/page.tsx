'use client'
import React, { useState } from 'react';
import InvoicePage from './invoices';
import HomePage from './home';
import ContactPage from './contact';


const Page = () => {
  const [activeSection, setActiveSection] = useState('home');

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const renderComponent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="pt-4">
            <HomePage />
          </div>
        );
      case 'invoices':
        return (
          <div className="pt-4">
            <InvoicePage />
          </div>
        );
      case 'contact':
        return (
          <div className="pt-4">
            <ContactPage />
          </div>
        )
      default:
        return null;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-start pt-0 pb-4 px-0">
      <header className="banner bg-gray-200 py-2 w-full pl-11">
        <nav className="flex items-center space-x-4">
          <div
            className={`banner-item cursor-pointer font-bold ${activeSection === 'home' ? 'text-blue-500' : ''
              }`}
            onClick={() => handleSectionChange('home')}
          >
            Home
          </div>
          <div
            className={`banner-item cursor-pointer font-bold ${activeSection === 'invoices' ? 'text-blue-500' : ''
              }`}
            onClick={() => handleSectionChange('invoices')}
          >
            Invoices
          </div>
          <div
            className={`banner-item cursor-pointer font-bold ${activeSection === 'contact' ? 'text-blue-500' : ''
              }`}
            onClick={() => handleSectionChange('contact')}
          >
            Contact
          </div>
          {/* Agrega más elementos del banner */}
        </nav>
      </header>

      <div className="container mx-auto mt-0">
        {renderComponent()}
      </div>
    </main>
  );
};

export default Page;











