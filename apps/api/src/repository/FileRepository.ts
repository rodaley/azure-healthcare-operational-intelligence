import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { Repository } from "./Repository.js";

/**
 * A filesystem-backed implementation of {@link Repository} that stores each document
 * as a JSON file within a collection directory.
 *
 * This is the P0 persistence mechanism. It requires no external services (no Cosmos
 * DB, no Key Vault) so the accelerator can be demonstrated entirely offline. See
 * docs/adr/0003-file-repository-for-p0.md.
 */
export class FileRepository<T> implements Repository<T> {
  private readonly directory: string;
  private ready: Promise<void> | undefined;

  constructor(baseDirectory: string, collectionName: string) {
    this.directory = join(baseDirectory, collectionName);
  }

  private async ensureDirectory(): Promise<void> {
    if (!this.ready) {
      this.ready = mkdir(this.directory, { recursive: true }).then(() => undefined);
    }
    await this.ready;
  }

  private pathFor(id: string): string {
    if (!/^[A-Za-z0-9_.-]+$/.test(id)) {
      throw new Error(`Invalid document id: ${id}`);
    }
    return join(this.directory, `${id}.json`);
  }

  async list(): Promise<T[]> {
    await this.ensureDirectory();
    const entries = await readdir(this.directory);
    const documents: T[] = [];
    for (const entry of entries) {
      if (!entry.endsWith(".json")) {
        continue;
      }
      const contents = await readFile(join(this.directory, entry), "utf-8");
      documents.push(JSON.parse(contents) as T);
    }
    return documents;
  }

  async get(id: string): Promise<T | undefined> {
    await this.ensureDirectory();
    try {
      const contents = await readFile(this.pathFor(id), "utf-8");
      return JSON.parse(contents) as T;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        return undefined;
      }
      throw error;
    }
  }

  async put(id: string, value: T): Promise<void> {
    await this.ensureDirectory();
    await writeFile(this.pathFor(id), JSON.stringify(value, null, 2), "utf-8");
  }

  async delete(id: string): Promise<void> {
    await this.ensureDirectory();
    try {
      await rm(this.pathFor(id));
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        throw error;
      }
    }
  }
}
