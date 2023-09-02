import { useTheme, styled } from "@mui/material/styles";
import { Box, IconButton, Stack, Switch } from "@mui/material";
import { ChatCircleDots, Gear, Phone, Users } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../assets/Images/logo.ico";
import { UpdateTab } from "../../redux/slices/app";

const NAV_BUTTONS = [
	{
		index: 0,
		icon: <ChatCircleDots />,
		path: "/app",
	},
	{
		index: 1,
		icon: <Users />,
		path: "/group",
	},
	{
		index: 2,
		icon: <Phone />,
		path: "/call",
	},
	{
		index: 3,
		icon: <Gear />,
		path: "/settings",
	},
];

const AntSwitch = styled(Switch)(({ theme }) => ({
	width: 56,
	height: 30,
	padding: 0,
	"& .MuiSwitch-switchBase": {
		margin: 2,
		padding: 0,
		transform: "translateX(0px)",
		"&.Mui-checked": {
			color: "#fff",
			transform: "translateX(26px)",
			"& .MuiSwitch-thumb:before": {
				backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
					"#fff"
				)}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
			},
			"& + .MuiSwitch-track": {
				opacity: 1,
				backgroundColor:
					theme.palette.mode === "dark"
						? "rgba(255,255,255,.35)"
						: "rgba(0,0,0,.25)",
			},
		},
	},
	"& .MuiSwitch-thumb": {
		backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
		width: 26,
		height: 26,
		"&:before": {
			content: "''",
			position: "absolute",
			width: "100%",
			height: "100%",
			left: 0,
			top: 0,
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center",
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
				"#fff"
			)}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
		},
	},
	"& .MuiSwitch-track": {
		opacity: 1,
		backgroundColor:
			theme.palette.mode === "dark" ? "rgba(255,255,255,.35)" : "rgba(0,0,0,.25)",
		borderRadius: 36 / 2,
		boxSizing: "border-box",
	},
}));

const SidebarNav = () => {
	const dispatch = useDispatch();
	const { tabIndex } = useSelector((state) => state.app);
	const theme = useTheme();
	const navigate = useNavigate();

	const handleNavChange = (tabIndex, path) => {
		dispatch(UpdateTab({ tabIndex }));
		navigate(path);
	};

	return (
		<Box
			sx={{
				height: "100vh",
				width: 100,
				backgroundColor:
					theme.palette.mode === "light"
						? "#F0F4FA"
						: theme.palette.background.paper,
				boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
			}}
		>
			<Stack
				py={3}
				alignItems={"center"}
				justifyContent={"space-between"}
				sx={{ height: "100%" }}
			>
				<Stack alignItems={"center"} spacing={4}>
					<Box
						sx={{
							height: 64,
							width: 64,
							borderRadius: 1.5,
							backgroundColor: theme.palette.primary.main,
						}}
					>
						<img src={Logo} alt="chit-chat" />
					</Box>
					<Stack
						sx={{ width: "max-content" }}
						direction="column"
						alignItems={"center"}
						spacing={3}
					>
						{NAV_BUTTONS.map((el) =>
							el.index === tabIndex ? (
								<Box
									key={el.index}
									sx={{
										backgroundColor: theme.palette.primary.main,
										borderRadius: 1.5,
									}}
									p={1}
								>
									<IconButton
										onClick={() => {
											handleNavChange(el.index, el.path);
										}}
										sx={{ width: "max-content", color: "#ffffff" }}
									>
										{el.icon}
									</IconButton>
								</Box>
							) : (
								<Box
									key={el.index}
									sx={{
										backgroundColor: "transparent",
									}}
									p={1}
								>
									<IconButton
										onClick={() => {
											handleNavChange(el.index, el.path);
										}}
										sx={{
											width: "max-content",
											color:
												theme.palette.mode === "light"
													? "#080707"
													: theme.palette.text.primary,
										}}
									>
										{el.icon}
									</IconButton>
								</Box>
							)
						)}
					</Stack>
				</Stack>
				<Stack spacing={4}>
					<AntSwitch
						defaultChecked={theme.palette.mode === "dark"}
						onChange={() => {}}
					/>
				</Stack>
			</Stack>
		</Box>
	);
};

export default SidebarNav;
