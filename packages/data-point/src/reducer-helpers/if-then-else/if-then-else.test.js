const { ReducerIfThenElse } = require("./if-then-else");
const { Reducer } = require("../../Reducer");
const { Accumulator } = require("../../Accumulator");
const { resolve } = require("../../resolve");

describe("ReducerIfThenElse", () => {
  const spec = {
    if: input => input === "a",
    then: input => `${input} is 'a'`,
    else: input => `${input} is NOT 'a'`
  };

  describe("constructor", () => {
    it("should store reducer entries from spec", () => {
      const reducer = new ReducerIfThenElse(spec);
      expect(reducer.statement.if).toBeInstanceOf(Reducer);
      expect(reducer.statement.then).toBeInstanceOf(Reducer);
      expect(reducer.statement.else).toBeInstanceOf(Reducer);
    });
  });

  describe("create", () => {
    it("should create a new instance of ReducerIfThenElse", () => {
      expect(ReducerIfThenElse.create(spec)).toBeInstanceOf(ReducerIfThenElse);
    });
  });

  describe("resolve", () => {
    it("should resolve to then if if statement is met", async () => {
      const reducer = new ReducerIfThenElse(spec);

      const acc = new Accumulator({
        value: "a"
      });

      const result = await reducer.resolve(acc, resolve);
      expect(result).toEqual("a is 'a'");
    });

    it("should resolve to else if if statement is NOT met", async () => {
      const reducer = new ReducerIfThenElse(spec);

      const acc = new Accumulator({
        value: "b"
      });

      const result = await reducer.resolve(acc, resolve);
      expect(result).toEqual("b is NOT 'a'");
    });
  });
});
