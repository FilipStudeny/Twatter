import { ContentCopy as ContentCopyIcon } from "@mui/icons-material";
import {
	Box,
	Popover,
	Tabs,
	Tab,
	Typography,
	Slider,
	TextField,
	InputAdornment,
	IconButton,
	Tooltip,
	SxProps,
	Theme,
} from "@mui/material";
import React, { useState, useEffect, useRef, useCallback } from "react";

/** More detailed types for color conversions. */
type RGB = { r: number, g: number, b: number };
type HSV = { h: number, s: number, v: number };

interface ColorPickerProps {
	/** The currently selected color in hex, e.g. "#2196F3" */
	value: string,
	/** Called whenever the user picks a new color */
	onChange: (newColorHex: string)=> void,
	/** Optional array of "popular" swatches if you want to display them */
	popularColors?: string[],

	/**
	 *  STYLING PROPS
	 *  These let you override or extend styles for different parts of the UI.
	 */
	/** Custom styles for the color preview box (the small square you click) */
	colorBoxSx?: SxProps<Theme>,
	/** Custom styles for the popover’s paper container */
	popoverPaperSx?: SxProps<Theme>,
	/** Custom styles for the main content box inside the popover */
	contentBoxSx?: SxProps<Theme>,
}

/**
 * A color picker that throttles calls to `onChange` with `requestAnimationFrame`.
 *
 * It maintains an internal `liveHex` state for instant UI updates, but only
 * calls the parent's `onChange` at most ~60 times/sec, improving performance.
 */
