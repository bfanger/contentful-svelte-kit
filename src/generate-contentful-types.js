/* eslint-disable import/extensions, import/no-extraneous-dependencies, no-continue */
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import generator from "cf-content-types-generator/lib/index.js";
import renderError from "@oclif/errors/handle.js";
import { format } from "prettier";
import rimraf from "rimraf";

dotenv.config();
const dirname = path.dirname(import.meta.url.replace("file://", ""));
const out = path.resolve(dirname, "tmp-contentful");

process.argv.push(`--spaceId=${process.env.CONTENTFUL_SPACE_ID}`);
process.argv.push(
  `--token=${process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN}`
);
if (process.env.CONTENTFUL_ENVIRONMENT) {
  process.argv.push(`--environment=${process.env.CONTENTFUL_ENVIRONMENT}`);
}
process.argv.push(`--out=${out}`);
async function main() {
  try {
    await generator.run();
  } catch (err) {
    renderError(err);
    return;
  }

  const entries = fs.readdirSync(out);
  let types = "";

  /** @type {any} */
  let code = "";
  for (const entry of entries) {
    if (entry === "index.ts") {
      continue;
    }
    const source = fs.readFileSync(path.resolve(out, entry), "utf-8");
    const lines = source.split("\n");
    for (const line of lines) {
      if (line.match(/import /)) {
        continue;
      }
      const match = line.match(/^export interface (.*) {$/);
      if (match) {
        code += `export type ${match[1]} = {\n`;
      } else if (line.match(/^export type .+ = Contentful\.Entry<.*$/)) {
        // continue;
        types += `${line}\n`;
      } else {
        code += `${line}\n`;
      }
    }
  }
  for (const line of types.split("\n")) {
    const match = line.match(/type ([^ =]+) = Contentful.Entry<([^>]+)>/m);
    if (match) {
      code = code.replaceAll(` Contentful.Entry<${match[2]}>`, match[1]);
    }
  }
  //
  const intro = `// ---------------------------------------
  //
  //      Generated file, DO NOT EDIT
  //
  //     npm run generate-contentful-types
  //
  // ---------------------------------------
  

import type * as Contentful from "contentful";\n\n`;
  fs.writeFileSync(
    path.resolve(dirname, "lib/services/generated-contentful-types.ts"),
    format(intro + types + code, { parser: "typescript" })
  );
  rimraf.sync(out);
}

main();
