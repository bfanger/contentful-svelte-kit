import { error } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";
import { fetchGql, gql } from "$lib/services/graphql-fns";
import { CONTENTFUL_SETTINGS_ENTRY_ID } from "$env/static/private";
import type {
  MenuItemFragment,
  SettingsQuery,
  SettingsQueryVariables,
} from "$lib/services/generated-contenful-types";

export const prerender = true;
export const load: LayoutServerLoad = async () => {
  const { settings } = await fetchGql<SettingsQuery, SettingsQueryVariables>(
    gql`
      fragment MenuItem on NavigationItem {
        title
        theme
        externalUrl
        page {
          ... on Page {
            __typename
            slug
          }
        }
      }

      query Settings($id: String!) {
        settings(id: $id) {
          title
          seoDescription
          mainMenuCollection(limit: 25) {
            total
            items {
              ...MenuItem
              submenuCollection(limit: 25) {
                total
                items {
                  ...MenuItem
                }
              }
            }
          }
        }
      }
    `,
    { id: CONTENTFUL_SETTINGS_ENTRY_ID }
  );
  if (!settings) {
    throw error(502, "Settings not found");
  }
  return {
    title: settings?.title,
    description: settings.seoDescription,
    menu: settings.mainMenuCollection?.items.map(
      transformNavigationItem
    ) as MenuItem[],
  };
};

type MenuItem = {
  title?: string;
  url?: string;
  items?: MenuItem[];
};

type MenuItemQuery = MenuItemFragment & {
  submenuCollection?: { total: number; items: any } | null;
};
function transformNavigationItem(
  item: MenuItemQuery | null
): MenuItem | undefined {
  if (!item) {
    return undefined;
  }

  if (!item.title) {
    console.warn(`${item.title} has no title`);
    return undefined;
  }
  let url = item.externalUrl;
  // eslint-disable-next-line no-underscore-dangle
  if (item.page?.__typename === "Page") {
    url = item.page.slug;
  }
  if (!url) {
    console.warn(`${item.title} has no url`);
    return undefined;
  }
  if (item.submenuCollection && item.submenuCollection?.total > 25) {
    console.warn(`${item.title} has more submenu items, increase the limit`);
  }
  return {
    url,
    title: item.title,
    items: item.submenuCollection?.total
      ? (item.submenuCollection.items
          .map(transformNavigationItem)
          .filter((entry?: MenuItem) => {
            if (entry) {
              return true;
            }
            console.warn(`Submenu of ${item.title} has an invalid entry`);
            return false;
          }) as MenuItem[])
      : undefined,
  };
}
