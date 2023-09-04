import { useState } from "react";
import { Avatar, Box, Fade, Menu, MenuItem, Stack } from "@mui/material";
import { faker } from "@faker-js/faker";
import { User, Gear, SignOut } from "phosphor-react";

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
	const [anchorEl, setAnchorEl] = useState(null);

	const openMenu = Boolean(anchorEl);

	const USER_NAME = faker.person.firstName();
	const USER_IMAGE = faker.image.avatar();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
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
				listprops={{
					"aria-labelledby": "fade-button",
				}}
				TransitionComponent={Fade}
				id="profile-positioned-menu"
				aria-labelledby="profile-positioned-button"
				anchorEl={anchorEl}
				open={openMenu}
				onClose={() => {}}
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
							<MenuItem onClick={() => {}} key={idx}>
								<Stack
									onClick={() => {}}
									sx={{ width: 100 }}
									direction="row"
									alignItems={"center"}
									justifyContent="space-between"
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
