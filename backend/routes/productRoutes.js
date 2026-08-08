
const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

// POST - Add product
router.post("/", async (req, res) => {
    try {

        const product = new Product(req.body);
        const savedProduct = await product.save();

        res.status(201).json(savedProduct);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});


// GET - Get all products
router.get("/", async (req, res) => {
    try {

        const products = await Product.find();

        res.status(200).json(products);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
});


// GET - Get single product by ID
router.get("/:id", async (req, res) => {
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
});


// PUT - Update product by ID
router.put("/:id", async (req, res) => {
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
});


// DELETE - Delete product by ID
router.delete("/:id", async (req, res) => {
    try {

        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

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
});


module.exports = router;

