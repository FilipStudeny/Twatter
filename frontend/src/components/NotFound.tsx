import { RouterLink } from "@Components/navigation/routerLink";
import { Box, Typography } from "@mui/material";

export const NotFound = () => {
	return (
		<Box
			display='flex'
			flexDirection='column'
			alignItems='center'
			justifyContent='center'
			minHeight='100vh'
			bgcolor='background.default'
			color='text.primary'
			p={2}
			textAlign='center'
		>
			<Typography variant='h1' component='h1' gutterBottom>
				404
			</Typography>
			<Typography variant='h6' component='p' gutterBottom>
				Oops! The page you are looking for does not exist.
			</Typography>
			<RouterLink to='/home' style={{ textDecoration: "none", width: "100%", color: "inherit" }}>
				Go to Home
			</RouterLink>
		</Box>
	);
};
