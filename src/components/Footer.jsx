import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

function Footer() {
    return (
        <>
        <footer className=" bg-orange-600 text-white">
            <div className="max-w-7xl mx-auto py-4 px-4 overflow-hidden sm:px-6 lg:px-8">
                <div className="mt-8 flex justify-center space-x-6">
                    <img src="/img/footerlogo.png" alt="Gama567 Logo" className="h-12 w-auto" />
                </div>
                <div className="mt-8 flex justify-center space-x-6">
                    <FaFacebook size={25}  href="#" className="text-white hover:text-gray-500">
                        <span className="sr-only">Facebook</span>
                        <img src="/img/facebook.svg" alt="Facebook Icon" className="h-6 w-6" aria-hidden="true" />
                    </FaFacebook>
                    <FaInstagram size={25} href="#" className="text-white hover:text-gray-500">
                        <span className="sr-only">Instagram</span>
                        <img src="/img/insta.svg" alt="Instagram Icon" className="h-6 w-6" aria-hidden="true" />
                    </FaInstagram>
                    <FaTwitter size={25} href="#" className="text-white hover:text-gray-500">
                        <span className="sr-only">Twitter</span>
                        <img src="/img/twitter.svg" alt="Twitter Icon" className="h-6 w-6" aria-hidden="true" />
                    </FaTwitter>
                    <FaYoutube size={25} href="#" className="text-white hover:text-gray-500">
                        <span className="sr-only">YouTube</span>
                        <img src="/img/youtube.svg" alt="YouTube Icon" className="h-6 w-6" aria-hidden="true" />
                    </FaYoutube>
                </div>
                <div className="mt-8 flex justify-center space-x-6">
                    <img src="/img/18plus.svg" alt="18+" className="h-12 w-auto" />
                </div>
                <p className="mt-8 text-center text-sm">Players need to be 18+ in order to register. Underage gambling is prohibited.</p>
                <div className="mt-8 flex justify-center space-x-6">
                    <a href="https://www.begambleaware.org" target="_blank" rel="noreferrer">
                        <img src="/img/gambleaware.svg" alt="BeGambleAware Logo" className="h-12 w-auto" />
                    </a>
                    <a href="https://www.gamblingtherapy.org" target="_blank" rel="noreferrer">
                        <img src="/img/gamblingtherapy.svg" alt="Gambling Therapy Logo" className="h-12 w-auto" />
                    </a>
                </div>
                <p className="mt-8 text-center text-base"><strong>Cambridge CB2 1TN, United Kingdom</strong></p>
                <p className="mt-8 text-center text-base">Our website is operated by Gama International B.V., a company established under the laws of United Kingdom, with registered address at #506 IT Park Towers Cambridge CB2 1TN, United Kingdom, and having its gaming sublicence issued, by United Kingdom e-Gaming and all rights to operate the gaming software worldwide.</p>
                <p className="mt-8 text-center text-base">Copyright Gama 567 | All rights reserved</p>
            </div>
        </footer>
        </>
    );
}

export default Footer;