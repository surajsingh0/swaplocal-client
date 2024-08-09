import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import FullScreenLoader from "../FullScreenLoader";
import AddEditItemModal from "./AddEditItemModal";

const OwnItems = ({ onItemSelect, isSelectionMode }) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddEditItemOpen, setAddEditItemOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState(null);

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

    if (loading) return <FullScreenLoader />;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto p-4 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Your Items</h1>
                <AddEditItemModal
                    isOpen={isAddEditItemOpen}
                    onClose={() => setAddEditItemOpen(false)}
                    item={itemToEdit}
                />
                <Button
                    onClick={() => {
                        setItemToEdit(null);
                        setAddEditItemOpen(true);
                    }}
                    variant="inline"
                    className="bg-blue-500 text-white hover:bg-blue-600"
                >
                    Add an Item
                </Button>
            </div>
            <div className="flex justify-center gap-4 flex-wrap">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white p-4 rounded-lg shadow"
                    >
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-600">
                            {item.description}
                        </p>
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
                        <Button
                            onClick={() => {
                                setItemToEdit(item);
                                setAddEditItemOpen(true);
                            }}
                            variant="inline"
                            className="mt-2 w-full bg-gray-200 text-gray-800 hover:bg-gray-300"
                            disabled={item.exchange_status}
                        >
                            {item.exchange_status ? "In Exchange" : "Edit Item"}
                        </Button>
                        {isSelectionMode ? (
                            <Button
                                variant="inline"
                                onClick={() => onItemSelect(item)}
                                className="mt-2 w-full bg-blue-500 text-white hover:bg-blue-600"
                                disabled={item.exchange_status}
                            >
                                {item.exchange_status
                                    ? "Unavailable"
                                    : "Select for Exchange"}
                            </Button>
                        ) : (
                            <></>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OwnItems;
