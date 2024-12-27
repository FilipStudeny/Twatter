import { RouterLink } from "@Components/navigation/routerLink";
import { GET_ERROR_LIST } from "@Utils/getResponseError";
import { Visibility, VisibilityOff, Person, Lock, Email } from "@mui/icons-material";
import {
	Alert,
	Box,
	Button,
	CircularProgress,
	IconButton,
	InputAdornment,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { useSignUpMutation } from "../../../../shared";

const BRAND_LOGO_URL = "https://via.placeholder.com/150";

export const Route = createFileRoute("/_authentication/sign-up")({ component: RouteComponent });

function RouteComponent() {
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const { mutateAsync: signUpUser, isPending, isError, error } = useSignUpMutation();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		await signUpUser({
			createUser: {
				firstName,
				lastName,
				email,
				password,
				repeatPassword,
			},
		});

		if (!isError) {
			navigate({ to: "/sign-in" });
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
					Create Your Account
				</Typography>
				<Typography variant='subtitle1' textAlign='center' gutterBottom sx={{ color: "text.secondary", mb: 3 }}>
					We are excited to have you!
				</Typography>

				{isError &&
					GET_ERROR_LIST(error).map((errMsg: string, index: number) => (
						<Alert key={index} severity='error' sx={{ marginTop: "5px" }}>
							{errMsg}
						</Alert>
					))}

				<form
					onSubmit={handleSubmit}
					style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}
				>
					<TextField
						label='First Name'
						variant='outlined'
						fullWidth
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
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
						label='Last Name'
						variant='outlined'
						fullWidth
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
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
						label='Email'
						variant='outlined'
						fullWidth
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

					{/* Password field */}
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

					{/* Repeat Password field */}
					<TextField
						label='Repeat Password'
						variant='outlined'
						type={showPassword ? "text" : "password"}
						fullWidth
						value={repeatPassword}
						onChange={(e) => setRepeatPassword(e.target.value)}
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
						{isPending ? <CircularProgress size={24} color='inherit' /> : "Sign Up"}
					</Button>
				</form>

				<Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
					<Typography variant='body2' sx={{ color: "text.secondary", mr: 1 }}>
						Already have an account?
					</Typography>
					<RouterLink
						to='/sign-in'
						style={{
							textDecoration: "none",
							color: "#1976d2",
							fontSize: "0.875rem",
						}}
					>
						Sign In
					</RouterLink>
				</Box>
			</Paper>
		</Box>
	);
}

export default RouteComponent;
