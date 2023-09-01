import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Divider, IconButton, Stack } from "@mui/material";
import { ChatCircleDots, Gear, Phone, Users } from "phosphor-react";
import Logo from "../../assets/Images/logo.ico";

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
	const [tab, setTab] = useState(0);
	const theme = useTheme();
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
							el.index === tab ? (
								<Box
									sx={{
										backgroundColor: theme.palette.primary.main,
										borderRadius: 1.5,
									}}
									p={1}
								>
									<IconButton
										onClick={() => {
											setTab(el.index);
										}}
										sx={{ width: "max-content", color: "#ffffff" }}
									>
										{el.icon}
									</IconButton>
								</Box>
							) : (
								<Box
									sx={{
										backgroundColor: "transparent",
									}}
									p={1}
								>
									<IconButton
										onClick={() => {
											setTab(el.index);
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
			</Stack>
		</Box>
	);
};

export default SidebarNav;
