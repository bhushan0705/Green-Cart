import React from 'react';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-green-50 px-20 py-10">
      {/* Top Section */}
      <div className="flex items-start justify-between flex-wrap gap-10">
        <div className="max-w-md">
          <img src={logo} alt="logo" className="mb-5" />
          <p>
            We deliver fresh groceries and snacks straight to your door. Trusted
            by thousands, we aim to make your shopping experience simple and
            affordable.
          </p>
        </div>

        <div className="flex gap-14 flex-wrap">
          <div className="flex flex-col">
            <p className="mb-5 font-medium">Quick Links</p>
            <Link to={'/'}>Home</Link>
            <Link to={'/about'}>About</Link>
            <Link to={'/allproducts'}>Products</Link>
            <Link>Contact</Link>
            <Link>FAQ</Link>
          </div>

          <div className="flex flex-col">
            <p className="mb-5 font-medium">Need help?</p>
            <Link>Delivery Information</Link>
            <Link>Returns</Link>
            <Link>Privacy Policy</Link>
            <Link>Terms</Link>
            <Link>Support</Link>
          </div>

          <div className="flex flex-col">
            <p className="mb-5 font-medium">Follow Us</p>
            <Link>Instagram</Link>
            <Link>Facebook</Link>
            <Link>Twitter</Link>
          <a href="https://www.linkedin.com/in/bhushan-dandavate-462276265" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/bhushan0705" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-10 border-t border-gray-300" />

      {/* Bottom Section */}
      <div className="text-center text-sm text-gray-600">
        <p>Created with ❤️- Bhushan</p>
      </div>
    </div>
  );
};

export default Footer;
