import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../ui/button";

const OwnItems = ({ onItemSelect, isSelectionMode }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOwnItems = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}api/items/?own_items=true`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
                setItems(response.data);
            } catch (error) {
                console.error("Failed to fetch own items:", error);
                setError("Failed to load your items. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchOwnItems();
    }, []);

    if (loading) return <p>Loading your items...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    {item.image && (
                        <img
                            src={item.image}
                            alt={item.title}
                            className="mt-2 w-full h-40 object-cover rounded"
                        />
                    )}
                    {item.exchange_status && (
                        <p className="mt-2 text-sm font-semibold text-blue-600">
                            Exchange Status: {item.exchange_status}
                        </p>
                    )}
                    {isSelectionMode ? (
                        <Button
                            onClick={() => onItemSelect(item)}
                            className="mt-2 w-full bg-blue-500 text-white hover:bg-blue-600"
                            disabled={item.exchange_status}
                        >
                            {item.exchange_status
                                ? "Unavailable"
                                : "Select for Exchange"}
                        </Button>
                    ) : (
                        <Button
                            className="mt-2 w-full bg-gray-200 text-gray-800 hover:bg-gray-300"
                            disabled={item.exchange_status}
                        >
                            {item.exchange_status ? "In Exchange" : "Edit Item"}
                        </Button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default OwnItems;
