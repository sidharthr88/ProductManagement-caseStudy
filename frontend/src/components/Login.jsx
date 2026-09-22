import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Alert,
} from "@mui/material";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await axios.post(
                "/api/auth/login",
                {
                    email,
                    password,
                }
            );

            const { token, user } = response.data;

            console.log("LOGIN RESPONSE:", response.data);
            console.log("LOGGED IN USER:", user);

            login(user, token);

            navigate("/");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Login failed. Please try again."
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
                    Login
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                    mb={3}
                >
                    Login to your account
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
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
                        {loading ? "Logging in..." : "Login"}
                    </Button>
                </Box>

                <Typography
                    variant="body2"
                    textAlign="center"
                    sx={{ mt: 3 }}
                >
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        style={{
                            textDecoration: "none",
                        }}
                    >
                        Register
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
}

export default Login;