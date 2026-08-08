import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

function ProductCard({ product }) {
  const rating =
    typeof product.rating === "object"
      ? product.rating.rate
      : product.rating;

  return (
    <Card sx={{ height: "100%" }}>

      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.title}
        sx={{ objectFit: "contain", p: 2 }}
      />

      <CardContent>

        <Typography variant="h6">
          {product.title}
        </Typography>

        <Typography variant="h6" sx={{ mt: 1 }}>
          ₹{product.price}
        </Typography>

        <Typography variant="body1" sx={{ mt: 1 }}>
          ⭐ Rating: {rating}
        </Typography>

      </CardContent>

    </Card>
  );
}

export default ProductCard;

