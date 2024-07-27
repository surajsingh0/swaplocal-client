import React, { useState, useCallback } from "react";
import OthersItems from "./OthersItems";
import OwnItems from "./OwnItems";
import MaximumDistanceRadius from "./MaximumDistanceRadius";
import ManageExchanges from "./ManageExchanges";

const ExchangeItems = () => {
    const [shouldRefetch, setShouldRefetch] = useState(false);

    const [open, setOpen] = useState(false);

    const triggerRefetch = useCallback(() => {
        setShouldRefetch((prev) => !prev);
    }, []);

    return (
        <div className="container mx-auto px-4">
            <MaximumDistanceRadius
                open={open}
                setOpen={setOpen}
                onDistanceUpdate={triggerRefetch}
            />
            <div className="">
                {/* <div>
                    <h2 className="text-2xl font-bold mb-4">Your Items</h2>
                    <OwnItems />
                </div> */}
                <div>
                    {/* <h2 className="text-2xl font-bold mb-4">Other Items</h2> */}
                    <OthersItems
                        maxDistanceOpen={open}
                        setMaxDistanceOpen={setOpen}
                        shouldRefetch={shouldRefetch}
                    />
                </div>
            </div>
            <ManageExchanges />
        </div>
    );
};

export default ExchangeItems;
