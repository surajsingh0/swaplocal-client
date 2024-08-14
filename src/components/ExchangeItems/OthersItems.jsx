import React, { useState, useEffect } from "react";
import axios from "axios";
import FullScreenLoader from "../FullScreenLoader";
import { Button } from "../ui/button";
import ItemSelectionModal from "./ItemSelectionModal";
import { NavLink } from "react-router-dom";
import { ItemView } from "./ItemView";

function OthersItems({ maxDistanceOpen, setMaxDistanceOpen, shouldRefetch }) {
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
                initator: itemToOffer.owner.id,
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

    if (items.length === 0) {
        return (
            <div className="text-center p-4">
                <p>No available items in your area at the moment.</p>
            </div>
        );
    }

    return (
        <div className="">
            <div className="flex justify-between text-2xl pl-8 font-bold mb-6 mt-4">
                <h1>Available Items In Your Area</h1>
                <div className="flex gap-2 mr-8">
                    <Button
                        onClick={setMaxDistanceOpen}
                        variant="inline"
                        className="bg-blue-500 text-white hover:bg-blue-600"
                    >
                        Change Your Radius
                    </Button>
                    <NavLink to="/own-items">
                        <Button
                            variant="inline"
                            className="bg-blue-500 text-white hover:bg-blue-600"
                        >
                            Manage Your Items
                        </Button>
                    </NavLink>
                    <NavLink to="/manage-exchanges">
                        <Button
                            variant="inline"
                            className="bg-blue-500 text-white hover:bg-blue-600"
                        >
                            Manage Your Exchanges
                        </Button>
                    </NavLink>
                </div>
            </div>
            {items.map((item) => (
                <ItemView
                    key={item.id}
                    item={item}
                    exchangeInitiating={exchangeInitiating}
                    handleExchangeClick={handleExchangeClick}
                />
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
