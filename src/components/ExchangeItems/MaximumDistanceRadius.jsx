import React, { useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";

import AdjustableRadiusMap from "./RadiusChange";

const MaximumDistanceRadius = ({ open, setOpen, onDistanceUpdate }) => {
    const current_user = JSON.parse(localStorage.getItem("user"));
    const [distance, setDistance] = useState(current_user.max_distance);
    const [updating, setUpdating] = useState(false);

    const handleMaxDistance = async (e) => {
        // e.preventDefault();
        setUpdating(true);
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}api/users/update_profile/`,
                {
                    max_distance: parseInt(distance),
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            localStorage.setItem("user", JSON.stringify(response.data));
            onDistanceUpdate(); // refetch other items
        } catch (error) {
            console.error(error);
        } finally {
            setUpdating(false);
        }
    };

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
                <div className="mx-auto w-full max-w-2xl text-neutral-50">
                    <DrawerHeader>
                        <DrawerTitle>Change Your Radius</DrawerTitle>
                        <DrawerDescription>
                            How far you are willing to travel?
                        </DrawerDescription>
                    </DrawerHeader>
                    <AdjustableRadiusMap
                        distance={distance}
                        setDistance={setDistance}
                        coordinate={[
                            current_user.latitude,
                            current_user.longitude,
                        ]}
                    />
                    <DrawerFooter>
                        <div className="flex justify-center">
                            <DrawerClose>
                                <div className="space-x-2">
                                    <Button
                                        onClick={handleMaxDistance}
                                        disabled={updating}
                                        className={`bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300 ${
                                            updating
                                                ? "opacity-50 cursor-not-allowed"
                                                : ""
                                        }`}
                                    >
                                        {updating ? "Saving..." : "Save"}
                                    </Button>
                                    <Button>Cancel</Button>
                                </div>
                            </DrawerClose>
                        </div>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default MaximumDistanceRadius;
