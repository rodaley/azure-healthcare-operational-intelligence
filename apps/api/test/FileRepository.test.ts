import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { FileRepository } from "../src/repository/FileRepository.js";

interface Widget {
  id: string;
  name: string;
}

let dataDirectory: string;

beforeEach(async () => {
  dataDirectory = await mkdtemp(join(tmpdir(), "ahoi-file-repo-test-"));
});

afterEach(async () => {
  await rm(dataDirectory, { recursive: true, force: true });
});

describe("FileRepository", () => {
  it("returns undefined for a document that does not exist", async () => {
    const repo = new FileRepository<Widget>(dataDirectory, "widgets");
    expect(await repo.get("missing")).toBeUndefined();
  });

  it("writes and reads back a document", async () => {
    const repo = new FileRepository<Widget>(dataDirectory, "widgets");
    await repo.put("widget-1", { id: "widget-1", name: "First Widget" });
    expect(await repo.get("widget-1")).toEqual({ id: "widget-1", name: "First Widget" });
  });

  it("lists all documents in a collection", async () => {
    const repo = new FileRepository<Widget>(dataDirectory, "widgets");
    await repo.put("widget-1", { id: "widget-1", name: "First Widget" });
    await repo.put("widget-2", { id: "widget-2", name: "Second Widget" });
    const all = await repo.list();
    expect(all).toHaveLength(2);
  });

  it("deletes a document", async () => {
    const repo = new FileRepository<Widget>(dataDirectory, "widgets");
    await repo.put("widget-1", { id: "widget-1", name: "First Widget" });
    await repo.delete("widget-1");
    expect(await repo.get("widget-1")).toBeUndefined();
  });

  it("deleting a non-existent document does not throw", async () => {
    const repo = new FileRepository<Widget>(dataDirectory, "widgets");
    await expect(repo.delete("missing")).resolves.toBeUndefined();
  });

  it("rejects ids that could escape the collection directory", async () => {
    const repo = new FileRepository<Widget>(dataDirectory, "widgets");
    await expect(repo.get("../../etc/passwd")).rejects.toThrow(/Invalid document id/);
  });

  it("keeps separate collections isolated from each other", async () => {
    const baseline = new FileRepository<Widget>(dataDirectory, "baseline");
    const scenarioRuns = new FileRepository<Widget>(dataDirectory, "scenario-runs");
    await baseline.put("same-id", { id: "same-id", name: "Baseline" });
    await scenarioRuns.put("same-id", { id: "same-id", name: "Scenario Run" });
    expect(await baseline.get("same-id")).toEqual({ id: "same-id", name: "Baseline" });
    expect(await scenarioRuns.get("same-id")).toEqual({ id: "same-id", name: "Scenario Run" });
  });
});
