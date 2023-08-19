import { Container, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<>
			<Container sx={{ mt: 5 }} maxWidth="sm">
				<Stack spacing={5}>
					<Stack sx={{ width: "100%" }} direction="column" alignItems={"center"}>
						Auth logo icon
					</Stack>
					<Outlet />
				</Stack>
			</Container>
		</>
	);
};

export default AuthLayout;
