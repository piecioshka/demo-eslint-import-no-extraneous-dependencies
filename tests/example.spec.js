import test from "node:test";
import assert from "node:assert/strict";

import { return1 } from "../shared/shared.js";
import { return2 } from "../src/index.js";

test("return 1", () => {
  assert.strictEqual(return1(), 1);
});

test("return 2", () => {
  assert.strictEqual(return2(), 2);
});
