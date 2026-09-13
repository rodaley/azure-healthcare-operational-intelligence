import { randomBytes } from "node:crypto";

/**
 * Generates a temporary presenter access code using a cryptographically secure
 * random-number generator.
 *
 * Per prompt/03-API.md ("Local Presenter Authentication") and prompt/04-Security.md
 * ("Local Development Security"): the code must never be written to disk, must be
 * displayed only in the local process console, and expires when the process stops.
 *
 * A fixed presenter code is only permitted under `NODE_ENV=test`.
 */
export function generatePresenterCode(): string {
  if (process.env.NODE_ENV === "test") {
    return "TEST-ONLY-PRESENTER-CODE";
  }
  // 128 bits of entropy, base64url-encoded so it is easy to type/paste.
  return randomBytes(16).toString("base64url");
}
