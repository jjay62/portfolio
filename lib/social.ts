import type { IconType } from "react-icons";
import {
  SiGithub,
  SiInstagram,
  SiSteam,
  SiTiktok,
  SiX,
  SiYoutube,
} from "react-icons/si";

export type SocialEntry = {
  label: string;
  href: string;
  Icon: IconType;
  /** Shared hero + footer: muted default, hover = brand colors (Instagram uses `.footer-social-insta` + `#social-insta-gradient` in layout) */
  iconClass: string;
};

/** Replace `href` values with your real profile URLs. */
export const SOCIAL_LINKS: SocialEntry[] = [
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@whippedcreamf",
    Icon: SiTiktok,
    iconClass:
      "text-slate-500 border-white/10 bg-white/5 hover:bg-white hover:border-white/60 hover:text-black hover:[&_svg]:text-black",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/ljay_62?igsh=MXEyZ3cwZGliZzBjeA==",
    Icon: SiInstagram,
    iconClass:
      "footer-social-insta border-white/10 bg-white/5 hover:border-pink-400/50",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@fragmentzz",
    Icon: SiYoutube,
    iconClass:
      "text-slate-500 border-white/10 bg-white/5 hover:border-[#FF0000]/60 hover:text-[#FF0000] hover:[&_svg]:text-[#FF0000]",
  },
  {
    label: "GitHub",
    href: "https://github.com/jjay62",
    Icon: SiGithub,
    iconClass:
      "text-slate-500 border-white/10 bg-white/5 hover:border-white/35 hover:bg-white/10 hover:text-white hover:[&_svg]:text-white",
  },
  {
    label: "X",
    href: "https://x.com/JayKlav",
    Icon: SiX,
    iconClass:
      "text-slate-500 border-white/10 bg-white/5 hover:border-white/30 hover:text-white hover:[&_svg]:text-white",
  },
  {
    label: "Steam",
    href: "https://steamcommunity.com/profiles/76561199429121740/",
    Icon: SiSteam,
    iconClass:
      "text-slate-500 border-white/10 bg-white/5 hover:border-[#66c0f4]/55 hover:text-[#66c0f4] hover:[&_svg]:text-[#66c0f4]",
  },
];
