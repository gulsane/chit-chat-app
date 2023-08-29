import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { showSnackBar } from "./app";

const initialState = {
	isLoading: false,
	email: "",
	error: null,
	isLoggedIn: false,
	token: null,
	user: null,
	user_id: null,
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
		logIn(state, action) {
			state.isLoggedIn = action.payload.isLoggedIn;
			state.token = action.payload.token;
			state.user_id = action.payload.user_id;
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
				window.location.href = "/auth/verify-otp";
			}
		});
};

export function VerifyEmail(formValues) {
	return async (dispatch) => {
		dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));

		await axios
			.post(
				"/auth/verify-otp",
				{
					...formValues,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then(function (response) {
				dispatch(slice.actions.updateRegisteredEmail({ email: "" }));
				window.localStorage.setItem("user_id", response.data.user_id);
				dispatch(
					slice.actions.logIn({
						isLoggedIn: true,
						token: response.data.token,
					})
				);

				dispatch(
					showSnackBar({ severity: "success", message: response.data.message })
				);
				dispatch(slice.actions.updateIsLoading({ isLoading: false, error: false }));
			})
			.catch(function (error) {
				dispatch(showSnackBar({ severity: "error", message: error.message }));
				dispatch(slice.actions.updateIsLoading({ error: true, isLoading: false }));
			});
	};
}

export const LoginUser = (formValues) => async (dispatch, getState) => {
	dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
	await axios
		.post(
			"auth/login",
			{ ...formValues },
			{ headers: { "Content-Type": "application/json" } }
		)
		.then((response) => {
			dispatch(
				slice.actions.logIn({
					isLoggedIn: true,
					token: response.data.token,
					user_id: response.data.user_id,
				})
			);
			window.localStorage.setItem("user_id".response.data.user_id);
			dispatch(
				showSnackBar({ severity: "success", message: response.data.message })
			);
			dispatch(slice.actions.updateIsLoading({ isLoading: false, error: false }));
		})
		.catch((error) => {
			dispatch(showSnackBar({ severity: "error", message: error.message }));
			dispatch(slice.actions.updateIsLoading({ isLoading: false, error: true }));
		});
};
