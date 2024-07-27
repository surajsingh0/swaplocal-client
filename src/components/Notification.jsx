import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Notification = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8000/ws/notifications/");

        socket.onmessage = (event) => {
            const notification = JSON.parse(event.data);
            setNotifications((prevNotifications) => [
                notification,
                ...prevNotifications,
            ]);
        };

        return () => {
            socket.close();
        };
    }, []);

    const markAsRead = async (id) => {
        // Implementation to mark notification as read
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Bell />
                    {notifications.filter((n) => n.unread).length > 0 && (
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                            {notifications.filter((n) => n.unread).length}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                {notifications.length === 0 ? (
                    <DropdownMenuItem>No notifications</DropdownMenuItem>
                ) : (
                    notifications.map((notification) => (
                        <DropdownMenuItem
                            key={notification.id}
                            onClick={() => markAsRead(notification.id)}
                        >
                            <span
                                className={
                                    notification.unread
                                        ? "font-bold"
                                        : "text-gray-500"
                                }
                            >
                                {notification.description}
                            </span>
                        </DropdownMenuItem>
                    ))
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Notification;
