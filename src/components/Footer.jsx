import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

function Footer() {
    return (
        <section className="relative overflow-hidden py-10 bg-gray-800 border-t-2 border-gray-700">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full px-2 mb-4 md:w-1/2 lg:w-5/12">
                        <div className="flex flex-col items-center">
                            <div className="mb-4">
                                <Logo width="100px" />
                            </div>
                            <p className="text-sm text-gray-400">
                                &copy; {new Date().getFullYear()} DevUI. All Rights Reserved.
                            </p>
                        </div>
                    </div>
                    <div className="w-full px-2 md:w-1/2 lg:w-2/12">
                        <h3 className="text-xs font-semibold uppercase text-gray-500 mb-6">
                            Company
                        </h3>
                        <ul>
                            <li className="mb-4">
                                <Link className="text-base font-medium text-gray-300 hover:text-gray-100" to="/">
                                    Features
                                </Link>
                            </li>
                            <li className="mb-4">
                                <Link className="text-base font-medium text-gray-300 hover:text-gray-100" to="/">
                                    Pricing
                                </Link>
                            </li>
                            <li className="mb-4">
                                <Link className="text-base font-medium text-gray-300 hover:text-gray-100" to="/">
                                    Affiliate Program
                                </Link>
                            </li>
                            <li>
                                <Link className="text-base font-medium text-gray-300 hover:text-gray-100" to="/">
                                    Press Kit
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full px-2 md:w-1/2 lg:w-2/12">
                        <h3 className="text-xs font-semibold uppercase text-gray-500 mb-6">
                            Support
                        </h3>
                        <ul>
                            <li className="mb-4">
                                <Link className="text-base font-medium text-gray-300 hover:text-gray-100" to="/">
                                    Account
                                </Link>
                            </li>
                            <li className="mb-4">
                                <Link className="text-base font-medium text-gray-300 hover:text-gray-100" to="/">
                                    Help
                                </Link>
                            </li>
                            <li className="mb-4">
                                <Link className="text-base font-medium text-gray-300 hover:text-gray-100" to="/">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link className="text-base font-medium text-gray-300 hover:text-gray-100" to="/">
                                    Customer Support
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full px-2 md:w-1/2 lg:w-3/12">
                        <h3 className="text-xs font-semibold uppercase text-gray-500 mb-6">
                            Legals
                        </h3>
                        <ul>
                            <li className="mb-4">
                                <Link className="text-base font-medium text-gray-300 hover:text-gray-100" to="/">
                                    Terms &amp; Conditions
                                </Link>
                            </li>
                            <li className="mb-4">
                                <Link className="text-base font-medium text-gray-300 hover:text-gray-100" to="/">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link className="text-base font-medium text-gray-300 hover:text-gray-100" to="/">
                                    Licensing
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer;
