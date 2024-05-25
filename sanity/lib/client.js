// import "server-only";
import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn } from "../env";

export const client = createClient({
  apiVersion,
  dataset,
  projectId:'rot78pr5',
  useCdn,

  token:
    "skxQygV8pmAodPvYBPTBEK2yUDYx2126Pvh2hh5yTnplhn7pE9hxdnmUki3LwJKRVHwjXwvimG14XcmuellM97DI6H7JDQOLF3KppGOKcMER5JtWHMpdzhAwfh7c6HxXkoNuxSSG6mwWmY3dc0l38zkKFRG2jy6W5wZMAKobV0tfIo9poBuv",
});
export async function sanityFetch({ query, qParams }) {
  return client.fetch(query, qParams, { next: { revalidate: 1 } });
}
