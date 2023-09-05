import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	snackbar: {
		open: null,
		severity: null,
		message: null,
	},
	sideBar: {
		open: false,
		type: "CONTACT",
	},
	tabIndex: 0,
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
		updateTab(state, action) {
			state.tabIndex = action.payload.tabIndex;
		},
		toggleSidebar(state) {
			state.sideBar.open == !state.sideBar.open;
		},
		updateSidebarType(state, action) {
			state.sideBar.type = action.payload.type;
		},
	},
});

export default slice.reducer;

export const closeSnackBar = () => async (dispatch, getState) => {
	dispatch(slice.actions.closeSnackBar());
};

export const showSnackBar =
	({ severity, message }) =>
	async (dispatch) => {
		dispatch(slice.actions.openSnackBar({ severity, message }));
		setTimeout(() => {
			dispatch(slice.actions.closeSnackBar());
		}, 4000);
	};

export const UpdateTab = ({ tabIndex }) => {
	return async (dispatch) => {
		dispatch(slice.actions.updateTab({ tabIndex }));
	};
};

export const ToggleSidebar = () => async (dispatch) => {
	dispatch(slice.actions.toggleSidebar());
};

export const UpdateSidebarType = (type) => async (dispatch) => {
	dispatch(slice.actions.updateSidebarType({ type }));
};
