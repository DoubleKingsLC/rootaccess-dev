import React from "react";

type IconProps = {
  className?: string;
  size?: number;
  title?: string;
};

const base = "shrink-0";

function Svg({
  children,
  className,
  size = 24,
  title,
  viewBox = "0 0 24 24",
}: IconProps & { children: React.ReactNode; viewBox?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${base} ${className ?? ""}`}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/** GRC / compliance hub — shield with check */
export function IconShieldCheck({ className, size = 24, title }: IconProps) {
  return (
    <Svg className={className} size={size} title={title}>
      <path
        d="M12 3.5 4.5 7v5.5c0 4.2 2.87 8.1 7.5 9.5 4.63-1.4 7.5-5.3 7.5-9.5V7L12 3.5Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2 2 4-4"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** DevOps / SRE */
export function IconCog({ className, size = 24, title }: IconProps) {
  return (
    <Svg className={className} size={size} title={title}>
      <path
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c0 .66.39 1.26 1 1.51h.09a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1 1.51Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** AppSec / encryption */
export function IconLockClosed({ className, size = 24, title }: IconProps) {
  return (
    <Svg className={className} size={size} title={title}>
      <rect
        x={5}
        y={11}
        width={14}
        height={10}
        rx={2}
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <path
        d="M8 11V8a4 4 0 0 1 8 0v3"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/** Engineering */
export function IconLaptop({ className, size = 24, title }: IconProps) {
  return (
    <Svg className={className} size={size} title={title}>
      <rect
        x={3}
        y={4}
        width={18}
        height={12}
        rx={2}
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <path d="M2 18h20" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

/** Access control */
export function IconKey({ className, size = 24, title }: IconProps) {
  return (
    <Svg className={className} size={size} title={title}>
      <circle cx="8" cy="8" r={2.75} stroke="currentColor" strokeWidth={1.5} />
      <path
        d="M10.2 10.2 16 16"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d="M14 14h2.5v2.5"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** Data protection */
export function IconDatabase({ className, size = 24, title }: IconProps) {
  return (
    <Svg className={className} size={size} title={title}>
      <ellipse cx="12" cy={6} rx={7} ry={3} stroke="currentColor" strokeWidth={1.5} />
      <path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" stroke="currentColor" strokeWidth={1.5} />
      <path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" stroke="currentColor" strokeWidth={1.5} />
    </Svg>
  );
}

/** Network */
export function IconGlobe({ className, size = 24, title }: IconProps) {
  return (
    <Svg className={className} size={size} title={title}>
      <circle cx="12" cy="12" r={9} stroke="currentColor" strokeWidth={1.5} />
      <path
        d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}

/** Physical security */
export function IconBuilding({ className, size = 24, title }: IconProps) {
  return (
    <Svg className={className} size={size} title={title}>
      <path
        d="M4 21V8l8-4 8 4v13"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 21v-6h6v6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      <path d="M9 10h.01M15 10h.01" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

/** Vendor / third parties */
export function IconUsers({ className, size = 24, title }: IconProps) {
  return (
    <Svg className={className} size={size} title={title}>
      <path
        d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth={1.5} />
      <path
        d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/** Change management */
export function IconClipboard({ className, size = 24, title }: IconProps) {
  return (
    <Svg className={className} size={size} title={title}>
      <path
        d="M9 4h6l1 2h3v14H5V6h3l1-2Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}

export type ControlDomainIconId =
  | "access"
  | "data"
  | "network"
  | "physical"
  | "vendor"
  | "change";

/** Icons for AuditIncidentScene domain nodes (hub uses IconShieldCheck). */
export function ControlDomainIcon({
  id,
  className,
  size = 22,
}: {
  id: ControlDomainIconId;
  className?: string;
  size?: number;
}) {
  const props = { className, size, title: undefined as string | undefined };
  switch (id) {
    case "access":
      return <IconKey {...props} />;
    case "data":
      return <IconDatabase {...props} />;
    case "network":
      return <IconGlobe {...props} />;
    case "physical":
      return <IconBuilding {...props} />;
    case "vendor":
      return <IconUsers {...props} />;
    case "change":
      return <IconClipboard {...props} />;
    default:
      return <IconShieldCheck {...props} />;
  }
}
