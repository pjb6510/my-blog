import type { ReactNode } from "react";

export function Q({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose my-8 flex justify-end">
      <div className="chat-q max-w-[85%] rounded-2xl rounded-br-md bg-accent px-5 py-3 leading-relaxed text-background [&>p]:m-0 [&>p+p]:mt-3">
        {children}
      </div>
    </div>
  );
}
