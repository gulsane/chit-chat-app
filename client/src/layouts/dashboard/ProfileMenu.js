import { useState } from "react";
import { Avatar } from "@mui/material";
import { faker } from "@faker-js/faker";

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
		</>
	);
};

export default ProfileMenu;
