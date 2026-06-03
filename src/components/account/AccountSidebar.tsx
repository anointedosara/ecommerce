import Link from "next/link";

type SidebarGroup = {
  title: string;
  titleHref?: string;
  links: { label: string; href: string }[];
};

const groups: SidebarGroup[] = [
  {
    title: "Manage My Account",
    links: [
      { label: "My Profile", href: "/account" },
      { label: "Address Book", href: "/account/address" },
      { label: "My Payment Options", href: "/account/payment" },
    ],
  },
  {
    title: "My Orders",
    titleHref: "/account/orders",
    links: [
      { label: "My Orders", href: "/account/orders" },
      { label: "My Cancellations", href: "/account/cancellations" },
    ],
  },
  {
    title: "My WishList",
    titleHref: "/wishlist",
    links: [],
  },
];

/** Left-hand account navigation. `active` matches a link label to highlight it. */
export default function AccountSidebar({ active }: { active?: string }) {
  return (
    <nav className="flex flex-col gap-6 text-base">
      {groups.map((group) => (
        <div key={group.title} className="flex flex-col gap-3">
          <Link
            href={group.titleHref ?? "#"}
            className="font-medium text-black"
          >
            {group.title}
          </Link>
          {group.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`pl-8 transition-colors hover:text-primary ${
                link.label === active ? "text-primary" : "text-black/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
}
