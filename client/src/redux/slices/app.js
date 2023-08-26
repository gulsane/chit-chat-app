import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	snackbar: {
		open: null,
		severity: null,
		message: null,
	},
};

const slice = createSlice({
	name: "app",
	initialState,
	reducers: {
		openSnackBar(state, action) {
			state.snackbar.open = true;
			state.snackbar.severity = action.payload.severity;
			state.snackbar.message = action.payload.message;
		},
		closeSnackBar(state) {
			state.snackbar.open = false;
			state.snackbar.message = null;
		},
	},
});

export default slice.reducer;
