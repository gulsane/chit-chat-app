import React, { useState } from "react";
import { Alert, Snackbar } from "@mui/material";

const AppSnackbar = () => {
	const [open, setOpen] = useState(true);
	const message = "this  is deraulst masseasdf";
	const handleClose = () => {
		setOpen(false);
	};
	const severity = "success";
	return open ? (
		<Snackbar
			open={open}
			onClose={handleClose}
			key={"bottomcenter"}
			autoHideDuration={6000}
			anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
		>
			<Alert
				severity={severity}
				onClose={handleClose}
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
