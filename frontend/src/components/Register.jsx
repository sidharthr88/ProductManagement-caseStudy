import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Alert,
} from "@mui/material";

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            await axios.post(
                "http://localhost:5000/api/auth/register",
                {
                    name,
                    email,
                    password,
                }
            );

            setSuccess("Registration successful!");

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "calc(100vh - 64px)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
                px: 2,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: "100%",
                    maxWidth: 400,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    textAlign="center"
                    gutterBottom
                >
                    Create Account
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                    mb={3}
                >
                    Register to manage your products
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {success}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        fullWidth
                        required
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        required
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        required
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        sx={{
                            mt: 2,
                            py: 1.2,
                            textTransform: "none",
                        }}
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </Button>
                </Box>

                <Typography
                    variant="body2"
                    textAlign="center"
                    sx={{ mt: 3 }}
                >
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        style={{
                            textDecoration: "none",
                        }}
                    >
                        Login
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
}

export default Register;