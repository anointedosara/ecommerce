import NextLink from "next/link";
import type { ComponentProps } from "react";

/**
 * App-wide Link that keeps the current scroll position on navigation instead of
 * jumping to the top. Pass `scroll` explicitly to override per-link.
 */
export default function Link(props: ComponentProps<typeof NextLink>) {
  return <NextLink scroll={false} {...props} />;
}
