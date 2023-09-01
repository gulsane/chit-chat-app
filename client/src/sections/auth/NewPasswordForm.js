import { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IconButton, InputAdornment, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Eye, EyeSlash } from "phosphor-react";
import FormProvider, { RHFTextField } from "../../components/hook-form";

const NewPasswordForm = () => {
	const [showPassword, setShowPassword] = useState(false);

	const VerifyCodeSchema = Yup.object().shape({
		password: Yup.string()
			.min(8, "Password must be at least 8 characters")
			.max(16, "Password must be at most 16 characters")
			.required("Password is required"),
		confirmPassword: Yup.string()
			.required("Confirm password is required")
			.oneOf([Yup.ref("password"), null], "Passwords must match"),
	});

	const defaultValues = {
		password: "",
		confirmPassword: "",
	};

	const methods = useForm({
		mode: "onChange",
		resolver: yupResolver(VerifyCodeSchema),
		defaultValues,
	});

	const { handleSubmit } = methods;

	const onSubmit = () => {};

	return (
		<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing={3}>
				<RHFTextField
					name="password"
					label="New Password"
					type={showPassword ? "text" : "password"}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
									{showPassword ? <Eye /> : <EyeSlash />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<RHFTextField
					name="confirmPassword"
					label="Confirm New Password"
					type={showPassword ? "text" : "password"}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
									{showPassword ? <Eye /> : <EyeSlash />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<LoadingButton
					fullWidth
					loading={false}
					size="large"
					type="submit"
					variant="contained"
					sx={{
						mt: 3,
						bgcolor: "text.primary",
						color: (theme) =>
							theme.palette.mode === "light" ? "common.white" : "grey.800",
						"&:hover": {
							bgcolor: "text.primary",
							color: (theme) =>
								theme.palette.mode === "light" ? "common.white" : "grey.800",
						},
					}}
				>
					Update Password
				</LoadingButton>
			</Stack>
		</FormProvider>
	);
};

export default NewPasswordForm;
