import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Returns a post's featured image path only if the file really exists in
 * /public — so a post whose image was never uploaded shows no image at all
 * instead of a broken one.
 */
export function postImage(image?: string): string | undefined {
  if (!image) return undefined;
  if (/^https?:\/\//.test(image)) return image;
  return existsSync(join(process.cwd(), "public", image)) ? image : undefined;
}
