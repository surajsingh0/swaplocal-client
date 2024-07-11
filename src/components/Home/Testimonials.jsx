import React from "react";

export default function Testimonials() {
    return (
        <section className="py-20 bg-gray-100">
            <div className="container mx-auto px-4">
                <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
                    What Our Users Say
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            name: "Sarah L.",
                            quote: "SwapLocal has completely changed how I think about consumption. I've saved money and made great friends!",
                            avatar: "/api/placeholder/64/64",
                        },
                        {
                            name: "Michael R.",
                            quote: "As a minimalist, I love how easy SwapLocal makes it to find new homes for things I no longer need.",
                            avatar: "/api/placeholder/64/64",
                        },
                        {
                            name: "Emma T.",
                            quote: "The environmental impact tracking feature is amazing. It's so rewarding to see the difference I'm making!",
                            avatar: "/api/placeholder/64/64",
                        },
                    ].map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-lg"
                        >
                            <div className="flex items-center mb-4">
                                <img
                                    src={testimonial.avatar}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <h4 className="font-semibold">
                                    {testimonial.name}
                                </h4>
                            </div>
                            <p className="text-gray-600 italic">
                                "{testimonial.quote}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
