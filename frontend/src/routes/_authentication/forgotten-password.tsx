import { RouterLink } from "@Components/navigation/routerLink";
import { Email } from "@mui/icons-material";
import {
	Box,
	Button,
	TextField,
	Typography,
	Link,
	Paper,
	InputAdornment,
	Alert,
	CircularProgress,
} from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_authentication/forgotten-password")({ component: RouteComponent });

function RouteComponent() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setSuccess("");
		setError("");

		// Simulate API call for password recovery
		try {
			// Replace this with actual API call, e.g., await requestPasswordRecovery(email)
			await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
			setSuccess("If an account with this email exists, a password reset link has been sent.");
		} catch {
			setError("Something went wrong. Please try again later.");
		} finally {
			setLoading(false);
		}
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
					maxWidth: 600,
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
					Password Recovery
				</Typography>
				<Typography variant='subtitle1' textAlign='center' gutterBottom sx={{ color: "text.secondary", mb: 3 }}>
					Enter your email address to reset your password
				</Typography>

				{success && (
					<Alert severity='success' sx={{ mb: 2 }}>
						{success}
					</Alert>
				)}
				{error && (
					<Alert severity='error' sx={{ mb: 2 }}>
						{error}
					</Alert>
				)}

				<form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
					<TextField
						label='Email Address'
						variant='outlined'
						fullWidth
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Email color='action' />
								</InputAdornment>
							),
						}}
					/>

					<Button
						variant='contained'
						type='submit'
						fullWidth
						disabled={loading}
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
						{loading ? <CircularProgress size={24} color='inherit' /> : "Send Reset Link"}
					</Button>
				</form>

				<Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
					<Link
						href='/sign_in'
						variant='body2'
						sx={{ color: "#1976d2", "&:hover": { textDecoration: "underline" } }}
					>
						<RouterLink to="/sign-in" style={{ width: "100%" }}>
							Back to Sign In
						</RouterLink>
					</Link>
				</Box>
			</Paper>
		</Box>
	);
}
