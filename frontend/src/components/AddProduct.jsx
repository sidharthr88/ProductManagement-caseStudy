import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

function AddProduct() {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: "",
    rating: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/products",
        {
          title: product.title,
          price: Number(product.price),
          image: product.image,
          rating: Number(product.rating),
        }
      );

      console.log("Product Added:", response.data);

      alert("Product added successfully!");

      setProduct({
        title: "",
        price: "",
        image: "",
        rating: "",
      });
    } catch (error) {
      console.error("Error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to add product"
      );
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add Product
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>

          <TextField
            fullWidth
            label="Product Title"
            name="title"
            value={product.title}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Image URL"
            name="image"
            value={product.image}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Rating"
            name="rating"
            type="number"
            value={product.rating}
            onChange={handleChange}
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
          >
            Add Product
          </Button>

        </Box>
      </Paper>
    </Container>
  );
}

export default AddProduct;