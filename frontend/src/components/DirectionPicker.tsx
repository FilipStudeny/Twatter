import React, { useEffect, useState, useRef, useCallback, useLayoutEffect } from "react";

/**
 * DirectionPickerProps: let user pick an angle [0..360).
 * 0 = pointing right, 90 = up, etc.
 */
interface DirectionPickerProps {
	value: number,
	onChange: (angle: number)=> void,
	size?: number,
}

/** Convert local (x, y) => angle in degrees [0..360) */
function positionToAngle(x: number, y: number): number {
	const angleRad = Math.atan2(-y, x);
	let deg = (angleRad * 180) / Math.PI;
	deg = (deg + 360) % 360;

	return deg;
}

/** Convert angle in degrees => handle position (x, y) */
function angleToPosition(angleDeg: number, radius: number) {
	const rad = (angleDeg * Math.PI) / 180;
	const handleRadius = radius - 12;
	const x = Math.cos(rad) * handleRadius;
	const y = -Math.sin(rad) * handleRadius;

	return { x, y };
}

const DirectionPicker: React.FC<DirectionPickerProps> = ({ value, onChange, size = 120 }) => {
	const radius = size / 2;
	const [isDragging, setIsDragging] = useState(false);
	const [circleRect, setCircleRect] = useState<DOMRect | null>(null);
	const ref = useRef<HTMLDivElement>(null);
	const angleRef = useRef(value);
	const rafIdRef = useRef<number | null>(null);

	const scheduleUpdate = useCallback(() => {
		if (rafIdRef.current == null) {
			rafIdRef.current = requestAnimationFrame(() => {
				rafIdRef.current = null;
				onChange(angleRef.current);
			});
		}
	}, [onChange]);

	const updateAngleFromEvent = useCallback(
		(clientX: number, clientY: number, rect: DOMRect) => {
			const cx = rect.left + rect.width / 2;
			const cy = rect.top + rect.height / 2;
			const dx = clientX - cx;
			const dy = clientY - cy;
			angleRef.current = positionToAngle(dx, dy);
			scheduleUpdate();
		},
		[scheduleUpdate],
	);

	function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
		e.preventDefault();
		if (!ref.current) return;
		const rect = ref.current.getBoundingClientRect();
		setCircleRect(rect);
		setIsDragging(true);
		updateAngleFromEvent(e.clientX, e.clientY, rect);
	}

	useLayoutEffect(() => {
		angleRef.current = value;
	}, [value]);

	useEffect(() => {
		if (!isDragging || !circleRect) return;

		function onMouseMove(e: MouseEvent) {
			e.preventDefault();
			updateAngleFromEvent(e.clientX, e.clientY, circleRect!);
		}

		function onMouseUp(e: MouseEvent) {
			e.preventDefault();
			setIsDragging(false);
		}

		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);

		return () => {
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);
		};
	}, [isDragging, circleRect, updateAngleFromEvent]);

	const { x, y } = angleToPosition(angleRef.current, radius);

	const containerStyle: React.CSSProperties = {
		position: "relative",
		width: size,
		height: size,
		userSelect: "none",
		cursor: "pointer",
	};

	const circleStyle: React.CSSProperties = {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		borderRadius: "50%",
		border: "1px solid #e0e0e0",
		backgroundColor: "#fafafa",
	};

	const cardinalStyle: React.CSSProperties = {
		position: "absolute",
		color: "#666",
		fontSize: "14px",
		fontWeight: 600,
	};

	const northStyle: React.CSSProperties = {
		...cardinalStyle,
		top: "8px",
		left: "50%",
		transform: "translateX(-50%)",
	};

	const southStyle: React.CSSProperties = {
		...cardinalStyle,
		bottom: "8px",
		left: "50%",
		transform: "translateX(-50%)",
	};

	const eastStyle: React.CSSProperties = {
		...cardinalStyle,
		top: "50%",
		right: "8px",
		transform: "translateY(-50%)",
	};

	const westStyle: React.CSSProperties = {
		...cardinalStyle,
		top: "50%",
		left: "8px",
		transform: "translateY(-50%)",
	};

	const centerDotStyle: React.CSSProperties = {
		position: "absolute",
		left: radius - 8,
		top: radius - 8,
		width: 16,
		height: 16,
		borderRadius: "50%",
		backgroundColor: "#e0e0e0",
		pointerEvents: "none",
	};

	const lineStyle: React.CSSProperties = {
		position: "absolute",
		left: radius,
		top: radius,
		width: Math.sqrt(x * x + y * y),
		height: 2,
		backgroundColor: "#2196f3",
		transform: `rotate(${360 - angleRef.current}deg)`,
		transformOrigin: "left center",
		pointerEvents: "none",
		transition: isDragging ? "none" : "transform 0.2s",
	};

	const handleStyle: React.CSSProperties = {
		position: "absolute",
		left: radius + x - 6,
		top: radius + y - 6,
		width: 12,
		height: 12,
		borderRadius: "50%",
		backgroundColor: "#2196f3",
		pointerEvents: "none",
		transition: isDragging ? "none" : "all 0.2s",
	};

	return (
		<div ref={ref} style={containerStyle} onMouseDown={handleMouseDown}>
			<div style={circleStyle} />
			<div style={northStyle}>90</div>
			<div style={southStyle}>270</div>
			<div style={eastStyle}>0</div>
			<div style={westStyle}>180</div>
			<div style={centerDotStyle} />
			<div style={lineStyle} />
			<div style={handleStyle} />
		</div>
	);
};

export default DirectionPicker;
