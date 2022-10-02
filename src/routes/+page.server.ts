import type { PageServerLoad } from "./$types";
import { load as pageLoad } from "./[pageSlug]/+page.server";

export const load: PageServerLoad = async (args) => {
  return pageLoad({ ...args, params: { pageSlug: "home" } });
};
