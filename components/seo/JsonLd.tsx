type JsonLdProps = {
  schema: Record<string, unknown> | ReadonlyArray<Record<string, unknown>>;
};

export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify here is safe: schema is structured data, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
