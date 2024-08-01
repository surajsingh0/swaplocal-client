import React, { useState, useEffect, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { MapPin, Compass, Search, ChevronDown } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import axios from "axios";
import { useNavigate } from "react-router-dom";

// Import Leaflet icon images
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Fix the default icon issue
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapController = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center);
    }, [center, map]);
    return null;
};

const UserLocationPage = () => {
    const current_user = JSON.parse(localStorage.getItem("user"));

    const [coordinates, setCoordinates] = useState({
        lat: current_user.latitude ? current_user.latitude : 0,
        lng: current_user.longitude ? current_user.longitude : 0,
    });
    const [address, setAddress] = useState("");
    const [isExpanded, setIsExpanded] = useState(true);

    const navigate = useNavigate();

    const updateUserLocation = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}api/users/update_profile/`,
                {
                    latitude: coordinates.lat,
                    longitude: coordinates.lng,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );

            alert("Location updated successfully");

            console.log(response.data);

            localStorage.setItem("user", JSON.stringify(response.data));

            navigate("/exchange-items");
        } catch (error) {
            console.error(error);
        }
    };

    const handleMapClick = (e) => {
        setCoordinates(e.latlng);
        // In a real app, you'd use reverse geocoding here to get the address
        setAddress(
            `Lat: ${e.latlng.lat.toFixed(4)}, Lng: ${e.latlng.lng.toFixed(4)}`
        );

        console.log(e.latlng);
    };

    function DraggableMarker() {
        const markerRef = useRef(null);
        const eventHandlers = useMemo(
            () => ({
                dragend() {
                    const marker = markerRef.current;
                    if (marker != null) {
                        setCoordinates(marker.getLatLng());
                    }
                },
            }),
            []
        );

        return (
            <Marker
                draggable={true}
                eventHandlers={eventHandlers}
                position={coordinates}
                ref={markerRef}
            ></Marker>
        );
    }

    const getLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCoordinates({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setAddress(
                        `Lat: ${position.coords.latitude.toFixed(
                            4
                        )}, Lng: ${position.coords.longitude.toFixed(4)}`
                    );
                },
                () => {
                    alert("Unable to retrieve your location");
                }
            );
        } else {
            alert("Geolocation is not supported by your browser");
        }
    };

    const handleSearch = () => {
        // In a real app, you'd use a geocoding service here
        alert(
            "Search functionality would be implemented here with a geocoding service."
        );
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden border border-green-200 my-10">
            <div className="p-6 bg-green-500 text-white">
                <h2 className="text-2xl font-semibold mb-4">
                    Choose Your Location
                </h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search for a location"
                        className="w-full px-4 py-2 pr-12 bg-white text-gray-800 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-300"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-600 transition-colors"
                    >
                        <Search size={20} />
                    </button>
                </div>
            </div>

            <div className="h-64 bg-gray-100">
                <MapContainer
                    center={[coordinates.lat, coordinates.lng]}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                    onClick={handleMapClick}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <DraggableMarker />
                    <MapController
                        center={[coordinates.lat, coordinates.lng]}
                    />
                </MapContainer>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                        <MapPin className="text-green-500" size={20} />
                        <span className="font-medium text-gray-700">
                            {address || "Select a location"}
                        </span>
                    </div>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-green-500 hover:text-green-600 transition-colors focus:outline-none"
                        aria-label="Toggle details"
                    >
                        <ChevronDown
                            size={20}
                            className={`transform transition-transform ${
                                isExpanded ? "rotate-180" : ""
                            }`}
                        />
                    </button>
                </div>

                {isExpanded && (
                    <div className="space-y-4 mt-4">
                        <button
                            onClick={getLocation}
                            className="w-full flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-300"
                        >
                            <Compass className="mr-2" size={16} />
                            Use My Location
                        </button>
                        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                            <p className="text-sm text-gray-500 mb-1">
                                Coordinates:
                            </p>
                            <p className="font-mono text-green-700">
                                {coordinates.lat.toFixed(6)},{" "}
                                {coordinates.lng.toFixed(6)}
                            </p>
                        </div>
                        <button
                            onClick={(e) => updateUserLocation(e)}
                            className="w-full flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-300"
                        >
                            Save Location
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserLocationPage;
