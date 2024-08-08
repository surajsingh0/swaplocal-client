import { useState, useEffect } from "react";
import axios from "axios";

const useNotifications = (pollingInterval = 60000) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
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
        // Fetch notifications on mount
        fetchNotifications();

        // Set up polling
        const interval = setInterval(fetchNotifications, pollingInterval);

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, [pollingInterval]);

    return { notifications, loading, error };
};

export default useNotifications;
