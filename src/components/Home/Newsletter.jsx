import React from "react";

function Newsletter() {
    return (
        <section className="py-20 bg-green-600 text-white">
            <div className="container mx-auto px-4 text-center">
                <h3 className="text-3xl font-bold mb-6">Stay Updated</h3>
                <p className="text-xl mb-8">
                    Subscribe to our newsletter for the latest SwapLocal news
                    and community stories.
                </p>
                <form className="max-w-md mx-auto flex">
                    <input
                        type="email"
                        placeholder="Your email address"
                        className="flex-grow px-4 py-2 rounded-l-full focus:outline-none text-gray-800"
                    />
                    <button
                        type="submit"
                        className="bg-gray-800 text-white px-6 py-2 rounded-r-full hover:bg-gray-700 transition duration-300"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Newsletter;
