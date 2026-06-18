import type { ReactNode } from "react";

// Semantic-only wrapper. Renders children as-is so prose flow is untouched;
// the `<Answer>` marker exists in the MDX source for later Question/Answer extraction.
export function Answer({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
