import { z } from "zod";

export const projectMetadataSchema = z.object({
  name: z.literal("SignalForge War Room"),
  version: z.string(),
  mode: z.enum(["cli-first", "api-ready", "ui-optional"]),
  dataPolicy: z.literal("synthetic-and-public-only"),
  privateDataPolicy: z.literal("no-private-company-data")
});

export type ProjectMetadata = z.infer<typeof projectMetadataSchema>;

export const projectMetadata: ProjectMetadata = {
  name: "SignalForge War Room",
  version: "0.1.0",
  mode: "cli-first",
  dataPolicy: "synthetic-and-public-only",
  privateDataPolicy: "no-private-company-data"
};
