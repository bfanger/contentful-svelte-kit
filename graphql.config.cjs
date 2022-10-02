const dotenv = require("dotenv");

dotenv.config();

let schema = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;
if (process.env.CONTENTFUL_ENVIRONMENT) {
  schema += `/environments/${process.env.CONTENTFUL_ENVIRONMENT}`;
}
module.exports = {
  schema: {
    [schema]: {
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
    },
  },
  documents: "src/**/*.{graphql,js,ts,jsx,tsx}",
  overwrite: true,
  generates: {
    "src/lib/services/generated-contenful-types.ts": {
      config: {
        onlyOperationTypes: true,
        disableDescriptions: true,
        enumsAsTypes: true,
      },
      plugins: [
        {
          typescript: {
            noExport: true,
          },
        },
        "typescript-operations",
      ],
    },
  },
  hooks: {
    afterAllFileWrite: ["prettier --write"],
  },
};
