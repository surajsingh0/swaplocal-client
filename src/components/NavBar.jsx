import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-green-600">SwapLocal</h1>
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <a
                                href="#how-it-works"
                                className="text-gray-600 hover:text-green-600"
                            >
                                How It Works
                            </a>
                        </li>
                        <li>
                            <a
                                href="#features"
                                className="text-gray-600 hover:text-green-600"
                            >
                                Features
                            </a>
                        </li>
                        <li>
                            <a
                                href="#impact"
                                className="text-gray-600 hover:text-green-600"
                            >
                                Impact
                            </a>
                        </li>
                        <li>
                            <NavLink
                                to="/sign-up"
                                className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300"
                            >
                                Sign Up
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default NavBar;