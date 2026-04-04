"use client";

import { useMemo } from "react";

export type DomainLiveFields = {
  status: string;
  isLive: boolean;
};

/** Locked when the node is administratively locked or experience/pathway is not live yet. */
export function isDomainLocked(domain: DomainLiveFields): boolean {
  return domain.status === "LOCKED" || !domain.isLive;
}

export function useDomainLive(domain: DomainLiveFields) {
  return useMemo(
    () => ({
      isLive: domain.isLive,
      isLocked: isDomainLocked(domain),
    }),
    [domain.status, domain.isLive]
  );
}
