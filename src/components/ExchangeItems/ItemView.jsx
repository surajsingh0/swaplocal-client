import React from "react";
import { Button } from "../ui/button";

export const ItemView = ({ className, item, exchangeInitiating, handleExchangeClick }) => {
    return (
        <div
            key={item.id}
            className={`${className} bg-green-100 border border-green-200 p-8 m-8 rounded-lg shadow-lg flex justify-around gap-2`}
        >
            <div className="w-6/12">
                <h1 className="text-2xl font-bold mb-4">{item.title}</h1>

                <p className="mb-4">
                    by <span className="font-bold">{item.owner.username}</span>
                </p>
                <p className="mb-4">
                    from{" "}
                    <span className="font-bold">
                        {item.distance && Number(item.distance?.toFixed(1))} km
                    </span>{" "}
                    away
                </p>
                <p className="mb-4">
                    Maximum Distance: {item.owner.max_distance} km
                </p>
                <section className="bg-white p-4 rounded-md">
                    <h2 className="text-lg font-bold mb-2">Item Description</h2>
                    <p>{item.description}</p>
                </section>

                {handleExchangeClick && (
                    <Button
                        variant="inline"
                        className="mt-4 bg-green-500 text-white hover:bg-green-600"
                        onClick={() => handleExchangeClick(item)}
                        disabled={exchangeInitiating}
                    >
                        {exchangeInitiating
                            ? "Requesting..."
                            : "Request Exchange"}
                    </Button>
                )}
            </div>
            <img src={item.image[0] == '/' ? import.meta.env.VITE_API_URL.slice(0, -1) + item.image : item.image} className="w-6/12 rounded-md"></img>
        </div>
    );
};
