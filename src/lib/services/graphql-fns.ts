/**
 * Tooling will assume this gql is from "graphql-tag" but this one is much faster, smaller and stupider
 * Caveat: #import statements don't work.
 */

import {
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_ENVIRONMENT,
  CONTENTFUL_ACCESS_TOKEN,
} from "$env/static/private";

let schema = `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`;
if (CONTENTFUL_ENVIRONMENT) {
  schema += `/environments/${CONTENTFUL_ENVIRONMENT}`;
}
export const gql = (...args: any[]) => args.join("");

export async function fetchGql<T, U>(
  query: string,
  variables: U,
  headers: Record<string, string> = {}
): Promise<T> {
  const started = Date.now();
  const response = await fetch(schema, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({ query, variables }),
  });
  const elapsed = (Date.now() - started) / 1000;
  if (elapsed > 0.5) {
    const complexity = response.headers.get("x-contentful-graphql-query-cost");
    console.warn(
      `GraphQL ${extractQueryName(query)}${
        complexity ? ` with complexity ${complexity}` : ""
      } took ${elapsed.toFixed(2)}s`
    );
  }

  if (!response.ok) {
    throw new Error(`POST failed: ${response.status} ${response.statusText}`);
  }
  const result = await response.json();
  return result.data;
}

function extractQueryName(query: string) {
  const match = query.match(/[\s]*query[\s]+([^{]+)/gm);
  if (!match) {
    return "query";
  }
  return `query "${match[0].trim().substring(6)}"`;
}
