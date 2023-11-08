import { describe, expect, jest, test } from "@jest/globals";
import {
  cc,
  parseConfigurableClass,
  type Class,
  type ClassModifierFn,
} from "./configurable-class";

describe("cc", () => {
  describe("string", () => {
    const cases: [Class, Class, Class][] = [
      [undefined, undefined, ""],
      [undefined, null, ""],
      [undefined, "hello", "hello"],
      [null, undefined, ""],
      [null, null, ""],
      [null, "hello", "hello"],
      ["hello", undefined, "hello"],
      ["hello", null, "hello"],
      ["hello", "hello", "hello hello"],
    ];

    for (let [a, b, result] of cases) {
      test(`merges '${a}' and '${b}' into '${result}'`, () => {
        expect(cc(a)(b)).toBe(result);
      });
    }
  });

  describe("function", () => {
    describe("input", () => {
      const classModifierFn = jest.fn((_) => undefined);

      const cases: [Class, string[]][] = [
        [undefined, []],
        [null, []],
        ["", []],
        ["hello", ["hello"]],
        ["hello world", ["hello", "world"]],
      ];

      for (let [defaultClass, fnInput] of cases) {
        const str =
          fnInput.length <= 0
            ? "an empty array"
            : `the array '${fnInput}' (length: ${fnInput.length})`;
        test(`given the default value '${defaultClass}', the modifier function receives ${str} as input`, () => {
          cc(defaultClass)(classModifierFn);
          expect(classModifierFn).toBeCalledWith(fnInput);
        });
      }
    });

    describe("output", () => {
      const cases: [Class, ReturnType<ClassModifierFn>, string][] = [
        [undefined, undefined, ""],
        [undefined, null, ""],
        [undefined, "hello", "hello"],
        [undefined, ["hello"], "hello"],
        [undefined, ["hello", "world"], "hello world"],
        [null, undefined, ""],
        [null, null, ""],
        [null, "hello", "hello"],
        [null, ["hello"], "hello"],
        [null, ["hello", "world"], "hello world"],
        ["asdf", undefined, ""],
        ["asdf", null, ""],
        ["asdf", "hello", "hello"],
        ["asdf", ["hello"], "hello"],
        ["asdf", ["hello", "world"], "hello world"],
      ];

      for (let [a, b, result] of cases) {
        const str =
          typeof b === "string"
            ? "the string "
            : Array.isArray(b)
            ? "the array"
            : "";
        test(`a function that returns ${str}'${b}' replaces '${a}' with '${result}'`, () => {
          expect(cc(a)(() => b)).toBe(result);
        });
      }
    });
  });
});

describe("parseConfigurableClass", () => {
  test("same function as cc", () => {
    expect(parseConfigurableClass).toBe(cc);
  });
});
