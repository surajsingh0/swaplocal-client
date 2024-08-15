import React, { useState } from "react";
import {
    ArrowRight,
    Gift,
    MapPin,
    Repeat,
    ShieldCheck,
    Users,
    Leaf,
    DollarSign,
    BarChart2,
} from "lucide-react";
import { NavLink } from "react-router-dom";

function Main() {
    const [activeTab, setActiveTab] = useState("environmental");

    return (
        <main>
            <section className="relative h-screen flex items-center justify-center overflow-hidden bg-forest bg-blend-overlay bg-cover bg-center bg-fixed">
                <div className="z-20 text-center text-white bg-black bg-opacity-60 p-12 rounded-lg mb-24">
                    <h2 className="text-5xl font-bold mb-6">
                        Exchange Items, Enrich Lives
                    </h2>
                    <p className="text-xl mb-10">
                        Connect with your community, swap treasures, and create
                        a sustainable future - all within your chosen radius!
                    </p>
                    <a
                        href="#"
                        className="bg-green-500 text-white text-lg px-8 py-3 rounded-full inline-flex items-center hover:bg-green-600 transition duration-300"
                    >
                        Get Started
                        <ArrowRight className="ml-2" />
                    </a>
                </div>
            </section>

            <section id="how-it-works" className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
                        How SwapLocal Works
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: (
                                    <Gift className="w-12 h-12 text-green-500" />
                                ),
                                title: "List Your Items",
                                description:
                                    "Upload photos and descriptions of items you'd like to exchange.",
                            },
                            {
                                icon: (
                                    <MapPin className="w-12 h-12 text-green-500" />
                                ),
                                title: "Set Your Range",
                                description:
                                    "Choose how far you're willing to travel for exchanges.",
                            },
                            {
                                icon: (
                                    <Repeat className="w-12 h-12 text-green-500" />
                                ),
                                title: "Start Swapping",
                                description:
                                    "Connect with neighbors and arrange your exchanges.",
                            },
                        ].map((step, index) => (
                            <div
                                key={index}
                                className="text-center p-6 rounded-lg shadow-lg bg-gray-50 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                            >
                                <div className="flex justify-center mb-4">
                                    {step.icon}
                                </div>
                                <h4 className="text-xl font-semibold mb-2 text-gray-800">
                                    {step.title}
                                </h4>
                                <p className="text-gray-600">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="features" className="py-20 bg-green-500 text-white">
                <div className="container mx-auto px-4">
                    <h3 className="text-3xl font-bold text-center mb-12">
                        Why Choose SwapLocal?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <Users color="white" className="w-8 h-8" />,
                                title: "Build Community",
                                description:
                                    "Meet your neighbors and forge new connections.",
                            },
                            {
                                icon: <ShieldCheck color="white" className="w-8 h-8" />,
                                title: "Safe & Secure",
                                description:
                                    "User verification and rating system for peace of mind.",
                            },
                            {
                                icon: <MapPin color="white" className="w-8 h-8" />,
                                title: "Customizable Range",
                                description:
                                    "Set your preferred swap radius, from blocks to miles.",
                            },
                            {
                                icon: <Gift color="white" className="w-8 h-8" />,
                                title: "Diverse Items",
                                description:
                                    "From books to furniture, find what you need locally.",
                            },
                            {
                                icon: <Leaf color="white" className="w-8 h-8" />,
                                title: "Eco-Friendly",
                                description:
                                    "Reduce waste and your carbon footprint through sharing.",
                            },
                            {
                                icon: <DollarSign color="white" className="w-8 h-8" />,
                                title: "Save Money",
                                description:
                                    "Access items without buying new, keeping more cash in your pocket.",
                            },
                            {
                                icon: <BarChart2 color="white" className="w-8 h-8" />,
                                title: "Track Impact",
                                description:
                                    "See your personal and community environmental savings.",
                            },
                            {
                                icon: <Repeat color="white" className="w-8 h-8" />,
                                title: "Circular Economy",
                                description:
                                    "Participate in a sustainable economic model.",
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center space-y-4 bg-white text-green-800 p-6 rounded-lg shadow-lg"
                            >
                                <div className="bg-green-500 p-3 rounded-full">
                                    {feature.icon}
                                </div>
                                <h4 className="text-xl font-semibold text-center">
                                    {feature.title}
                                </h4>
                                <p className="text-gray-600 text-center">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="impact" className="py-20 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
                        SwapLocal Impact
                    </h3>
                    <div className="flex justify-center mb-8">
                        <button
                            className={`px-6 py-2 rounded-l-full ${
                                activeTab === "environmental"
                                    ? "bg-green-500 text-white"
                                    : "bg-white text-gray-800"
                            }`}
                            onClick={() => setActiveTab("environmental")}
                        >
                            Environmental
                        </button>
                        <button
                            className={`px-6 py-2 rounded-r-full ${
                                activeTab === "economic"
                                    ? "bg-green-500 text-white"
                                    : "bg-white text-gray-800"
                            }`}
                            onClick={() => setActiveTab("economic")}
                        >
                            Economic
                        </button>
                    </div>
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        {activeTab === "environmental" ? (
                            <div className="space-y-6">
                                <h4 className="text-2xl font-semibold mb-4 text-green-600">
                                    Environmental Benefits
                                </h4>
                                <p className="text-gray-700">
                                    By facilitating local exchanges, SwapLocal
                                    significantly reduces the need for new
                                    production and transportation, leading to:
                                </p>
                                <ul className="list-disc list-inside text-gray-700 space-y-2">
                                    <li>
                                        Decreased carbon emissions from
                                        manufacturing and shipping
                                    </li>
                                    <li>
                                        Reduced landfill waste as items find new
                                        homes
                                    </li>
                                    <li>
                                        Conservation of natural resources used
                                        in production
                                    </li>
                                    <li>
                                        Promotion of a circular economy model
                                    </li>
                                </ul>
                                <div className="mt-6">
                                    <h5 className="text-xl font-semibold mb-2 text-green-600">
                                        Our Impact So Far
                                    </h5>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                        <div className="bg-green-100 p-4 rounded-lg">
                                            <p className="text-3xl font-bold text-green-600">
                                                5,000+
                                            </p>
                                            <p className="text-gray-700">
                                                Items Exchanged
                                            </p>
                                        </div>
                                        <div className="bg-green-100 p-4 rounded-lg">
                                            <p className="text-3xl font-bold text-green-600">
                                                2.5 tons
                                            </p>
                                            <p className="text-gray-700">
                                                CO2 Emissions Saved
                                            </p>
                                        </div>
                                        <div className="bg-green-100 p-4 rounded-lg">
                                            <p className="text-3xl font-bold text-green-600">
                                                1,000+
                                            </p>
                                            <p className="text-gray-700">
                                                Trees Equivalent
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <h4 className="text-2xl font-semibold mb-4 text-green-600">
                                    Economic Benefits
                                </h4>
                                <p className="text-gray-700">
                                    SwapLocal creates a vibrant local sharing
                                    economy, resulting in:
                                </p>
                                <ul className="list-disc list-inside text-gray-700 space-y-2">
                                    <li>
                                        Significant savings for individuals by
                                        reducing new purchases
                                    </li>
                                    <li>
                                        Strengthened local economies through
                                        community connections
                                    </li>
                                    <li>
                                        Reduced expenses related to storage and
                                        disposal of unwanted items
                                    </li>
                                    <li>
                                        Potential for new local businesses and
                                        services to emerge
                                    </li>
                                </ul>
                                <div className="mt-6">
                                    <h5 className="text-xl font-semibold mb-2 text-green-600">
                                        Economic Impact
                                    </h5>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                                        <div className="bg-green-100 p-4 rounded-lg">
                                            <p className="text-3xl font-bold text-green-600">
                                                $100,000+
                                            </p>
                                            <p className="text-gray-700">
                                                Estimated User Savings
                                            </p>
                                        </div>
                                        <div className="bg-green-100 p-4 rounded-lg">
                                            <p className="text-3xl font-bold text-green-600">
                                                30%
                                            </p>
                                            <p className="text-gray-700">
                                                Average Household Savings
                                            </p>
                                        </div>
                                        <div className="bg-green-100 p-4 rounded-lg">
                                            <p className="text-3xl font-bold text-green-600">
                                                500+
                                            </p>
                                            <p className="text-gray-700">
                                                Local Connections Made
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-green-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-3xl font-bold mb-8">
                        Join the SwapLocal Revolution Today!
                    </h3>
                    <p className="text-xl mb-10">
                        Start exchanging items, reducing waste, and building a
                        stronger, more sustainable community.
                    </p>
                    <NavLink
                        to="sign-up"
                        className="bg-white text-green-600 text-lg px-8 py-3 rounded-full inline-flex items-center hover:bg-gray-100 transition duration-300"
                    >
                        Sign Up Now
                        <ArrowRight className="ml-2" />
                    </NavLink>
                </div>
            </section>
        </main>
    );
}

export default Main;
