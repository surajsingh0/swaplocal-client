import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../ui/button";

function ManageExchanges() {
    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("active");

    const fetchExchanges = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}api/exchanges/`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            setExchanges(response.data);
        } catch (error) {
            console.error("Failed to fetch exchanges:", error);
            setError("Failed to load exchanges. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExchanges();
    }, []);

    const handleExchangeAction = async (exchangeId, action) => {
        try {
            await axios.post(
                `${
                    import.meta.env.VITE_API_URL
                }api/exchanges/${exchangeId}/${action}/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            fetchExchanges(); // Refresh the exchanges list
        } catch (error) {
            console.error(`Failed to ${action} exchange:`, error);
            alert(`Failed to ${action} exchange. Please try again.`);
        }
    };

    if (loading) return <p>Loading exchanges...</p>;
    if (error) return <p>{error}</p>;

    const currentUserId = JSON.parse(localStorage.getItem("user")).id;

    const activeExchanges = exchanges.filter((exchange) =>
        ["pending", "accepted"].includes(exchange.status)
    );
    const historyExchanges = exchanges.filter((exchange) =>
        ["rejected", "completed"].includes(exchange.status)
    );

    const renderExchange = (exchange) => (
        <div key={exchange.id} className="bg-white p-6 mb-4 rounded-lg shadow">
            <p className="font-semibold">Status: {exchange.status}</p>
            <p>Initiator: {exchange.initiator_username}</p>
            <p>Receiver: {exchange.receiver_username}</p>
            <p>Offered Item: {exchange.item_offered_title}</p>
            <p>Requested Item: {exchange.item_requested_title}</p>
            <p>Created: {new Date(exchange.created_at).toLocaleString()}</p>
            <p>
                Last Updated: {new Date(exchange.updated_at).toLocaleString()}
            </p>

            {exchange.status === "pending" &&
                exchange.receiver === currentUserId && (
                    <div className="mt-4">
                        <Button
                            onClick={() =>
                                handleExchangeAction(exchange.id, "accept")
                            }
                            className="mr-2 bg-green-500 text-white hover:bg-green-600"
                        >
                            Accept
                        </Button>
                        <Button
                            onClick={() =>
                                handleExchangeAction(exchange.id, "reject")
                            }
                            className="bg-red-500 text-white hover:bg-red-600"
                        >
                            Reject
                        </Button>
                    </div>
                )}
            {exchange.status === "accepted" && (
                <Button
                    onClick={() =>
                        handleExchangeAction(exchange.id, "complete")
                    }
                    className="mt-4 bg-blue-500 text-white hover:bg-blue-600"
                >
                    Complete Exchange
                </Button>
            )}
        </div>
    );

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Manage Exchanges</h2>
            <div className="mb-4">
                <Button
                    variant="inline"
                    onClick={() => setActiveTab("active")}
                    className={`mr-2 ${
                        activeTab === "active"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                    }`}
                >
                    Active Exchanges
                </Button>
                <Button
                    variant="inline"
                    onClick={() => setActiveTab("history")}
                    className={`mr-2 ${
                        activeTab === "history"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200"
                    }`}
                >
                    Exchange History
                </Button>
            </div>
            {activeTab === "active" && (
                <div>
                    <h3 className="text-xl font-semibold mb-4">
                        Active Exchanges
                    </h3>
                    {activeExchanges.map(renderExchange)}
                </div>
            )}
            {activeTab === "history" && (
                <div>
                    <h3 className="text-xl font-semibold mb-4">
                        Exchange History
                    </h3>
                    {historyExchanges.map(renderExchange)}
                </div>
            )}
        </div>
    );
}

export default ManageExchanges;
