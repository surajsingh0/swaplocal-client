import React, { useState } from "react";
import axios from "axios";

import AdjustableRadiusMap from "./RadiusChange";

const MaximumDistanceRadius = ({ onDistanceUpdate }) => {
    const current_user = JSON.parse(localStorage.getItem("user"));
    const [distance, setDistance] = useState(current_user.max_distance);
    const [updating, setUpdating] = useState(false);

    const handleMaxDistance = async (e) => {
        e.preventDefault();
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
        <div>
            <AdjustableRadiusMap distance={distance} setDistance={setDistance} coordinate={[ current_user.latitude, current_user.longitude]}/>
            {/* <p className="text-center">Maximum Distance Radius</p>
            <input
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                type="range"
                min="1"
                max="100"
                placeholder="10"
                className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <p className="text-center">{distance} km</p> */}
            <button
                onClick={handleMaxDistance}
                disabled={updating}
                className={`bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300 ${
                    updating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                {updating ? 'Saving...' : 'Save'}
            </button>
        </div>
    );
};

export default MaximumDistanceRadius;
