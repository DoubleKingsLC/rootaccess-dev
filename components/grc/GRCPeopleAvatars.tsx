import React from "react";

type FaceProps = { className?: string; title?: string };

export type MeetingFaceRole = "grc" | "sre" | "appsec" | "eng";

/**
 * Generic illustrated people (DiceBear "notionists", CC0). Stable seeds + role-colored backgrounds.
 * SVG over HTTP so they stay sharp at any size.
 */
const AVATAR_BASE = "https://api.dicebear.com/9.x/notionists/svg";

const ROLE_AVATAR: Record<
  MeetingFaceRole,
  { seed: string; backgroundColor: string; defaultAlt: string }
> = {
  grc: {
    seed: "GRC Avery",
    backgroundColor: "0f7668",
    defaultAlt: "GRC analyst",
  },
  sre: {
    seed: "SRE Marcus",
    backgroundColor: "4338ca",
    defaultAlt: "SRE engineer",
  },
  appsec: {
    seed: "AppSec Riley",
    backgroundColor: "c2410c",
    defaultAlt: "AppSec engineer",
  },
  eng: {
    seed: "Eng Jordan",
    backgroundColor: "7c3aed",
    defaultAlt: "Engineering lead",
  },
};

function avatarUrl(role: MeetingFaceRole): string {
  const cfg = ROLE_AVATAR[role];
  const q = new URLSearchParams({
    seed: cfg.seed,
    backgroundColor: cfg.backgroundColor,
    size: "128",
    radius: "50",
  });
  return `${AVATAR_BASE}?${q.toString()}`;
}

export function MeetingFace({ role, className, title }: FaceProps & { role: MeetingFaceRole }) {
  const cfg = ROLE_AVATAR[role];
  return (
    <img
      src={avatarUrl(role)}
      alt={title ?? cfg.defaultAlt}
      className={className}
      width={128}
      height={128}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}
