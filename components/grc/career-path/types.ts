export interface ResourceItem {
  label: string;
  link: string;
  provider?: string;
}

export interface Level {
  num: string;
  label: string;
  subtitle: string;
  color: string;
  glow: string;
  border: string;
  quote: string;
  time: string;
  tools: string[];
  skills: string[];
  certs: ResourceItem[];
  labs: ResourceItem[];
}

export interface ActionItem {
  label: string;
  link?: string;
}

export interface Action {
  icon: string;
  title: string;
  color: string;
  border: string;
  glow: string;
  items: Array<ActionItem | string>;
}
