import React, { useState } from 'react';
import { Logo, LogoutBtn } from './index';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: location.pathname === "/",
            show: true,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: location.pathname === "/all-posts",
            show: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: location.pathname === "/add-post",
            show: authStatus,
        },
        {
            name: "Login",
            slug: "/login",
            active: location.pathname === "/login",
            show: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: location.pathname === "/signup",
            show: !authStatus,
        },
    ];

    const handleNavigation = (slug) => {
        navigate(slug);
        setIsMobileMenuOpen(false);
    };

    const getNavItemClasses = (isActive) => {
        return `relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 ${
            isActive 
                ? "text-blue-400 bg-blue-900/30 shadow-lg shadow-blue-500/20" 
                : "text-gray-300 hover:text-white hover:bg-gray-700/50"
        }`;
    };

    const getMobileNavItemClasses = (isActive) => {
        return `block w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out ${
            isActive 
                ? "text-blue-400 bg-blue-900/30 border-l-4 border-blue-400" 
                : "text-gray-300 hover:text-white hover:bg-gray-700/50 hover:border-l-4 hover:border-gray-400"
        }`;
    };

    return (
        <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-2xl border-b border-gray-700/50 sticky top-0 z-50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 transform hover:scale-110 transition-transform duration-300">
                            <Logo className="h-10 w-auto" />
                        </div>
                        <div className="hidden md:block h-8 w-px bg-gray-600"></div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-2">
                        {navItems.map((item) =>
                            item.show ? (
                                <button
                                    key={item.name}
                                    onClick={() => handleNavigation(item.slug)}
                                    className={getNavItemClasses(item.active)}
                                >
                                    {item.name}
                                    {item.active && (
                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-blue-400 rounded-full"></div>
                                    )}
                                </button>
                            ) : null
                        )}
                    </nav>

                    {/* Desktop Auth Section */}
                    <div className="hidden md:flex items-center space-x-4">
                        {authStatus && (
                            <div className="flex items-center space-x-3">
                                <div className="h-8 w-px bg-gray-600"></div>
                                <LogoutBtn className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25" />
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300"
                        >
                            <svg
                                className={`h-6 w-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800/95 backdrop-blur-sm border-t border-gray-700/50">
                    {navItems.map((item) =>
                        item.show ? (
                            <button
                                key={item.name}
                                onClick={() => handleNavigation(item.slug)}
                                className={getMobileNavItemClasses(item.active)}
                            >
                                {item.name}
                            </button>
                        ) : null
                    )}
                    {authStatus && (
                        <div className="pt-4 border-t border-gray-700/50">
                            <LogoutBtn className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105" />
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;