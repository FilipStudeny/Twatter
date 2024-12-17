import { Box, Button, TextField, Typography, Link, Paper, Toolbar } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";

export const Route = createFileRoute("/sign_in")({ component: RouteComponent });

function RouteComponent() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement actual sign-in logic here, e.g.:
        // await signIn(username, password)
        console.log("Attempting to sign in with:", { username, password });
    };

    return (
        <Box
            component='main'
            sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                p: 3,
                order: 1,
                transition: "margin 0.3s",
            }}
        >
            <Toolbar />
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    maxWidth: 360,
                    gap: 2,
                }}
            >
                <Typography variant='h5' component='h1' textAlign='center'>
                    Sign In
                </Typography>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <TextField
                        label='Username'
                        variant='outlined'
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        label='Password'
                        variant='outlined'
                        type='password'
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button variant='contained' type='submit' fullWidth>
                        Sign In
                    </Button>
                </form>

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                    <Link href='#' variant='body2'>
                        Forgot Password?
                    </Link>
                    <Link href='#' variant='body2'>
                        Sign Up
                    </Link>
                </Box>
            </Paper>
        </Box>
    );
}
