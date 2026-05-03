import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";

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
  };
}
