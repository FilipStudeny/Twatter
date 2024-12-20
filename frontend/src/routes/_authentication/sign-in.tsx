import { RouterLink } from "@Components/navigation/routerLink";
import { Visibility, VisibilityOff, Person, Lock } from "@mui/icons-material";
import { Box, Button, TextField, Typography, Link, Paper, InputAdornment, IconButton } from "@mui/material";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { useAuthenticationStore } from "stores/authenticationStore";

export const Route = createFileRoute("/_authentication/sign-in")({ component: RouteComponent });

function RouteComponent() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	const signIn = useAuthenticationStore((state) => state.signIn);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		signIn();
		navigate({ to: "/home" });
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<Box
			sx={{
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Paper
				elevation={6}
				sx={{
					p: { xs: 3, sm: 5 },
					display: "flex",
					flexDirection: "column",
					width: "100%",
					maxWidth: 400,
					borderRadius: 3,
					background: "white",
				}}
			>
				<Typography
					variant='h4'
					component='h1'
					textAlign='center'
					gutterBottom
					sx={{ fontWeight: "bold", color: "#1976d2" }}
				>
					Welcome Back
				</Typography>
				<Typography variant='subtitle1' textAlign='center' gutterBottom sx={{ color: "text.secondary", mb: 3 }}>
					Please sign in to your account
				</Typography>

				<form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
					<TextField
						label='Username'
						variant='outlined'
						fullWidth
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Person color='action' />
								</InputAdornment>
							),
						}}
					/>
					<TextField
						label='Password'
						variant='outlined'
						type={showPassword ? "text" : "password"}
						fullWidth
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Lock color='action' />
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										onClick={handleClickShowPassword}
										edge='end'
										aria-label='toggle password visibility'
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>

					<Button
						variant='contained'
						type='submit'
						fullWidth
						sx={{
							mt: 1,
							py: 1.5,
							background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
							color: "white",
							fontWeight: "bold",
							borderRadius: 2,
							transition: "background 0.3s",
							"&:hover": { background: "linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)" },
						}}
					>
						Sign In
					</Button>
				</form>

				<Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
					<Link
						href='#'
						variant='body2'
						sx={{ color: "#1976d2", "&:hover": { textDecoration: "underline" } }}
					>
						<RouterLink to='/forgotten-password' style={{ width: "100%" }}>
							Forgot Password?
						</RouterLink>
					</Link>
					<Link
						href='#'
						variant='body2'
						sx={{ color: "#1976d2", "&:hover": { textDecoration: "underline" } }}
					>
						<RouterLink style={{ width: "100%" }}>Sign Up</RouterLink>
					</Link>
				</Box>
			</Paper>
		</Box>
	);
}
