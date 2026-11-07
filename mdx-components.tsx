import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";
import { Question } from "@/components/mdx/common/Question";
import { Answer } from "@/components/mdx/common/Answer";
import { OgCard } from "@/components/mdx/common/OgCard";
import { PostCard } from "@/components/mdx/common/PostCard";
import { YouTube } from "@/components/mdx/common/YouTube";

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
    Question,
    Answer,
    OgCard,
    PostCard,
    YouTube,
  };
}
