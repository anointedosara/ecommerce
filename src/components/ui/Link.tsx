import NextLink from "next/link";
import type { ComponentProps } from "react";

/**
 * App-wide Link. New pages start at the top on navigation (Next's default),
 * but the reset is instant because global smooth scroll-behavior is disabled —
 * so you never see the page animate up to the top.
 */
export default function Link(props: ComponentProps<typeof NextLink>) {
  return <NextLink {...props} />;
}
