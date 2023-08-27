import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../components/hook-form";
import { Button, Stack } from "@mui/material";

const VerifyOTPForm = () => {
	const VerifyCodeSchema = Yup.object().shape({
		code1: Yup.string().required("Code is required"),
		code2: Yup.string().required("Code is required"),
		code3: Yup.string().required("Code is required"),
		code4: Yup.string().required("Code is required"),
		code5: Yup.string().required("Code is required"),
		code6: Yup.string().required("Code is required"),
	});

	const defaultValues = {
		code1: "",
		code2: "",
		code3: "",
		code4: "",
		code5: "",
		code6: "",
	};

	const methods = useForm({
		mode: "onChange",
		resolver: yupResolver(VerifyCodeSchema),
		defaultValues,
	});

	const { handleSubmit } = methods;

	const onSubmit = async (data) => {};

	return (
		<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
			<Stack spacing={3}>
				Inputs for codes need to be added
				<Button
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
					Verify
				</Button>
			</Stack>
		</FormProvider>
	);
};

export default VerifyOTPForm;
