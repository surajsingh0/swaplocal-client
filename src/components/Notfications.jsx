import React, { useEffect, useState } from "react";
import axios from "axios";
import useNotifications from "@/hooks/useNotification";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${
        date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;
};

const markAsRead = async (notification) => {
    try {
        const response = await axios.put(
            `${import.meta.env.VITE_API_URL}api/notifications/${
                notification.id
            }/`,
            {
                is_read: true,
                message: notification.message,
                exchange: notification.exchange,
                user: notification.user,
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        console.log(response.data);
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const Notifications = () => {
    const { notifications, loading, error } = useNotifications();

    if (loading) return <p>Loading notifications...</p>;
    if (error) return <p>Error fetching notifications.</p>;

    return (
        <div className="container mx-auto px-4 py-8">
            {notifications.length > 0 ? (
                notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`bg-${
                            notification.is_read ? "gray-100" : "white"
                        } p-6 mb-4 rounded-lg shadow flex justify-between items-center flex-wrap gap-4`}
                    >
                        <p>{notification.message}</p>
                        <div className="flex items-center gap-4">
                            {notification.is_read ? (
                                <></>
                            ) : (
                                <button
                                    onClick={() => markAsRead(notification)}
                                    className="bg-slate-500 text-white px-2 py-1 rounded hover:bg-slate-600"
                                >
                                    Mark as read
                                </button>
                            )}
                            <p>{formatDate(notification.created_at)}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div>No notifications available</div>
            )}
        </div>
    );
};

export default Notifications;
