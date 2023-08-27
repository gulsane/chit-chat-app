import { Stack, Typography } from "@mui/material";

const VerifyOTP = () => {
	const DEFAULT_EMAIL = "email@123";
	return (
		<>
			<Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
				<Typography variant="h4">Please Verify OTP</Typography>
				<Stack direction={"row"}>
					<Typography variant="body2">
						OTP successfully sent to email ({DEFAULT_EMAIL})
					</Typography>
				</Stack>
			</Stack>
		</>
	);
};

export default VerifyOTP;
