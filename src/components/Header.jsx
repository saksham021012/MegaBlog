import React, { useState } from 'react';
import { Logo, LogoutBtn } from './index';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { name: 'Home', slug: '/', show: true },
        { name: 'All Posts', slug: '/all-posts', show: authStatus },
        { name: 'Add Post', slug: '/add-post', show: authStatus },
        { name: 'Login', slug: '/login', show: !authStatus },
        { name: 'Signup', slug: '/signup', show: !authStatus },
    ];

    const handleNavigation = (slug) => {
        navigate(slug);
        setIsMobileMenuOpen(false);
    };

    const isActive = (slug) => location.pathname === slug;

    return (
        <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="hover:scale-105 transition-transform duration-200">
                        <Logo />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex space-x-4">
                        {navItems.map(
                            (item) =>
                                item.show && (
                                    <button
                                        key={item.name}
                                        onClick={() => handleNavigation(item.slug)}
                                        className={`px-4 py-2 rounded-md transition duration-200 ${
                                            isActive(item.slug)
                                                ? 'bg-blue-600 text-white'
                                                : 'text-gray-300 hover:text-white hover:bg-gray-700'
                                        }`}
                                    >
                                        {item.name}
                                    </button>
                                )
                        )}
                        {authStatus && <LogoutBtn />}
                    </nav>

                    {/* Mobile toggle */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                            className="p-2 rounded-md hover:bg-gray-800"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMobileMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-gray-800">
                    {navItems.map(
                        (item) =>
                            item.show && (
                                <button
                                    key={item.name}
                                    onClick={() => handleNavigation(item.slug)}
                                    className={`block w-full text-left px-4 py-3 ${
                                        isActive(item.slug)
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }`}
                                >
                                    {item.name}
                                </button>
                            )
                    )}
                    {authStatus && (
                        <div className="px-4 py-3">
                            <LogoutBtn />
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}

export default Header;
