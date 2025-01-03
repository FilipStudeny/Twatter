import { alpha, Badge, InputBase, keyframes } from "@mui/material";
import { styled } from "@mui/material/styles";

const pulse = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  70% {
    transform: scale(1.4);
    opacity: 0;
  }
  100% {
    transform: scale(0.8);
    opacity: 0;
  }
`;

// Create a StyledBadge component with customized styles and animation
export const StyledBadge = styled(Badge, { shouldForwardProp: (prop) => prop !== "status" })<{ status: "online" | "offline" }>(
	({ theme, status }) => ({
		"& .MuiBadge-badge": {
			backgroundColor: status === "online" ? theme.palette.success.main : theme.palette.error.main,
			color: status === "online" ? theme.palette.success.main : theme.palette.error.main,
			width: 14,
			height: 14,
			borderRadius: "50%",
			boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
			transform: "translate(25%, 25%)",
			"&::after":
				status === "online"
					? {
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						borderRadius: "50%",
						animation: `${pulse} 1.2s infinite ease-in-out`,
						border: `1px solid ${theme.palette.success.main}`,
						content: "\"\"",
					}
					: {},
		},
	}),
);

// Search bar styling
export const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.action.hover, 0.15),
	"&:hover": { backgroundColor: alpha(theme.palette.action.hover, 0.25) },
	marginBottom: theme.spacing(1.5), // Reduced margin to minimize space
	marginLeft: 0,
	width: "100%",
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	width: "100%",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1.2, 1, 1.2, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
	},
}));
