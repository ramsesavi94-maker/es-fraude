// Runs one analysis from the terminal.
// Usage: npx tsx --env-file=.env scripts/try.ts "texto del mensaje"
//        npx tsx --env-file=.env scripts/try.ts --image captura.png
import { readFile } from "node:fs/promises";
import { extname } from "node:path";
import { analyze } from "../src/analyze.js";

const args = process.argv.slice(2);
const imageIdx = args.indexOf("--image");
let image: string | undefined;
if (imageIdx !== -1) {
  const path = args.splice(imageIdx, 2)[1];
  const mime = extname(path).toLowerCase() === ".png" ? "image/png" : "image/jpeg";
  image = `data:${mime};base64,${(await readFile(path)).toString("base64")}`;
}

const result = await analyze({ kind: image ? "screenshot" : "message", text: args.join(" "), image });
console.log(JSON.stringify(result, null, 2));
