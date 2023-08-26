import { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, Alert, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Eye, EyeSlash } from "phosphor-react";
import { useDispatch } from "react-redux";
import RHFTextField from "../../components/hook-form/RHFTextField";
import FormProvider from "../../components/hook-form/FormProvider";
import { RegisterUser } from "../../redux/slices/auth";

const RegisterForm = () => {
	const dispatch = useDispatch();
	const isLoading = false;
	const [showPassword, setShowPassword] = useState(false);

	const LoginSchema = Yup.object().shape({
		firstName: Yup.string().required("First name required"),
		lastName: Yup.string().required("Last name required"),
		email: Yup.string()
			.required("Email is required")
			.email("Email must be a valid email address"),
		password: Yup.string()
			.min(8, "password must be between 8 to 16 characters")
			.max(16, "password must be between 8 to 16 characters")
			.required("Password is required"),
	});

	const defaultValues = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	};

	const methods = useForm({
		resolver: yupResolver(LoginSchema),
		defaultValues,
	});

	const {
		reset,
		setError,
		handleSubmit,
		formState: { errors },
	} = methods;

	const onSubmit = async (data) => {
		try {
			// submit data to backend
			dispatch(RegisterUser({ ...data }));
		} catch (error) {
			console.error(error);
			reset();
			setError("afterSubmit", {
				...error,
				message: error.message,
			});
		}
	};

	return (
		<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing={3} mb={4}>
				{!!errors.afterSubmit && (
					<Alert severity="error">{errors.afterSubmit.message}</Alert>
				)}

				<Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
					<RHFTextField name="firstName" label="First name" />
					<RHFTextField name="lastName" label="Last name" />
				</Stack>

				<RHFTextField name="email" label="Email address" />

				<RHFTextField
					name="password"
					label="Password"
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
			</Stack>

			<LoadingButton
				fullWidth
				color="inherit"
				size="large"
				type="submit"
				variant="contained"
				loading={isLoading}
				sx={{
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
				Create Account
			</LoadingButton>
		</FormProvider>
	);
};

export default RegisterForm;
