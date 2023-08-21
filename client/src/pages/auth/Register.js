import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
	Stack,
	Typography,
	Link,
	Alert,
	InputAdornment,
	IconButton,
} from "@mui/material";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider as Form } from "react-hook-form";
import { Eye, EyeSlash } from "phosphor-react";
import { LoadingButton } from "@mui/lab";
import PropTypes from "prop-types";
import RHFTextField from "../../components/hook-form/RHFTextField";

const FormProvider = ({ children, onSubmit, methods }) => {
	return (
		<Form {...methods}>
			<form onSubmit={onSubmit}>{children}</form>
		</Form>
	);
};

FormProvider.propTypes = {
	children: PropTypes.node,
	methods: PropTypes.object,
	onSubmit: PropTypes.func,
};

const RegisterForm = () => {
	const isLoading = false;
	const [showPassword, setShowPassword] = useState(false);

	const LoginSchema = Yup.object().shape({
		firstName: Yup.string().required("First name required"),
		lastName: Yup.string().required("Last name required"),
		email: Yup.string()
			.required("Email is required")
			.email("Email must be a valid email address"),
		password: Yup.string()
			.min(8, "Password must be more than 8 characters")
			.max(16, "Password must be less than 16 characters")
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

const Register = () => {
	return (
		<>
			<Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
				<Typography variant="h4">Get started with Tawk.</Typography>

				<Stack direction="row" spacing={0.5}>
					<Typography variant="body2"> Already have an account? </Typography>

					<Link component={RouterLink} to={"/auth/login"} variant="subtitle2">
						Sign in
					</Link>
				</Stack>
			</Stack>
			<RegisterForm />

			<Typography
				component="div"
				sx={{
					color: "text.secondary",
					mt: 3,
					typography: "caption",
					textAlign: "center",
				}}
			>
				{"By signing up, I agree to "}
				<Link underline="always" color="text.primary">
					Terms of Service
				</Link>
				{" and "}
				<Link underline="always" color="text.primary">
					Privacy Policy
				</Link>
				.
			</Typography>
		</>
	);
};

export default Register;
