import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { ItemView } from "./ItemView";
import ModalContainer from "../ModalContainer";
import { AuthContext } from "@/context/AuthContext";

const ManageExchanges = () => {
    const [exchanges, setExchanges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("active");

    const { user } = useContext(AuthContext);

    const [currentItem, setCurrentItem] = useState(null);

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

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
        <div
            key={exchange.id}
            className={`p-6 mb-4 rounded-lg text-neutral-700 text-lg flex flex-col gap-2 ${
                ["bg-red-200", "bg-green-50", "bg-yellow-50", "bg-green-200"][
                    ["rejected", "accepted", "pending", "completed"].indexOf(
                        exchange.status
                    )
                ]
            }`}
        >
            <p className="font-semibold">{exchange.status.toUpperCase()}</p>
            <p>
                Initiator:{" "}
                <span className="font-semibold">
                    {user.username === exchange.initiator_username
                        ? "You"
                        : exchange.initiator_username}
                </span>
            </p>
            <p>
                Receiver:{" "}
                <span className="font-semibold">
                    {user.username === exchange.receiver_username
                        ? "You"
                        : exchange.receiver_username}
                </span>
            </p>
            <p>
                Offered Item:{" "}
                <span className="font-semibold">
                    {exchange.item_offered_title}
                </span>
                <button
                    onClick={() => {
                        console.log(exchange.item_offered_item);
                        setCurrentItem(exchange.item_offered_item);
                        openModal();
                    }}
                    className="ml-2 bg-blue-500 text-white hover:bg-blue-600 rounded px-1"
                >
                    View
                </button>
            </p>
            <p>
                Requested Item:{" "}
                <span className="font-semibold">
                    {exchange.item_requested_title}
                </span>
                <button
                    onClick={() => {
                        console.log(exchange.item_requested_item);
                        setCurrentItem(exchange.item_requested_item);
                        openModal();
                    }}
                    className="ml-2 bg-blue-500 text-white hover:bg-blue-600 rounded px-1"
                >
                    View
                </button>
            </p>
            <p>
                Created:{" "}
                <span className="font-semibold">
                    {new Date(exchange.created_at).toLocaleString()}
                </span>
            </p>
            <p>
                Last Updated:{" "}
                <span className="font-semibold">
                    {new Date(exchange.updated_at).toLocaleString()}
                </span>
            </p>

            {exchange.status === "pending" &&
                exchange.receiver === currentUserId && (
                    <div className="mt-4">
                        <Button
                            variant="inline"
                            onClick={() =>
                                handleExchangeAction(exchange.id, "accept")
                            }
                            className="mr-2 bg-green-500 text-white hover:bg-green-600"
                        >
                            Accept
                        </Button>
                        <Button
                            variant="inline"
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
                    variant="inline"
                    onClick={() =>
                        handleExchangeAction(exchange.id, "complete")
                    }
                    className="mt-4 bg-green-500 text-white hover:bg-green-600"
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
                    {activeExchanges.length > 0 ? (
                        activeExchanges.map(renderExchange)
                    ) : (
                        <p className="text-gray-500">No active exchanges</p>
                    )}
                </div>
            )}
            {activeTab === "history" && (
                <div>
                    <h3 className="text-xl font-semibold mb-4">
                        Exchange History
                    </h3>
                    {historyExchanges.length > 0 ? (
                        historyExchanges.map(renderExchange)
                    ) : (
                        <p className="text-gray-500">No exchange history</p>
                    )}
                </div>
            )}
            <ModalContainer isOpen={isModalOpen} onClose={closeModal}>
                {currentItem && <ItemView item={currentItem} />}
            </ModalContainer>
        </div>
    );
};

export default ManageExchanges;
