import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import { Q } from "@/components/mdx/Q";
import { A } from "@/components/mdx/A";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    img: ({ alt = "", ...rest }) => (
      <Image
        alt={alt}
        sizes="(min-width: 768px) 720px, 100vw"
        width={1280}
        height={720}
        className="rounded-md"
        {...(rest as Omit<ImageProps, "alt">)}
      />
    ),
    Q,
    A,
  };
}
