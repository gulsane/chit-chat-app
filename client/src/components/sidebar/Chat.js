import { IconButton, Stack, Typography } from "@mui/material";
import { CircleDashed, Users } from "phosphor-react";
import SidebarContainer from "./SidebarContainer";

const Chat = () => {
	return (
		<SidebarContainer>
			<Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
				<Stack
					alignItems={"center"}
					justifyContent={"space-between"}
					direction={"row"}
				>
					<Typography variant="h5">Chats</Typography>
					<Stack direction={"row"} alignItems={"center"} spacing={1}>
						<IconButton sx={{ width: "max-content" }} onClick={() => {}}>
							<Users />
						</IconButton>
						<IconButton sx={{ width: "max-content" }} onClick={() => {}}>
							<CircleDashed />
						</IconButton>
					</Stack>
				</Stack>
			</Stack>
		</SidebarContainer>
	);
};

export default Chat;
