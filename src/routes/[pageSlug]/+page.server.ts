/* eslint-disable no-underscore-dangle */
import { marked } from "marked";
import { error } from "@sveltejs/kit";
import type { ComponentProps } from "svelte";
import type { PageServerLoad } from "./$types";
import { fetchGql, gql } from "$lib/services/graphql-fns";
import type {
  PageBySlugQuery,
  PageBySlugQueryVariables,
} from "$lib/services/generated-contenful-types";
import type Text from "$lib/modules/Text/Text.svelte";

export const load: PageServerLoad = async ({ params }) => {
  const collection = await fetchGql<PageBySlugQuery, PageBySlugQueryVariables>(
    gql`
      query PageBySlug($pageSlug: String!) {
        pageCollection(where: { slug: $pageSlug }, limit: 1) {
          items {
            title
            seoDescription
            modulesCollection(limit: 25) {
              total
              items {
                __typename
                ... on ModuleText {
                  title
                  text
                }
                ... on ModuleContent {
                  title
                  text
                }
              }
            }
          }
        }
      }
    `,
    { pageSlug: params.pageSlug }
  );
  if (!collection.pageCollection) {
    throw error(500, "invalid pageCollection");
  }
  const page = collection.pageCollection.items[0];
  if (!page) {
    throw error(404, `Page "${params.pageSlug}" not found`);
  }
  return {
    title: page.title,
    description: page.seoDescription,
    modules: page.modulesCollection?.items
      .map(transformModule as any)
      .filter(Boolean) as Module[],
  };
};
type TextModule = { type: "text" } & ComponentProps<Text>;
type Module = TextModule;

function transformModule(
  module: NonNullable<
    NonNullable<
      NonNullable<PageBySlugQuery["pageCollection"]>["items"][number]
    >["modulesCollection"]
  >["items"][number]
): Module | undefined {
  if (!module) {
    return undefined;
  }
  if (module.__typename === "ModuleText") {
    const text: TextModule = {
      type: "text",
      title: module.title || "",
      html: marked.parse(module.text || ""),
    };
    return text;
  }
  if (module.__typename === "ModuleContent") {
    const content: TextModule = {
      type: "text",
      title: module.title || "",
      html: marked.parse(module.text || ""),
    };
    return content;
  }
  console.warn(`Unsupported module: `, module);
  return undefined;
}
