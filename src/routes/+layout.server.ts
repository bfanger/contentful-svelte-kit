import contentful from "$lib/services/contentful";
import type { LayoutServerLoad } from "./$types";

export const prerender = true;
export const load: LayoutServerLoad = async () => {
  const settings = await contentful.getSettings();
  return settings.sys.contentType;
};
