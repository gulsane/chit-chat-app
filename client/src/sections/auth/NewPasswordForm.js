import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const NewPasswordForm = () => {
	const VerifyCodeSchema = Yup.object().shape({
		password: Yup.string()
			.min(6, "Password must be at least 6 characters")
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

	return <div> new password form needs to be added</div>;
};

export default NewPasswordForm;
