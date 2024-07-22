import React from "react";
import OwnItems from "./OwnItems";

const ItemSelectionModal = ({ isOpen, onClose, onItemSelect }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">
                    Select an Item to Exchange
                </h2>
                <OwnItems
                    onItemSelect={(item) => {
                        onItemSelect(item);
                        onClose();
                    }}
                    isSelectionMode={true}
                />
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ItemSelectionModal;
