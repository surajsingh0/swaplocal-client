import React from "react";

const FullScreenLoader = ({
    size = "md",
    color = "green",
    label = "Loading...",
    blur = "md",
}) => {
    const sizeClasses = {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-16 h-16",
    };

    const colorClasses = {
        green: "border-green-500 text-green-500",
        blue: "border-blue-500 text-blue-500",
        red: "border-red-500 text-red-500",
        yellow: "border-yellow-500 text-yellow-500",
        purple: "border-purple-500 text-purple-500",
    };

    const blurClasses = {
        sm: "backdrop-blur-sm",
        md: "backdrop-blur-md",
        lg: "backdrop-blur-lg",
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
                className={`absolute inset-0 bg-gray-800 bg-opacity-50 ${blurClasses[blur]}`}
            ></div>
            <div className="relative flex flex-col items-center">
                <div className={`${sizeClasses[size]} relative`}>
                    <div
                        className={`absolute inset-0 ${colorClasses[color]} rounded-full animate-spin border-t-4 border-r-4 border-opacity-75`}
                    ></div>
                    <div
                        className={`absolute inset-0 ${colorClasses[color]} rounded-full animate-pulse border-4 border-opacity-25`}
                    ></div>
                </div>
                {label && (
                    <span
                        className={`mt-4 font-semibold text-lg ${colorClasses[color]}`}
                    >
                        {label}
                    </span>
                )}
            </div>
        </div>
    );
};

export default FullScreenLoader;
