import { useState } from "react";
import { Avatar, Box, Fade, Menu, MenuItem, Stack } from "@mui/material";
import { faker } from "@faker-js/faker";
import { User, Gear, SignOut } from "phosphor-react";
import { useNavigate } from "react-router-dom";

const Profile_Menu = [
	{
		title: "Profile",
		icon: <User />,
	},
	{
		title: "Settings",
		icon: <Gear />,
	},
	{
		title: "Sign Out",
		icon: <SignOut />,
	},
];

const ProfileMenu = () => {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState(null);

	const openMenu = Boolean(anchorEl);

	const USER_NAME = faker.person.firstName();
	const USER_IMAGE = faker.image.avatar();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<>
			<Avatar
				id="profile-positioned-button"
				aria-controls={openMenu ? "profile-positioned-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={openMenu ? "true" : undefined}
				alt={USER_NAME}
				src={USER_IMAGE}
				onClick={handleClick}
			/>
			<Menu
				MenuListProps={{
					"aria-labelledby": "fade-button",
				}}
				TransitionComponent={Fade}
				id="profile-positioned-menu"
				aria-labelledby="profile-positioned-button"
				anchorEl={anchorEl}
				open={openMenu}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
			>
				<Box p={1}>
					<Stack spacing={1}>
						{Profile_Menu.map((el, idx) => (
							<MenuItem onClick={handleClose} key={idx}>
								<Stack
									sx={{ width: 100 }}
									direction="row"
									alignItems={"center"}
									justifyContent="space-between"
									onClick={() => {
										if (idx === 0) {
											navigate("/profile");
										} else if (idx === 1) {
											navigate("/settings");
										} else {
										}
									}}
								>
									<span>{el.title}</span>
									{el.icon}
								</Stack>
							</MenuItem>
						))}
					</Stack>
				</Box>
			</Menu>
		</>
	);
};

export default ProfileMenu;
