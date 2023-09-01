import { useTheme } from "@mui/material/styles";
import { Box, IconButton, Stack } from "@mui/material";
import { ChatCircleDots, Phone, Users } from "phosphor-react";
import Logo from "../../assets/Images/logo.ico";

const SidebarNav = () => {
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
						<Box
							sx={{ backgroundColor: theme.palette.primary.main, borderRadius: 1.5 }}
							p={1}
						>
							{" "}
							<IconButton
								onClick={() => {}}
								sx={{ width: "max-content", color: "#ffffff" }}
							>
								<ChatCircleDots />
							</IconButton>
						</Box>{" "}
						<IconButton
							onClick={() => {}}
							sx={{
								width: "max-content",
								color:
									theme.palette.mode === "loght"
										? "#080707"
										: theme.palette.text.primary,
							}}
						>
							<Users />
						</IconButton>
						<IconButton
							onClick={() => {}}
							sx={{
								width: "max-content",
								color:
									theme.palette.mode === "loght"
										? "#080707"
										: theme.palette.text.primary,
							}}
						>
							<Phone />
						</IconButton>
					</Stack>
				</Stack>
			</Stack>
		</Box>
	);
};

export default SidebarNav;
