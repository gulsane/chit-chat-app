import { useTheme } from "@mui/material/styles";
import { Box, IconButton, Stack } from "@mui/material";
import { ChatCircleDots, Gear, Phone, Users } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../assets/Images/logo.ico";
import { UpdateTab } from "../../redux/slices/app";
import useSettings from "../../hooks/useSettings";
import AntSwitch from "../../components/AntSwitch";
import ProfileMenu from "./ProfileMenu";

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

const SidebarNav = () => {
	const dispatch = useDispatch();
	const { tabIndex } = useSelector((state) => state.app);
	const theme = useTheme();
	const navigate = useNavigate();
	const { onToggleMode } = useSettings();

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
						<img src={Logo} alt="chit-chat" height={64} width={64} />
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
				<Stack
					spacing={4}
					display={"flex"}
					alignItems={"center"}
					justifyContent={"center"}
				>
					<AntSwitch
						defaultChecked={theme.palette.mode === "dark"}
						onChange={onToggleMode}
					/>
					<ProfileMenu />
				</Stack>
			</Stack>
		</Box>
	);
};

export default SidebarNav;