export const ColorPicker: React.FC<ColorPickerProps> = ({
	value,
	onChange,
	popularColors = ["#F44336", "#E91E63", "#2196F3", "#00BCD4", "#4CAF50"],
	colorBoxSx,
	popoverPaperSx,
	contentBoxSx,
}) => {
	// 1) Keep an internal local color (liveHex) for real-time UI updates.
	//    We'll sync it with the parent `value` if that changes externally.
	const [liveHex, setLiveHex] = useState(value);

	// 2) requestAnimationFrame ID to throttle parent updates
	const rafIdRef = useRef<number | null>(null);

	// If the parent changes the color, update our local state
	useEffect(() => {
		setLiveHex(value);
	}, [value]);

	/**
	 * Instead of calling `onChange(newHex)` directly, we schedule it via requestAnimationFrame.
	 * This reduces parent re-renders if the user drags quickly.
	 */

	const scheduleParentUpdate = useCallback(
		(newHex: string) => {
			if (rafIdRef.current == null) {
				rafIdRef.current = requestAnimationFrame(() => {
					rafIdRef.current = null;
					onChange(newHex);
				});
			}
		},
		[onChange],
	);

	/**
	 * The main function we call whenever the user picks a new color internally.
	 * This updates local UI state immediately and schedules a throttled parent update.
	 */
	const updateColor = useCallback(
		(newHex: string) => {
			setLiveHex(newHex); // Update local UI state immediately
			scheduleParentUpdate(newHex);
		},
		[scheduleParentUpdate],
	);

	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [tabValue, setTabValue] = useState(0);

	// HSV drag states
	const [isDraggingSV, setIsDraggingSV] = useState(false);
	const [svBoxRect, setSvBoxRect] = useState<DOMRect | null>(null);

	const [isDraggingHue, setIsDraggingHue] = useState(false);
	const [hueBoxRect, setHueBoxRect] = useState<DOMRect | null>(null);

	// Convert the current local hex to internal RGB/HSV each render
	const currentRGB = hexToRgb(liveHex) || { r: 0, g: 0, b: 0 };
	const currentHSV = rgbToHsv(currentRGB.r, currentRGB.g, currentRGB.b);

	/** ==================== HSV Updating ===================== */
	const updateFromHsv = useCallback(
		(h: number, s: number, v: number) => {
			const rgb = hsvToRgb(h, s, v);
			const newHex = rgbToHex(rgb.r, rgb.g, rgb.b);
			updateColor(newHex);
		},
		[updateColor],
	);
	/** =============== SATURATION / VALUE =============== */
	function handleSvMouseDown(e: React.MouseEvent<HTMLDivElement>) {
		e.preventDefault();
		const box = e.currentTarget.getBoundingClientRect();
		setSvBoxRect(box);
		setIsDraggingSV(true);

		// Immediately update color on mouse-down
		updateSaturationValue(e.clientX, e.clientY, box);
	}

	const updateSaturationValue = useCallback(
		(clientX: number, clientY: number, rect: DOMRect) => {
			const s = Math.round(((clientX - rect.left) / rect.width) * 100);
			const v = Math.round((1 - (clientY - rect.top) / rect.height) * 100);
			updateFromHsv(currentHSV.h, clamp01to100(s), clamp01to100(v));
		},
		[updateFromHsv, currentHSV.h],
	);

	useEffect(() => {
		if (!isDraggingSV) return;

		function onMouseMove(e: MouseEvent) {
			e.preventDefault();
			if (!svBoxRect) return;
			updateSaturationValue(e.clientX, e.clientY, svBoxRect);
		}

		function onMouseUp(e: MouseEvent) {
			e.preventDefault();
			setIsDraggingSV(false);
		}

		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);

		return () => {
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);
		};
	}, [isDraggingSV, svBoxRect, currentHSV.h, updateSaturationValue]);

	/** =============== HUE =============== */
	function handleHueMouseDown(e: React.MouseEvent<HTMLDivElement>) {
		e.preventDefault();
		const box = e.currentTarget.getBoundingClientRect();
		setHueBoxRect(box);
		setIsDraggingHue(true);

		// Immediately update hue on mouse-down
		updateHue(e.clientX, box);
	}

	const updateHue = useCallback(
		(clientX: number, rect: DOMRect) => {
			const ratio = (clientX - rect.left) / rect.width;
			const newHue = Math.round(ratio * 360);
			updateFromHsv(clamp0to360(newHue), currentHSV.s, currentHSV.v);
		},
		[updateFromHsv, currentHSV.s, currentHSV.v],
	);

	useEffect(() => {
		if (!isDraggingHue) return;

		function onMouseMove(e: MouseEvent) {
			e.preventDefault();
			if (!hueBoxRect) return;
			updateHue(e.clientX, hueBoxRect);
		}

		function onMouseUp(e: MouseEvent) {
			e.preventDefault();
			setIsDraggingHue(false);
		}

		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);

		return () => {
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);
		};
	}, [isDraggingHue, hueBoxRect, currentHSV.s, currentHSV.v, updateHue]);

	/** =============== RGB / HEX Handlers =============== */
	const handleRgbSlider = (channel: keyof RGB) => (_e: Event, val: number | number[]) => {
		if (typeof val !== "number") return;
		const clamped = Math.max(0, Math.min(255, val));
		const newRGB = { ...currentRGB, [channel]: clamped };
		updateColor(rgbToHex(newRGB.r, newRGB.g, newRGB.b));
	};

	const handleRgbInput = (channel: keyof RGB) => (e: React.ChangeEvent<HTMLInputElement>) => {
		const clamped = Math.max(0, Math.min(255, Number(e.target.value)));
		const newRGB = { ...currentRGB, [channel]: clamped };
		updateColor(rgbToHex(newRGB.r, newRGB.g, newRGB.b));
	};

	function handleHexInput(e: React.ChangeEvent<HTMLInputElement>) {
		let newVal = e.target.value;
		if (!newVal.startsWith("#")) newVal = "#" + newVal;
		updateColor(newVal);
	}

	return (
		<>
			{/* The small color box that opens the popover */}
			<Box
				sx={{
					width: 40,
					height: 40,
					borderRadius: 1,
					backgroundColor: liveHex,
					cursor: "pointer",
					"&:hover": { opacity: 0.9 },
					...colorBoxSx,
				}}
				onClick={(e) => setAnchorEl(e.currentTarget)}
			/>

			<Popover
				open={Boolean(anchorEl)}
				anchorEl={anchorEl}
				onClose={() => setAnchorEl(null)}
				anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
				transformOrigin={{ vertical: "top", horizontal: "left" }}
				PaperProps={{ sx: popoverPaperSx }}
			>
				<Box sx={{ width: 300, p: 2, ...contentBoxSx }}>
					<Tabs value={tabValue} onChange={(_evt, newTab) => setTabValue(newTab)} sx={{ mb: 2 }}>
						<Tab label='Palette' />
						<Tab label='RGB' />
						<Tab label='Hex' />
					</Tabs>

					{/* PALLETTE (HSV) */}
					{tabValue === 0 && (
						<Box>
							<Typography variant='subtitle2' sx={{ mb: 1 }}>
								Pick via HSV Palette
							</Typography>

							{/* Saturation/Value area */}
							<Box
								sx={{
									position: "relative",
									width: "100%",
									height: 150,
									mb: 2,
									cursor: "crosshair",
									backgroundColor: `hsl(${currentHSV.h}, 100%, 50%)`,
									borderRadius: 1,
									overflow: "hidden",
								}}
								onMouseDown={handleSvMouseDown}
							>
								{/* White gradient */}
								<Box
									sx={{
										position: "absolute",
										top: 0,
										left: 0,
										right: 0,
										bottom: 0,
										background: "linear-gradient(to right, #fff, transparent)",
									}}
								/>
								{/* Black gradient */}
								<Box
									sx={{
										position: "absolute",
										top: 0,
										left: 0,
										right: 0,
										bottom: 0,
										background: "linear-gradient(to top, #000, transparent)",
									}}
								/>
								{/* Indicator */}
								<Box
									sx={{
										position: "absolute",
										left: `${currentHSV.s}%`,
										top: `${100 - currentHSV.v}%`,
										transform: "translate(-50%, -50%)",
										width: 12,
										height: 12,
										border: "2px solid white",
										borderRadius: "50%",
										boxShadow: "0 0 0 1px rgba(0,0,0,0.3)",
										pointerEvents: "none",
									}}
								/>
							</Box>

							{/* Hue slider */}
							<Box sx={{ mb: 2 }}>
								<Typography variant='caption' sx={{ mb: 0.5, display: "block" }}>
									Hue
								</Typography>
								<Box
									sx={{
										position: "relative",
										height: 12,
										background:
											"linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)",
										borderRadius: 1,
										cursor: "pointer",
									}}
									onMouseDown={handleHueMouseDown}
								>
									<Box
										sx={{
											position: "absolute",
											left: `${(currentHSV.h / 360) * 100}%`,
											top: "50%",
											transform: "translate(-50%, -50%)",
											width: 16,
											height: 16,
											border: "2px solid white",
											borderRadius: "50%",
											boxShadow: "0 0 0 1px rgba(0,0,0,0.3)",
											backgroundColor: `hsl(${currentHSV.h}, 100%, 50%)`,
											pointerEvents: "none",
										}}
									/>
								</Box>
							</Box>

							{/* Popular swatches */}
							<Typography variant='subtitle2' sx={{ mb: 1 }}>
								Popular Colors
							</Typography>
							<Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0.5 }}>
								{popularColors.map((swatch) => (
									<Tooltip key={swatch} title={swatch}>
										<Box
											sx={{
												width: 30,
												height: 30,
												backgroundColor: swatch,
												cursor: "pointer",
												borderRadius: 0.5,
												border:
													swatch.toLowerCase() === liveHex.toLowerCase()
														? "2px solid #1976d2"
														: "none",
												"&:hover": { opacity: 0.8 },
											}}
											onClick={() => updateColor(swatch)}
										/>
									</Tooltip>
								))}
							</Box>
						</Box>
					)}

					{/* RGB */}
					{tabValue === 1 && (
						<Box>
							{(["r", "g", "b"] as const).map((channel) => (
								<Box key={channel} sx={{ mb: 2 }}>
									<Typography variant='caption' sx={{ mb: 1, display: "block" }}>
										{channel.toUpperCase()}
									</Typography>
									<Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
										<Slider
											value={currentRGB[channel]}
											min={0}
											max={255}
											onChange={handleRgbSlider(channel)}
											sx={{ flex: 1 }}
										/>
										<TextField
											value={currentRGB[channel]}
											onChange={handleRgbInput(channel)}
											size='small'
											sx={{ width: 70 }}
											inputProps={{ type: "number", min: 0, max: 255 }}
										/>
									</Box>
								</Box>
							))}
						</Box>
					)}

					{/* HEX */}
					{tabValue === 2 && (
						<Box>
							<TextField
								value={stripHash(liveHex).toUpperCase()}
								onChange={handleHexInput}
								fullWidth
								InputProps={{
									startAdornment: <InputAdornment position='start'>#</InputAdornment>,
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												onClick={() => navigator.clipboard.writeText(liveHex)}
												size='small'
											>
												<ContentCopyIcon />
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
							<Box
								sx={{
									width: "100%",
									height: 80,
									backgroundColor: liveHex,
									borderRadius: 1,
									mt: 2,
								}}
							/>
						</Box>
					)}
				</Box>
			</Popover>
		</>
	);
};

