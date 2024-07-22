import React, { useState, useCallback } from "react";
import OthersItems from "./OthersItems";
import OwnItems from "./OwnItems";
import MaximumDistanceRadius from "./MaximumDistanceRadius";
import ManageExchanges from './ManageExchanges';

const ExchangeItems = () => {
    const [shouldRefetch, setShouldRefetch] = useState(false);

    const triggerRefetch = useCallback(() => {
        setShouldRefetch((prev) => !prev);
    }, []);

    return (
        <div className="container mx-auto px-4">
            <MaximumDistanceRadius onDistanceUpdate={triggerRefetch} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Your Items</h2>
                    <OwnItems />
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">Other Items</h2>
                    <OthersItems shouldRefetch={shouldRefetch} />
                </div>
            </div>
            <ManageExchanges />
        </div>
    );
};

export default ExchangeItems;
