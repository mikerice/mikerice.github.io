import { type CollectionEntry, getCollection } from "astro:content";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CollectionName } from "@consts";

/**
 * Combines class names using clsx and merges Tailwind classes.
 * @param inputs - Class values to be combined.
 * @returns A single string of combined class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a Date object to a string in the format YYYY-MM-DD.
 * @param date - The Date object to format.
 * @returns A formatted date string.
 */
export function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

/**
 * Calculates the estimated reading time for a given HTML string.
 * @param html - The HTML content to analyze.
 * @returns A string representing the estimated reading time in minutes.
 */
export function readingTime(html: string) {
  const textOnly = html.replace(/<[^>]+>/g, "");
  const wordCount = textOnly.split(/\s+/).length;
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed();
  return `${readingTimeMinutes} min read`;
}

/**
 * Sorts collection entries by their last update date or creation date.
 * @param a - The first collection entry to compare.
 * @param b - The second collection entry to compare.
 * @returns A number indicating the sort order.
 */
export function sortByLastUpdateDate<T extends CollectionName>(
  a: CollectionEntry<T>,
  b: CollectionEntry<T>,
) {
  return (
    (b.data.lastUpdateDate ?? b.data.date).getTime() -
    (a.data.lastUpdateDate ?? a.data.date).getTime()
  );
}

/**
 * Retrieves and filters collection entries, excluding drafts and sorting by last update date.
 * @param collectionName - The name of the collection to retrieve.
 * @returns A promise that resolves to an object containing the filtered and sorted entries.
 */
export async function getFilteredCollectionEntries<T extends CollectionName>(
  collectionName: T
): Promise<{
  entries: CollectionEntry<T>[];
}> {
  const data = (await getCollection(collectionName))
    .filter((post: CollectionEntry<T>) => !post.data.draft)
    .sort(
      sortByLastUpdateDate
    );

  return { entries: data };
}

/**
 * Retrieves the next and previous collection entries relative to a reference slug.
 * @param collectionName - The name of the collection to retrieve.
 * @param referenceSlug - The slug of the reference entry.
 * @returns A promise that resolves to an object containing the next and previous entries.
 */
export async function getNavigationEntries<T extends CollectionName>(
  collectionName: T,
  referenceSlug: string | undefined,
): Promise<{ nextPost?: CollectionEntry<T>; prevPost?: CollectionEntry<T> }> {
  if (!referenceSlug) {
    return {};
  }

  const { entries } = await getFilteredCollectionEntries(collectionName);
  const currentIndex = entries.findIndex(
    (entry) => entry.slug === referenceSlug,
  );

  return {
    nextPost: entries[currentIndex + 1],
    prevPost: entries[currentIndex - 1],
  };
}

/**
 * Resolves a given href to an absolute URL based on the current path and base URL.
 * @param href - The href to resolve.
 * @param currentPath - The current path for relative resolution.
 * @returns A resolved absolute URL.
 */
export function resolvePath(href: string | undefined | null, currentPath?: string | undefined) {
  if (!href) {
    return "";
  }

  if (href.startsWith("http")) {
    return href;
  }

  const baseUrl = import.meta.env.BASE_URL;

  if (!baseUrl) {
    return href;
  }

  const base = baseUrl.replace(/\/$/, "");

  const resolvedPath = href.startsWith("/")
    ? base + href
    : (currentPath ?? "").replace(/\/$/, "") + "/" + href;

  return resolvedPath;
}

/**
 * Formats a date with an optional last update date.
 * @param date - The original date.
 * @param lastUpdateDate - The last update date.
 * @returns A formatted date string with the last update date if provided.
 */
export function formatDateWithLastUpdateDate(date: Date, lastUpdateDate?: Date): string {
  const formattedDate = date.toISOString().substring(0, 10);

  if (lastUpdateDate) {
    const formattedLastUpdateDate = lastUpdateDate.toISOString().substring(0, 10);
    return `${formattedDate} (updated: ${formattedLastUpdateDate})`;
  }
  return formattedDate;
}

/**
 * Retrieves all entries with their associated tags from multiple collections.
 * @returns A promise that resolves to an object containing tags and entries.
 */
export async function getAllEntriesWithTags() {
  const entries = [
    ...(await getFilteredCollectionEntries("blog")).entries,
    ...(await getFilteredCollectionEntries("projects")).entries,
  ].sort(sortByLastUpdateDate);

  const tags = [
    ...new Set(entries.flatMap((entry) => entry.data.tags || [])),
  ].sort();

  return { tags, entries }
}