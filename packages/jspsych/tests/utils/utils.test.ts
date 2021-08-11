import { deepCopy, flatten, unique } from "../../src/modules/utils";

describe("unique", () => {
  test("generates unique array when there are duplicates", () => {
    var arr = [1, 1, 2, 2, 3, 3];
    var out = unique(arr);
    expect(out).toEqual([1, 2, 3]);
    expect(out).not.toEqual(arr);
  });

  test("generates same array when there are no duplicates", () => {
    var arr = [1, 2, 3];
    var out = unique(arr);
    expect(out).toEqual(arr);
  });
});

describe("flatten", () => {
  test("generates flat array from flat input", () => {
    var arr = [1, 1, 2, 2, 3, 3];
    var out = flatten(arr);
    expect(out).toEqual(arr);
  });

  test("generates flat array from nested input", () => {
    var arr = [1, [1, 2, 2], [3], 3];
    var out = flatten(arr);
    expect(out).toEqual([1, 1, 2, 2, 3, 3]);
  });
});

describe("deepCopy", () => {
  test("works for objects", () => {
    var o = { a: 1, b: { c: 2, d: 3 } };
    var o2 = deepCopy(o);
    o2.b.c = 4;
    expect(o.b.c).toBe(2);
  });
  test("works for objects with arrays", () => {
    var o = { a: 1, b: [2, 3] };
    var o2 = deepCopy(o);
    o2.b[0] = 4;
    expect(JSON.stringify(o2.b)).toBe(JSON.stringify([4, 3]));
    expect(o.b[0]).toBe(2);
  });
  test("works for objects with functions", () => {
    var c = 0;
    var o = {
      a: 1,
      b: () => {
        c = 2;
      },
    };
    var o2 = deepCopy(o);
    o2.b = () => {
      c = 1;
    };
    o.b();
    expect(c).toBe(2);
    o2.b();
    expect(c).toBe(1);
  });
});