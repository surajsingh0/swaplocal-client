import React from "react";

function Faqs() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
                    Frequently Asked Questions
                </h3>
                <div className="space-y-6 max-w-3xl mx-auto">
                    {[
                        {
                            q: "How does SwapLocal ensure user safety?",
                            a: "We implement user verification, ratings, and secure messaging to create a safe environment for all our users.",
                        },
                        {
                            q: "What kinds of items can be exchanged?",
                            a: "Almost anything! From books and clothes to furniture and electronics. However, we have guidelines to ensure all exchanges are legal and appropriate.",
                        },
                        {
                            q: "How is the environmental impact calculated?",
                            a: "We use data on average production emissions and transportation costs for various item categories to estimate the savings from each exchange.",
                        },
                        {
                            q: "Is there a fee to use SwapLocal?",
                            a: "Basic usage is free! We offer premium features for a small monthly fee, which helps us maintain and improve the platform.",
                        },
                    ].map((faq, index) => (
                        <div key={index} className="bg-gray-100 p-6 rounded-lg">
                            <h4 className="font-semibold text-lg mb-2">
                                {faq.q}
                            </h4>
                            <p className="text-gray-600">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Faqs;
