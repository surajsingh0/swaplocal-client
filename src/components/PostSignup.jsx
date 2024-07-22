import React from 'react';
import { NavLink } from 'react-router-dom';

const PostSignup = () => {
    return (
        <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold mb-6 text-green-600">Welcome to SwapLocal!</h1>
                <p className="text-lg text-gray-700 mb-6">Your account has been successfully created.</p>
                <p className="text-lg text-gray-700 mb-6">Choose your location to start swapping.</p>
                <div className="flex justify-center space-x-4">
                    <NavLink
                        to="/user-location"
                        className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300"
                    >
                        Select Location
                    </NavLink>
                </div>
            </div>
        </main>
    );
}

export default PostSignup;
