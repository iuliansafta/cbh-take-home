const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("It should return partitionKey if exists", () => {
    const partitionKey = "1323232";
    const trivialKey = deterministicPartitionKey({
      partitionKey,
    });
    expect(trivialKey).toBe(partitionKey);
  });

  it("It should not be empty when event exists and it is JSON", () => {
    const trivialKey = deterministicPartitionKey({
      myKey: "1233434343",
    });
    expect(trivialKey.length).toBe(128);
  });

  it("It should not be empty when event exists and it string", () => {
    const trivialKey = deterministicPartitionKey("1233434343");
    expect(trivialKey.length).toBe(128);
  });

  it("Returns literal '0' when given null", () => {
    const trivialKey = deterministicPartitionKey(null);
    expect(trivialKey).toBe("0");
  });

  it("Returns something when 256 chars long", () => {
    const key = crypto.randomBytes(256).toString("hex");
    const trivialKey = deterministicPartitionKey(key);
    expect(trivialKey.length).toBe(128);
  });
});
