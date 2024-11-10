import { Button } from "antd";
import React, { useState } from "react";

const Navbar: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    return (
        <nav className="bg-gray-800 relative">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white sm:hidden"
                        onClick={toggleSidebar}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="block h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>

                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <a href="#" className="text-white font-bold text-3xl">
                            Nusawarga
                        </a>
                    </div>
                    <div className="hidden sm:block sm:ml-6">
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
                            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</a>
                            <Button type="primary" className="text-sm font-medium">Login</Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out z-20`}
            >
                <button
                    type="button"
                    className="p-4 text-gray-400 hover:text-white focus:outline-none"
                    onClick={toggleSidebar}
                >
                    <span className="sr-only">Close sidebar</span>
                    <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <nav className="mt-10">
                    <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md">Home</a>
                    <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md">About</a>
                    <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md">Contact</a>
                </nav>
            </div>

            {/* Overlay to close sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-gray-900 bg-opacity-25 z-10"
                    onClick={toggleSidebar}
                ></div>
            )}
        </nav>
    );
};

export default Navbar;
