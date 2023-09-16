import { Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import {
	ArchiveBox,
	CircleDashed,
	MagnifyingGlass,
	Users,
} from "phosphor-react";
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
				<Stack spacing={1}>
					<Stack spacing={1.5} direction={"row"} alignItems={"center"}>
						<ArchiveBox size={24} />
						<Button variant="text">Archive</Button>
					</Stack>
					<Divider />
				</Stack>
				<Stack sx={{ overflowY: "scroll", flexGrow: 1, height: "100%" }}>
					<Stack spacing={2.4}>
						<Typography variant="subtitle2" sx={{ color: "#676667" }}>
							Pinned
						</Typography>
						<Typography variant="subtitle2" sx={{ color: "#676667" }}>
							All Chats
						</Typography>
					</Stack>
				</Stack>
			</Stack>
		</SidebarContainer>
	);
};

export default Chat;
