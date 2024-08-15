import React, { useState } from "react";
import { MapContainer, TileLayer, Circle, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const AdjustableRadiusMap = ({ distance, setDistance, coordinate }) => {
    const center = [coordinate[0], coordinate[1]];
    const [radius, setRadius] = useState(distance * 1000); // Default radius in meters

    const handleRadiusChange = (event) => {
        const newRadiusMeters = Number(event.target.value);
        setRadius(newRadiusMeters);
        setDistance(newRadiusMeters / 1000); // Convert meters to km
    };

    return (
        <div>
            <div>
                <label htmlFor="radius-slider">Radius (km): {distance}</label>
                <input
                    type="range"
                    id="radius-slider"
                    min="5000"
                    max="100000"
                    step="1000"
                    value={radius}
                    onChange={handleRadiusChange}
                    className="w-full"
                />
            </div>
            <MapContainer
                center={center}
                zoom={10}
                style={{ height: "300px", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Circle
                    center={center}
                    radius={radius}
                    pathOptions={{ fillColor: "blue", color: "blue" }}
                />
                <Marker position={center} />
            </MapContainer>
        </div>
    );
};

export default AdjustableRadiusMap;
