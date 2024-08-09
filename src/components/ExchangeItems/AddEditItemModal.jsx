import React, { useState, useEffect } from "react";
import axios from "axios";

const AddEditItemModal = ({ isOpen, onClose, item = null, setItems }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    useEffect(() => {
        if (isOpen) {
            if (item) {
                // Edit mode: populate fields with item data
                setTitle(item.title || "");
                setDescription(item.description || "");
                setImage(item.image || null);
            } else {
                // Add mode: reset fields
                setTitle("");
                setDescription("");
                setImage(null);
            }
            setErrors({});
            setSubmitError("");
        }
    }, [isOpen, item]);

    const fetchAddEditItem = async (itemData) => {
        try {
            const url = item
                ? `${import.meta.env.VITE_API_URL}api/items/${item.id}/`
                : `${import.meta.env.VITE_API_URL}api/items/`;
            const method = item ? axios.put : axios.post;

            console.log(item, itemData);

            const response = await method(url, itemData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(
                item ? "Item successfully updated!" : "Item successfully added!"
            );

            if (item) {
                // Edit mode: update item in state
                setItems((prevItems) =>
                    prevItems.map((i) => (i.id === item.id ? response.data : i))
                );
            } else {
                // Add mode: add new item to state
                setItems((prevItems) => [...prevItems, response.data]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (title.trim().length === 0) {
            newErrors.title = "Title is required";
        } else if (title.length > 100) {
            newErrors.title = "Title must be 100 characters or less";
        }
        if (description.trim().length === 0) {
            newErrors.description = "Description is required";
        }
        if (!image) {
            newErrors.image = "Image is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError("");
        setIsSubmitting(true);

        if (!validateForm()) {
            return;
        }

        try {
            await fetchAddEditItem({
                title,
                description,
                image,
            });
            onClose();
        } catch (error) {
            setSubmitError(
                "An error occurred while submitting the item. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e, setter) => {
        const { name, value } = e.target;
        setter(value);
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setImage(file);
            setErrors((prev) => ({ ...prev, image: "" }));
        } else {
            setImage(null);
            setErrors((prev) => ({
                ...prev,
                image: "Please select a valid image file",
            }));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-semibold">
                        {item ? "Edit Item" : "Add New Item"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={title}
                                onChange={(e) => handleInputChange(e, setTitle)}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
                                    errors.title ? "border-red-500" : ""
                                }`}
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.title}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={description}
                                onChange={(e) =>
                                    handleInputChange(e, setDescription)
                                }
                                rows={3}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 ${
                                    errors.description ? "border-red-500" : ""
                                }`}
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.description}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="image"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Image
                            </label>
                            <div className="mt-1 flex items-center">
                                <label className="w-full flex justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                                    <svg
                                        className="h-5 w-5 mr-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                        />
                                    </svg>
                                    {image ? "Change Image" : "Upload Image"}
                                    <input
                                        id="image"
                                        name="image"
                                        type="file"
                                        className="sr-only"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                    />
                                </label>
                            </div>
                            {image && (
                                <p className="mt-2 text-sm text-gray-500">
                                    {image.name}
                                </p>
                            )}
                            {errors.image && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.image}
                                </p>
                            )}
                        </div>
                    </div>
                    {submitError && (
                        <div
                            className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                            role="alert"
                        >
                            <span className="block sm:inline">
                                {submitError}
                            </span>
                        </div>
                    )}
                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                                isSubmitting
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }`}
                        >
                            {isSubmitting ? (
                                <svg
                                    className="animate-spin h-5 w-5 mr-3 inline-block"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            ) : null}
                            {item ? "Update Item" : "Add Item"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditItemModal;
