import { checkDuplicate } from "./check-double-entries.js";
///<reference types="jest"/>

describe("checkDuplicate", () => {
  it("should check double entries", () => {
    const result = checkDuplicate("Peter", "Peter");
    expect(result).toBe(true);
  });
  it("should check double entries caseinsensitive", () => {
    const result = checkDuplicate("Peter", "peteR");
    expect(result).toBe(true);
  });
  it("should check different entries", () => {
    const result = checkDuplicate("Peter", "Paul");
    expect(result).toBe(false);
  });
});
