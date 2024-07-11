import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import SignupPage from "./components/SignUpPage";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <NavBar />
                <App />
                <Footer />
            </>
        ),
    },
    {
        path: "/sign-up",
        element: (
            <>
                <NavBar />
                <SignupPage />
                <Footer />
            </>
        ),
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
