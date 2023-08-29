import { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import FormProvider, { RHFTextField } from "../../components/hook-form";
import { IconButton, InputAdornment, Stack } from "@mui/material";
import { Eye, EyeSlash } from "phosphor-react";

const LoginForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const loginSchema = Yup.object().shape({
		email: Yup.string()
			.required("Email is required")
			.email("Email must be a valid email id"),
		password: Yup.string()
			.required("Password is required")
			.min(8, "Password should be minimum of 8 characters")
			.max(16, "Password should be maximum of 16 characters"),
	});

	const defaultValues = {
		email: "",
		password: "",
	};

	const methods = useForm({
		resolver: yupResolver(loginSchema),
		defaultValues,
	});

	const { reset, setError, handleSubmit } = methods;

	const onSubmit = async (data) => {
		try {
			console.log(data);
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
			<Stack spacing={3}>
				<RHFTextField name="email" type="text" label="Email address" />
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
		</FormProvider>
	);
};

export default LoginForm;
