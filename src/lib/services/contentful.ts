import { createClient } from "contentful";
import {
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_PREVIEW_ACCESS_TOKEN,
  CONTENTFUL_SPACE,
  CONTENTFUL_SETTINGS_ENTRY_ID,
} from "$env/static/private";

const published = createClient({
  space: CONTENTFUL_SPACE,
  accessToken: CONTENTFUL_ACCESS_TOKEN,
});

const unpublished = createClient({
  space: CONTENTFUL_SPACE,
  accessToken: CONTENTFUL_PREVIEW_ACCESS_TOKEN,
});

function getClient(preview = false) {
  if (preview) {
    return unpublished;
  }
  return published;
}
const contentful = {
  async getSettings() {
    const settings = await getClient().getEntry(CONTENTFUL_SETTINGS_ENTRY_ID);
    const { fields, ...rest } = settings;
    console.log(rest); // .sys.contentType);
    if (settings.sys.id !== "settings") {
      throw new Error(
        `Unexpected contenttype: "${settings.sys.id}", expected "settings"`
      );
    }
    return settings;
  },
};

export default contentful;
