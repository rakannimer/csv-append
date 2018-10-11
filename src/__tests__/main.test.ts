import csvAppend from "../index";
import { readFileSync, write, unlinkSync } from "fs";

describe("csvAppend", () => {
  const PATH = "out.test.csv";
  afterAll(() => {
    unlinkSync(PATH);
  });
  test("exports", () => {
    expect(csvAppend).toBeTruthy();
  });
  test("works with object input", async () => {
    const { append, end } = csvAppend(PATH);
    const writer = append({ a: "1", b: "2" });
    await end();
    const csv = readFileSync(PATH, { encoding: "utf8" });
    expect(csv).toMatchInlineSnapshot(`
"a,b
1,2
"
`);
  });
  test("works with array of objects input", async () => {
    const { append, end } = csvAppend(PATH);
    const writer = append([{ a: "1", b: "2" }, { a: "2", b: "3" }]);
    await end();
    const csv = readFileSync(PATH, { encoding: "utf8" });
    expect(csv).toMatchInlineSnapshot(`
"a,b
1,2
2,3
"
`);
  });
  test("works with append", async () => {
    const { append, end } = csvAppend(PATH, true);
    const writer = append([{ a: "3", b: "4" }]);
    await end();
    const csv = readFileSync(PATH, { encoding: "utf8" });
    expect(csv).toMatchInlineSnapshot(`
"a,b
1,2
2,3
3,4
"
`);
  });
});
