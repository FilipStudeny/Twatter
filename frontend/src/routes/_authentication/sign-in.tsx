import { RouterLink } from "@Components/navigation/routerLink";
import { GET_ERROR_LIST } from "@Utils/getResponseError";
import { Visibility, VisibilityOff, Person, Lock } from "@mui/icons-material";
import {
	Alert,
	Box,
	Button,
	Checkbox,
	CircularProgress,
	FormControlLabel,
	IconButton,
	InputAdornment,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { useAuthenticationStore } from "stores/authenticationStore";

import { useSignInUserMutation } from "../../../../shared";

const BRAND_LOGO_URL = "https://via.placeholder.com/150";

export const Route = createFileRoute("/_authentication/sign-in")({ component: RouteComponent });

function RouteComponent() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);

	const navigate = useNavigate();
	const signInStore = useAuthenticationStore((state) => state.signIn);

	const { mutateAsync: signInUser, isPending, isError, error } = useSignInUserMutation();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const response = await signInUser(
			{
				signInUser: {
					email: username,
					password: password,
					passwordRepeat: password,
				},
			},
		);
		const { accessToken, refreshToken, userData } = response.SignInUser;

		if (!isError && response.SignInUser) {
			signInStore({ accessToken, refreshToken, userData });
			navigate({ to: "/" });
		}
	};

	const handleClickShowPassword = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<Box
			sx={{
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				py: 4,
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
				<Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
					<img src={BRAND_LOGO_URL} alt='Brand Logo' style={{ height: 60 }} />
				</Box>

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

				{isError &&
					GET_ERROR_LIST(error).map((errMsg: string, index: number) => (
						<Alert key={index} severity='error' sx={{ marginTop: "5px" }}>
							{errMsg}
						</Alert>
					))}

				<form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
					<TextField
						label='Email'
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

					<FormControlLabel
						control={
							<Checkbox
								checked={rememberMe}
								onChange={(e) => setRememberMe(e.target.checked)}
								color='primary'
							/>
						}
						label='Remember me'
						sx={{ fontSize: "0.875rem", color: "text.secondary" }}
					/>

					<Button
						variant='contained'
						type='submit'
						fullWidth
						disabled={isPending}
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
						{isPending ? <CircularProgress size={24} color='inherit' /> : "Sign In"}
					</Button>
				</form>

				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						mt: 2,
					}}
				>
					<RouterLink
						to='/forgotten-password'
						style={{
							textDecoration: "none",
							color: "#1976d2",
							fontSize: "0.875rem",
						}}
					>
						Forgot Password?
					</RouterLink>
					<RouterLink
						to='/sign-up'
						style={{
							textDecoration: "none",
							color: "#1976d2",
							fontSize: "0.875rem",
						}}
					>
						Sign Up
					</RouterLink>
				</Box>
			</Paper>
		</Box>
	);
}

export default RouteComponent;
