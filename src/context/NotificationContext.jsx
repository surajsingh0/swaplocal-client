import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

// Create the Notification Context
export const NotificationContext = createContext();

// Notification Provider
export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Function to fetch notifications from the API
    const fetchNotifications = async () => {
        try {
            setLoading(true);
            // Replace with your actual API call
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}api/notifications/`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            setNotifications(response.data);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        // Initial fetch
        fetchNotifications();

        // Polling interval
        const interval = setInterval(fetchNotifications, 60000); // Poll every 60 seconds

        // Cleanup the interval on unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                error,
                loading,
                setNotifications,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};
