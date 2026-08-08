const express = require("express");
const axios = require("axios");

const router = express.Router();


// GET Fake Store API products
router.get("/", async (req, res) => {

    try {

        const response = await axios.get(
            "https://fakestoreapi.com/products"
        );

        res.status(200).json(response.data);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;