/* =====================
   Helper Functions
   ===================== */

/** Convert #RRGGBB to { r, g, b } */
function hexToRgb(hex: string): RGB | null {
	const normalized = stripHash(hex);
	const match = /^([0-9A-Fa-f]{6})$/.exec(normalized);
	if (!match) return null;
	const full = match[1];

	return {
		r: parseInt(full.slice(0, 2), 16),
		g: parseInt(full.slice(2, 4), 16),
		b: parseInt(full.slice(4, 6), 16),
	};
}

/** Convert { r, g, b } to #RRGGBB */
function rgbToHex(r: number, g: number, b: number): string {
	const clamp = (x: number) => Math.max(0, Math.min(255, x));

	return "#" + [r, g, b].map((v) => clamp(v).toString(16).padStart(2, "0")).join("");
}

/** Convert HSV -> RGB */
function hsvToRgb(h: number, s: number, v: number): RGB {
	s /= 100;
	v /= 100;
	const sector = Math.floor(h / 60) % 6;
	const f = h / 60 - sector;
	const p = v * (1 - s);
	const q = v * (1 - f * s);
	const t = v * (1 - (1 - f) * s);

	let rr, gg, bb;
	switch (sector) {
		case 0:
			rr = v;
			gg = t;
			bb = p;
			break;
		case 1:
			rr = q;
			gg = v;
			bb = p;
			break;
		case 2:
			rr = p;
			gg = v;
			bb = t;
			break;
		case 3:
			rr = p;
			gg = q;
			bb = v;
			break;
		case 4:
			rr = t;
			gg = p;
			bb = v;
			break;
		default:
			rr = v;
			gg = p;
			bb = q;
			break;
	}

	return {
		r: Math.round(rr * 255),
		g: Math.round(gg * 255),
		b: Math.round(bb * 255),
	};
}

/** Convert RGB -> HSV */
function rgbToHsv(r: number, g: number, b: number): HSV {
	r /= 255;
	g /= 255;
	b /= 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const d = max - min;

	let h = 0;
	if (d !== 0) {
		if (max === r) h = ((g - b) / d) % 6;
		else if (max === g) h = (b - r) / d + 2;
		else h = (r - g) / d + 4;
		h *= 60;
	}

	const s = max === 0 ? 0 : d / max;
	const v = max;

	return {
		h: Math.round((h + 360) % 360),
		s: Math.round(s * 100),
		v: Math.round(v * 100),
	};
}

function stripHash(hex: string): string {
	return hex.startsWith("#") ? hex.slice(1) : hex;
}

/** Utility clampers */
function clamp01to100(x: number) {
	return Math.max(0, Math.min(100, x));
}

function clamp0to360(x: number) {
	return Math.max(0, Math.min(360, x));
}
