import { createClient } from "contentful";
import type { EntryQueries } from "contentful/dist/types/types/query/query";
import type { TypeSettingsFields } from "./generated-contentful-types";
import {
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  CONTENTFUL_SPACE_ID,
  CONTENTFUL_SETTINGS_ENTRY_ID,
} from "$env/static/private";

const published = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
});

const unpublished = createClient({
  space: CONTENTFUL_SPACE_ID,
  accessToken: CONTENTFUL_PREVIEW_ACCESS_TOKEN,
});

function getClient(preview = false) {
  if (preview) {
    return unpublished;
  }
  return published;
}
const contentful = {
  async getSettings(include: EntryQueries["include"] = 1) {
    const settings = await getClient().getEntry<TypeSettingsFields>(
      CONTENTFUL_SETTINGS_ENTRY_ID,
      { include }
    );
    const contentType = settings.sys.contentType.sys.id;
    if (contentType !== "settings") {
      throw new Error(
        `Unexpected contenttype: "${contentType}", expected "settings"`
      );
    }
    return settings;
  },
};

export default contentful;
