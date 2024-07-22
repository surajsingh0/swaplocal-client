import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import SignupPage from "./components/SignUpPage";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";

import PostSignup from "./components/PostSignup.jsx";

import Login from "./components/Login.jsx";
import ExchangeItems from "./components/ExchangeItems/ExchangeItems.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { AuthContext } from "./context/AuthContext.jsx";
import UserLocationPage from "./components/UserLocationPage.jsx";

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
                <AuthContext.Consumer>
                    {({ user }) => (user ? <ExchangeItems /> : <SignupPage />)}
                </AuthContext.Consumer>
                <Footer />
            </>
        ),
    },
    {
        path: "/post-signup",
        element: (
            <>
                <NavBar />
                <AuthContext.Consumer>
                    {({ user }) => (user ? <PostSignup /> : <Login />)}
                </AuthContext.Consumer>
                <Footer />
            </>
        ),
    },
    {
        path: "/login",
        element: (
            <>
                <NavBar />
                <AuthContext.Consumer>
                    {({ user }) => (user ? <ExchangeItems /> : <Login />)}
                </AuthContext.Consumer>
                <Footer />
            </>
        ),
    },
    {
        path: "/exchange-items",
        element: (
            <>
                <NavBar />
                <AuthContext.Consumer>
                    {({ user }) => (user ? <ExchangeItems /> : <Login />)}
                </AuthContext.Consumer>
                <Footer />
            </>
        ),
    },
    {
        path: "/user-location",
        element: (
            <>
                <NavBar />
                <AuthContext.Consumer>
                    {({ user }) => (user ? <UserLocationPage /> : <Login />)}
                </AuthContext.Consumer>
                <Footer />
            </>
        ),
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            {" "}
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);
