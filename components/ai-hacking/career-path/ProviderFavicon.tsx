import React from "react";

const PROVIDER_DOMAINS: Record<string, string> = {
  tryhackme: "tryhackme.com",
  hackthebox: "hackthebox.com",
  htb: "hackthebox.com",
  google: "google.com",
  tcm: "tcm-sec.com",
  offsec: "offsec.com",
  blueteam: "securityblue.team",
  cyberdefenders: "cyberdefenders.org",
  elearnsecurity: "elearnsecurity.com",
  giac: "giac.org",
  isc2: "isc2.org",
  comptia: "comptia.org",
  youtube: "www.youtube.com",
  sans: "sans.org",
  crest: "crest-approved.org",
  pentesteracademy: "pentesteracademy.com",
  coursera: "coursera.org",
  lakera: "lakera.ai",
  wiz: "wiz.io",
  owasp: "owasp.org",
  defcon: "aivillage.org",
  github: "github.com",
  huggingface: "huggingface.co",
  isaca: "isaca.org",
  nist: "nist.gov",
  eu: "artificialintelligenceact.eu",
  esecurityplanet: "esecurityplanet.com",
};

export function ProviderFavicon({ provider, size = 18 }: { provider: string | null; size?: number }) {
  const domain = provider ? PROVIDER_DOMAINS[provider] : null;
  
  if (!domain) return <div style={{ width: size, height: size }} className="bg-slate-800 rounded-sm" />;

  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
      alt={provider ?? ""}
      width={size}
      height={size}
      className="rounded-sm flex-shrink-0"
      style={{ objectFit: "contain" }}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${provider}&background=random&color=fff&size=64`;
      }}
    />
  );
}
