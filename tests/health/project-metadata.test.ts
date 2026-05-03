import { describe, expect, it } from "vitest";
import {
  projectMetadata,
  projectMetadataSchema
} from "../../src/schemas/project.js";

describe("project metadata", () => {
  it("matches the expected public demo identity", () => {
    const result = projectMetadataSchema.safeParse(projectMetadata);

    expect(result.success).toBe(true);
    expect(projectMetadata.name).toBe("SignalForge War Room");
    expect(projectMetadata.dataPolicy).toBe("synthetic-and-public-only");
    expect(projectMetadata.privateDataPolicy).toBe("no-private-company-data");
  });
});
