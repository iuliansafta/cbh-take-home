const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (typeof event === "object" && "partitionKey" in event) {
    return event.partitionKey;
  }

  return generateCryptoHash(event);
};

function generateCryptoHash(data) {
  if (typeof data !== "string") {
    data = JSON.stringify(data);
  }

  return crypto.createHash("sha3-512").update(data).digest("hex");
}
