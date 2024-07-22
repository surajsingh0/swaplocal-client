import React, { useState, useEffect } from "react";
import axios from "axios";
import FullScreenLoader from "../FullScreenLoader";
import { Button } from "../ui/button";
import ItemSelectionModal from "./ItemSelectionModal";

function OthersItems({ shouldRefetch }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [exchangeInitiating, setExchangeInitiating] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItemToRequest, setSelectedItemToRequest] = useState(null);

    const fetchItems = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}api/items/`,
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
            console.error(error);
            setError("Failed to fetch items. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [shouldRefetch]);

    const initiateExchange = async (itemToOffer) => {
        setExchangeInitiating(true);
        try {
            const payload = {
                item_requested: selectedItemToRequest.id,
                item_offered: itemToOffer.id,
                initator: localStorage.getItem("username"),
                receiver: selectedItemToRequest.owner.id,
            };
            console.log("Exchange payload:", payload);

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}api/exchanges/`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            console.log("Exchange response:", response.data);
            alert("Exchange request sent successfully!");
            setSelectedItemToRequest(null);
        } catch (error) {
            console.error("Failed to initiate exchange:", error);
            if (error.response) {
                console.error("Error response:", error.response.data);
                alert(
                    `Failed to initiate exchange: ${JSON.stringify(
                        error.response.data
                    )}`
                );
            } else {
                alert("Failed to initiate exchange. Please try again.");
            }
        } finally {
            setExchangeInitiating(false);
        }
    };

    const handleExchangeClick = (item) => {
        setSelectedItemToRequest(item);
        setIsModalOpen(true);
    };

    if (error) {
        return (
            <div className="text-center text-red-500 p-4">
                <p>{error}</p>
                <button
                    onClick={fetchItems}
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (loading) {
        return <FullScreenLoader label="Loading items..." />;
    }

    return (
        <div className="">
            <h1 className="text-2xl pl-8 font-bold mb-6">
                Available Items In Your Area
            </h1>
            {items.map((item) => (
                <div
                    key={item.id}
                    className="bg-white p-8 m-8 rounded-lg shadow-lg"
                >
                    <h1 className="text-2xl font-bold mb-4">
                        {item.owner.username}
                    </h1>

                    <p className="mb-4">{item.title}</p>
                    <p className="mb-4">Distance: {item.distance} km</p>
                    <p className="mb-4">
                        Max Distance: {item.owner.max_distance} km
                    </p>
                    <section className="bg-gray-200 p-4 rounded-md shadow-sm">
                        <h2 className="text-lg font-bold mb-2">Description</h2>
                        <p>{item.description}</p>
                    </section>
                    <Button
                        className="mt-4 text-green-500 border border-green-500 hover:bg-green-500 hover:text-white"
                        onClick={() => handleExchangeClick(item)}
                        disabled={exchangeInitiating}
                    >
                        {exchangeInitiating
                            ? "Requesting..."
                            : "Request Exchange"}
                    </Button>
                </div>
            ))}
            <ItemSelectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onItemSelect={(itemToOffer) => {
                    initiateExchange(itemToOffer);
                    setIsModalOpen(false);
                }}
            />
        </div>
    );
}

export default OthersItems;
