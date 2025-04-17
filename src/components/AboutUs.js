import React from 'react';

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center min-h-screen mt-20">
      <div className="w-full max-w-4xl px-4">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">About us</h1>
          <div className="h-1 w-20 bg-orange-500 mx-auto mt-4"></div>
        </div>

        {/* Content Section */}
        <div className="text-gray-700">
          <p className="text-center italic mb-6">
            Gama567 is operated by S S international, a company incorporated under the laws of United Kingdom and regulated by the UK authority as the regulatory body responsible holding a (Sub-license with License number 392/JAZ Sub-License GLH-OCCHKTV0707086017 granted on 21.08.2020).
          </p>

          <p className="text-center font-bold text-lg mb-6">
            Gama567 is into existence for past 30 years with more than 1.38 lac + members.
          </p>

          <p className="mb-6">
            We have proudly taken our culture from offline to online business and now stand as India's most trusted betting platform. Gama567 is an international betting platform and has presence in more than 18 countries. We truly value our customers and our endeavor is to provide best customer service and enable our customers to play online games with ease.
          </p>

          <p className="text-orange-500 font-semibold">
            Players are requested not to contact any untrusted sources for Gama567 accounts.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;