import { Alert as MuiAlert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackBar } from "../../redux/slices/app";
import { forwardRef } from "react";

const Alert = forwardRef(function (props, ref) {
	return <MuiAlert {...props} ref={ref} />;
});

const AppSnackbar = () => {
	const dispatch = useDispatch();
	const { open, message, severity } = useSelector((state) => state.app.snackbar);
	console.log(open, message, severity);
	return open ? (
		<Snackbar
			open={open}
			onClose={() => {
				dispatch(closeSnackBar());
			}}
			key={"bottomcenter"}
			autoHideDuration={6000}
			anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
		>
			<Alert
				severity={severity}
				onClose={() => {
					dispatch(closeSnackBar());
				}}
				sx={{ width: "100%" }}
				elevation={6}
				variant="filled"
			>
				{message}
			</Alert>
		</Snackbar>
	) : (
		<></>
	);
};

export default AppSnackbar;
