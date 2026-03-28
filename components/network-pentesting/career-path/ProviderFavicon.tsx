"use client";

import { PROVIDER_DOMAINS } from "./data";

type ProviderFaviconProps = {
  provider: string | null;
  size?: number;
};

export function ProviderFavicon({ provider, size = 18 }: ProviderFaviconProps) {
  const domain = provider ? PROVIDER_DOMAINS[provider] : null;
  if (!domain) return null;
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
      alt={provider ?? ""}
      width={size}
      height={size}
      className="rounded-sm flex-shrink-0"
      style={{ objectFit: "contain" }}
    />
  );
}
