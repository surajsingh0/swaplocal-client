import React from "react";
import OwnItems from "./OwnItems";

const ItemSelectionModal = ({ isOpen, onClose, onItemSelect }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between border-b sticky top-0 bg-white z-10 pt-4 px-4">
                    <h2 className="text-2xl font-bold mb-4">
                        Select an Item to Exchange
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <OwnItems
                    onItemSelect={(item) => {
                        onItemSelect(item);
                        onClose();
                    }}
                    isSelectionMode={true}
                />
                <button
                    onClick={onClose}
                    className="px-4 py-2 m-4 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ItemSelectionModal;
