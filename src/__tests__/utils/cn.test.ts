import { cn } from "@/utils";

describe("cn utility", () => {
  it("should merge class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("should handle conditional classes", () => {
    expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
  });

  it("should handle undefined and null values", () => {
    expect(cn("foo", undefined, null, "bar")).toBe("foo bar");
  });

  it("should merge tailwind classes correctly", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
  });

  it("should handle conflicting tailwind classes", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("should handle object syntax", () => {
    expect(cn({ foo: true, bar: false })).toBe("foo");
  });

  it("should handle array syntax", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar");
  });

  it("should handle empty input", () => {
    expect(cn()).toBe("");
  });
});
