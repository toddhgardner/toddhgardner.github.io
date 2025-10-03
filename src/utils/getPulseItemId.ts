import type { CollectionEntry } from "astro:content";

export function getPulseItemId(item: CollectionEntry<"pulse">): string {
  const dateStr = item.data.publishedOn.toISOString();
  const slug = item.slug;
  const combined = `${dateStr}-${slug}`;

  // Simple hash function to create a shorter ID
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  // Convert to base36 for a shorter, URL-friendly string
  return Math.abs(hash).toString(36);
}