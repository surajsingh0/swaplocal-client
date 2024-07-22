import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import FullScreenLoader from './FullScreenLoader';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    
    const { loginUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        
        try {
            await loginUser({ username, password });

            navigate('/exchange-items');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
            { loading && <FullScreenLoader blur='sm' label='Logging in...' /> }
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-3xl font-bold mb-6 text-green-600">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-6 text-sm text-gray-600">
                    Don't have an account?{' '}
                    <NavLink
                        to="/sign-up"
                        className="font-medium text-green-600 hover:text-green-500 transition duration-300"
                    >
                        Sign up
                    </NavLink>
                </p>
            </div>
        </main>
    );
}

export default Login;
