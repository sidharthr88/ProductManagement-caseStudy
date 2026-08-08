import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import ProductCard from "./ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [source, setSource] = useState("mongodb");

  useEffect(() => {
    if (source === "mongodb") {
      axios
        .get("http://localhost:5000/products")
        .then((response) => {
          console.log("MongoDB Products:", response.data);
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching MongoDB products:", error);
        });
    } else {
      axios
        .get("https://fakestoreapi.com/products")
        .then((response) => {
          console.log("Fake Store Products:", response.data);
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching Fake Store products:", error);
        });
    }
  }, [source]);

  return (
    <Container sx={{ mt: 4 }}>

      <Typography variant="h4" sx={{ mb: 3 }}>
        {source === "mongodb"
          ? "MongoDB Products"
          : "Fake Store Products"}
      </Typography>

      <Button
        variant="contained"
        onClick={() =>
          setSource(source === "mongodb" ? "fake" : "mongodb")
        }
        sx={{ mb: 4 }}
      >
        {source === "mongodb"
          ? "Show Fake Store Products"
          : "Show MongoDB Products"}
      </Button>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid
            key={product._id || product.id}
            size={{ xs: 12, sm: 6, md: 4 }}
          >
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

    </Container>
  );
}

export default ProductList;

