import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

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
		.then(() => {
			dispatch(slice.actions.updateRegisteredEmail({ email: formValues.email }));
			dispatch(slice.actions.updateIsLoading({ isLoading: false, error: false }));
		})
		.catch((error) => {
			console.log(error);
		})
		.finally(() => {});
};
