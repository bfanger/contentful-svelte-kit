import type { LayoutServerLoad } from "./$types";
import contentful from "$lib/services/contentful";
import type { TypeNavigationItem } from "$lib/services/generated-contentful-types";

export const prerender = true;
export const load: LayoutServerLoad = async () => {
  const settings = await contentful.getSettings(4);
  return {
    title: settings.fields.title,
    description: settings.fields.seoDescription,
    menu: settings.fields.mainMenu?.map(transformNavigationItem),
  };
};

type NavItem = {
  title?: string;
  url?: string;
  items?: NavItem[];
};
function transformNavigationItem(
  item: TypeNavigationItem
): NavItem | undefined {
  let items: NavItem[] = [];
  if (!item.fields) {
    return undefined;
  }
  if (item.fields?.submenu) {
    items = item.fields.submenu
      ?.map(transformNavigationItem)
      .filter((entry) => {
        if (entry) {
          return true;
        }
        console.warn(
          `Missing submenu fields for "${item.fields.title}", increase include level`
        );

        return false;
      }) as NavItem[];
  }
  let url = item.fields.externalUrl;
  if (item.fields.page?.fields) {
    url = item.fields.page.fields.slug;
  }
  return {
    url,
    title: item.fields.title,
    items: items.length ? items : undefined,
  };
}
