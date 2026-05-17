import type { ReactNode } from "react";

// Semantic-only wrapper. Renders children as-is so prose flow is untouched;
// the `<A>` marker exists in the MDX source for later Q/A extraction.
export function A({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
