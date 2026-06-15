type JsonLdData = Record<string, unknown> | Record<string, unknown>[];

/**
 * Inline JSON-LD structured data. Rendered as a <script type="application/ld+json">
 * inside a Server Component — search engines read it from the static HTML.
 */
export function JsonLd({ data }: { data: JsonLdData }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here: it's our own structured data, and
      // </script> can't appear inside a JSON string without being escaped.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
