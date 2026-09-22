const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// POST - Add product
// Admin only
router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    async (req, res) => {
        try {

            const product = new Product(req.body);
            const savedProduct = await product.save();

            res.status(201).json(savedProduct);

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }
    }
);


// GET - Get all products
// Logged-in users
router.get(
    "/",
    authMiddleware,
    async (req, res) => {
        try {

            const products = await Product.find();

            res.status(200).json(products);

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }
    }
);


// GET - Get single product by ID
// Logged-in users
router.get(
    "/:id",
    authMiddleware,
    async (req, res) => {
        try {

            const product = await Product.findById(req.params.id);

            if (!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }

            res.status(200).json(product);

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }
    }
);


// PUT - Update product by ID
// Admin only
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    async (req, res) => {
        try {

            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

            if (!updatedProduct) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }

            res.status(200).json(updatedProduct);

        } catch (error) {

            res.status(400).json({
                message: error.message
            });

        }
    }
);


// DELETE - Delete product by ID
// Admin only
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    async (req, res) => {
        try {

<<<<<<< HEAD
            const deletedProduct = await Product.findByIdAndDelete(
                req.params.id
            );
=======
        // Vulnerability: no authentication/authorization check
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
>>>>>>> 74d9c8c5869b9427d6304120056ab980d77d4229

            if (!deletedProduct) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }

            res.status(200).json({
                message: "Product deleted successfully"
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }
    }
);


module.exports = router;