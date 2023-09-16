import { IconButton, Stack, Typography } from "@mui/material";
import { CircleDashed, MagnifyingGlass, Users } from "phosphor-react";
import SidebarContainer from "./SidebarContainer";
import { Search, StyledInputBase, SearchIconWrapper } from "../search";

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
				<Stack sx={{ width: "100%" }}>
					<Search>
						<SearchIconWrapper>
							<MagnifyingGlass color="#709CE6" />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search..."
							inputProps={{ "aria-label": "search" }}
						/>
					</Search>
				</Stack>
			</Stack>
		</SidebarContainer>
	);
};

export default Chat;
