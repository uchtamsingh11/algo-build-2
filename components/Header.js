import React from 'react';
import Link from 'next/link';
import CoinBalance from './CoinBalance';

/**
 * Header component that shows navigation and user information
 * @param {Object} props - Component props
 * @param {Object} props.user - The logged-in user object
 * @param {Function} props.onSignOut - Function to call when user signs out
 */
const Header = ({ user, onSignOut }) => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and nav links */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <span className="text-xl font-bold text-gray-900 cursor-pointer">
                  My App
                </span>
              </Link>
            </div>
            <nav className="ml-6 flex space-x-4">
              <Link href="/dashboard">
                <span className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 cursor-pointer">
                  Dashboard
                </span>
              </Link>
              <Link href="/transactions">
                <span className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 cursor-pointer">
                  Transactions
                </span>
              </Link>
            </nav>
          </div>

          {/* User menu and coin balance */}
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <CoinBalance userId={user.id} />
                
                <div className="relative">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-700">
                      {user.name || user.email}
                    </span>
                    <button
                      type="button"
                      className="py-1 px-3 bg-gray-100 rounded-md text-sm text-gray-700 hover:bg-gray-200"
                      onClick={onSignOut}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            )}
            
            {!user && (
              <div className="flex space-x-2">
                <Link href="/signin">
                  <span className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 cursor-pointer">
                    Sign in
                  </span>
                </Link>
                <Link href="/signup">
                  <span className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">
                    Sign up
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 