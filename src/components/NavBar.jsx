import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { CgProfile } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import useNotifications from "@/hooks/useNotification";

function NavBar() {
    const { user, logout } = useContext(AuthContext);
    const { notifications, error } = useNotifications();
    const [readNotifications, setReadNotifications] = useState([]);

    useEffect(() => {
        if (notifications) {
            const unreadNotifications = notifications.filter(
                (notification) => !notification.is_read
            );
            setReadNotifications(unreadNotifications);
        }
    }, [notifications]);

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                <h1 className="text-3xl font-bold text-green-600">
                    <NavLink to={user ? "/exchange-items" : "/"}>
                        SwapLocal
                    </NavLink>
                </h1>
                <nav>
                    <ul className="flex space-x-6">
                        {user ? (
                            ""
                        ) : (
                            <>
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
                            </>
                        )}
                        <li>
                            {user ? (
                                <NavLink
                                    to="/notifications"
                                    className={"relative"}
                                >
                                    {readNotifications.length > 0 ? (
                                        <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full">
                                            {readNotifications.length}
                                        </div>
                                    ) : (
                                        <></>
                                    )}

                                    <IoMdNotificationsOutline className="text-3xl cursor-pointer" />
                                </NavLink>
                            ) : (
                                <></>
                            )}
                        </li>
                        <li>
                            {user ? (
                                <NavLink to="/profile">
                                    <CgProfile className="size-7" />
                                </NavLink>
                            ) : (
                                <></>
                            )}
                        </li>
                        <li>
                            {user ? (
                                <NavLink
                                    to="/login"
                                    onClick={logout}
                                    className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300"
                                >
                                    Logout
                                </NavLink>
                            ) : (
                                <NavLink
                                    to="/sign-up"
                                    className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300"
                                >
                                    Sign Up
                                </NavLink>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default NavBar;
