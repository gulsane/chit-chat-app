import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { ForgotPassword } from "../../redux/slices/auth";

const ResetPasswordForm = () => {
	const dispatch = useDispatch();
	const ResetPasswordSchema = Yup.object().shape({
		email: Yup.string()
			.required("Email is required")
			.email("Email must be a valid email address"),
	});

	const defaultValues = {
		email: "",
	};

	const methods = useForm({
		resolver: yupResolver(ResetPasswordSchema),
		defaultValues,
	});

	const { handleSubmit } = methods;

	const onSubmit = async (data) => {
		dispatch(ForgotPassword({ ...data }));
		try {
		} catch (error) {}
	};

	return (
		<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
			<RHFTextField name="email" label="Email address" />

			<LoadingButton
				loading={false}
				fullWidth
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
				Send Request
			</LoadingButton>
		</FormProvider>
	);
};

export default ResetPasswordForm;
