import { describe, expect, it } from "vitest";
import { APP_NAME, APP_VERSION } from "./app-info";

describe("app-info", () => {
  it("exposes the app name", () => {
    expect(APP_NAME).toBe("Shiplog");
  });

  it("exposes a semver-shaped version", () => {
    expect(APP_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
  });
});
