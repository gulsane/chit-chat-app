import { useState, useEffect } from "react";
import { alpha, styled } from "@mui/material/styles";
import {
	Backdrop,
	Divider,
	IconButton,
	Stack,
	Typography,
} from "@mui/material";
import useSettings from "../../../hooks/useSettings";
import { AnimatePresence, m } from "framer-motion";
import cssStyles from "../../../utils/cssStyles";
import Iconify from "../../Iconify";
import { NAVBAR, defaultSettings } from "../../../config";

import Scrollbar from "../../Scrollbar";
import ToggleButton from "./ToggleButton";

const RootStyle = styled(m.div)(({ theme }) => ({
	...cssStyles(theme).bgBlur({
		color: theme.palette.background.paper,
		opacity: 0.92,
	}),
	top: 0,
	right: 0,
	bottom: 0,
	display: "flex",
	position: "fixed",
	overflow: "hidden",
	width: NAVBAR.BASE_WIDTH,
	flexDirection: "column",
	margin: theme.spacing(2),
	paddingBottom: theme.spacing(3),
	zIndex: theme.zIndex.drawer + 3,
	borderRadius: Number(theme.shape.borderRadius) * 1.5,
	boxShadow: `-24px 12px 32px -4px ${alpha(
		theme.palette.mode === "light"
			? theme.palette.grey[500]
			: theme.palette.common.black,
		0.16
	)}`,
}));

const SettingsDrawer = function () {
	const {
		themeMode,
		themeLayout,
		themeStretch,
		themeContrast,
		themeDirection,
		themeColorPresets,
	} = useSettings();

	const [open, setOpen] = useState(false);

	const notDefault =
		themeMode !== defaultSettings.themeMode ||
		themeLayout !== defaultSettings.themeLayout ||
		themeStretch !== defaultSettings.themeStretch ||
		themeContrast !== defaultSettings.themeContrast ||
		themeDirection !== defaultSettings.themeDirection ||
		themeColorPresets !== defaultSettings.themeColorPresets;

	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	}, [open]);

	const handleClose = () => {
		setOpen(false);
	};

	const onToggle = () => {
		setOpen((pre) => !pre);
	};

	return (
		<>
			<Backdrop
				open={open}
				onClick={handleClose}
				sx={{
					background: "transparent",
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}
			/>
			{!open && (
				<ToggleButton open={open} notDefault={notDefault} onToggle={onToggle} />
			)}
			<AnimatePresence>
				{open && (
					<RootStyle>
						<Stack
							direction="row"
							alignItems="center"
							justifyContent="space-between"
							sx={{ py: 2, pr: 1, pl: 2.5 }}
						>
							<Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
								Settings
							</Typography>

							<IconButton onClick={() => {}}>
								<Iconify icon={"ic:round-refresh"} width={20} height={20} />
							</IconButton>

							<IconButton onClick={() => {}}>
								<Iconify icon={"eva:close-fill"} width={20} height={20} />
							</IconButton>
						</Stack>
						<Divider sx={{ borderStyle: "dashed" }} />
						<Scrollbar sx={{ flexGrow: 1 }}></Scrollbar>
					</RootStyle>
				)}
			</AnimatePresence>
		</>
	);
};

export default SettingsDrawer;
