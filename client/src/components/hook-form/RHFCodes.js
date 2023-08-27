import { useRef } from "react";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { Stack, TextField } from "@mui/material";

export default function RHFCodes({ keyName = "", inputs = [], ...other }) {
	const codesRef = useRef(null);

	const { control } = useFormContext();

	return (
		<Stack direction="row" spacing={2} justifyContent="center" ref={codesRef}>
			{inputs.map((name, index) => (
				<Controller
					key={name}
					name={`${keyName}${index + 1}`}
					control={control}
					render={({ field, fieldState: { error } }) => (
						<TextField
							{...field}
							error={!!error}
							autoFocus={index === 0}
							placeholder="-"
							onFocus={(event) => event.currentTarget.select()}
							InputProps={{
								sx: {
									width: { xs: 36, sm: 56 },
									height: { xs: 36, sm: 56 },
									"& input": { p: 0, textAlign: "center" },
								},
							}}
							inputProps={{
								maxLength: 1,
								type: "number",
							}}
							{...other}
						/>
					)}
				/>
			))}
		</Stack>
	);
}
