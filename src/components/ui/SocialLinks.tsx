import Link from "@/components/ui/Link";

/** Brand glyphs — lucide removed its social brand icons, so we inline them. */
export const socialLinks = [
  {
    label: "Facebook",
    path: "M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z",
  },
  {
    label: "Twitter",
    path: "M22 5.8a8.5 8.5 0 0 1-2.36.64 4.13 4.13 0 0 0 1.81-2.27 8.21 8.21 0 0 1-2.61 1 4.1 4.1 0 0 0-7 3.74A11.64 11.64 0 0 1 3.39 4.62a4.16 4.16 0 0 0-.55 2.07 4.09 4.09 0 0 0 1.82 3.41 4.05 4.05 0 0 1-1.86-.51v.05a4.1 4.1 0 0 0 3.3 4.03 4.1 4.1 0 0 1-1.86.07 4.11 4.11 0 0 0 3.83 2.84A8.22 8.22 0 0 1 2 18.28a11.57 11.57 0 0 0 6.29 1.85A11.59 11.59 0 0 0 20 8.45c0-.17 0-.35-.01-.52A8.18 8.18 0 0 0 22 5.8z",
  },
  {
    label: "Instagram",
    path: "M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.16.56.55.9 1.11 1.16 1.77.25.64.42 1.36.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.79-.47 2.43-.26.66-.6 1.22-1.16 1.77-.55.56-1.11.9-1.77 1.16-.64.25-1.36.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.16 4.9 4.9 0 0 1-1.16-1.77c-.25-.64-.42-1.36-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.79.47-2.43.26-.66.6-1.22 1.16-1.77.55-.56 1.11-.9 1.77-1.16.64-.25 1.36-.42 2.43-.47C8.94 2.01 9.28 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.25a3.25 3.25 0 1 1 0-6.5 3.25 3.25 0 0 1 0 6.5zM17.5 5.25a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z",
  },
  {
    label: "LinkedIn",
    path: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34v-7.2H6.06v7.2h2.28zM7.2 10.13a1.32 1.32 0 1 0 0-2.64 1.32 1.32 0 0 0 0 2.64zm11.14 8.21v-3.95c0-2.11-.45-3.74-2.92-3.74-1.19 0-1.98.65-2.31 1.27h-.03v-1.07h-2.19v7.2h2.28v-3.56c0-.94.18-1.85 1.34-1.85 1.15 0 1.16 1.07 1.16 1.91v3.5h2.27z",
  },
] as const;

export function SocialIcon({
  path,
  label,
  size = 22,
}: {
  path: string;
  label: string;
  size?: number;
}) {
  return (
    <svg
      role="img"
      aria-label={label}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
    >
      <path d={path} />
    </svg>
  );
}

/** A row of social links. Pass `only` to render a subset by label. */
export function SocialLinks({
  size = 22,
  gap = "gap-6",
  className = "",
  only,
}: {
  size?: number;
  gap?: string;
  className?: string;
  only?: string[];
}) {
  const links = only
    ? socialLinks.filter((s) => only.includes(s.label))
    : socialLinks;
  return (
    <div className={`flex items-center ${gap} ${className}`}>
      {links.map((s) => (
        <Link key={s.label} href="#" aria-label={s.label} className="hover:opacity-70">
          <SocialIcon path={s.path} label={s.label} size={size} />
        </Link>
      ))}
    </div>
  );
}
