import React from 'react';
import logo from './logo.svg';

const Header = () => {
    return (
        <header className="bg-sky-600 text-white fixed  top-0 right-0 left-0" id="header">
            <div className="container mx-auto px-4 py-3 flex justify-between">
                <div className="flex items-center">
                    <img src={logo} alt="React Logo" className="w-8 h-8 mr-2"/>
                    <span className="font-semibold text-lg">Travel</span>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <a href="#" className="hover:text-gray-300">Home</a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-gray-300">About</a>
                        </li>
                    </ul>
                </nav>
                <div>
                    <input type="text"
                           className="px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                           placeholder="Search..."/>
                </div>
            </div>
        </header>
    );
};

export default Header;
