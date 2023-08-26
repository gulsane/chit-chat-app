import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { showSnackBar } from "./app";

const initialState = {
	isLoading: false,
	email: "",
	error: null,
};

const slice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		updateIsLoading(state, action) {
			state.error = action.payload.error;
			state.isLoading = action.payload.isLoading;
		},
		updateRegisteredEmail(state, action) {
			state.email = action.payload.email;
		},
	},
});

export default slice.reducer;

export const RegisterUser = (formValues) => async (dispatch, getState) => {
	dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
	await axios
		.post(
			"/auth/register",
			{ ...formValues },
			{ "Content-type": "application/json" }
		)
		.then((response) => {
			dispatch(slice.actions.updateRegisteredEmail({ email: formValues.email }));
			dispatch(slice.actions.updateIsLoading({ isLoading: false, error: false }));
			dispatch(
				showSnackBar({ severity: "success", message: response.data.message })
			);
		})
		.catch((error) => {
			dispatch(
				showSnackBar({
					severity: "error",
					message: error.message,
				})
			);
			dispatch(slice.actions.updateIsLoading({ error: true, isLoading: false }));
		})
		.finally(() => {
			if (!getState().auth.error) {
				window.location.href = "/auth/verify";
			}
		});
};
