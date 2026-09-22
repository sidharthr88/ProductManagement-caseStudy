import React from "react";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";

import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <>
            <Navbar />

            <Routes>

                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Logged-in users */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <ProductList />
                        </ProtectedRoute>
                    }
                />

                {/* Admin only */}
                <Route
                    path="/add-product"
                    element={
                        <ProtectedRoute adminOnly={true}>
                            <AddProduct />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </>
    );
}

export default App;