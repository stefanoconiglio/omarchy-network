// node Latency.test.js
const assert = require("assert")
const L = require("./Latency.js")

// internet_ping_ms as omarchy-network-status prints it: a number, or empty
// for a lost ping; missing altogether when there is no route.
assert.strictEqual(L.sampleMs("35.1"), 35.1)
assert.strictEqual(L.sampleMs("1042"), 1042)
assert.strictEqual(L.sampleMs(" 0.045 "), 0.045)
assert.strictEqual(L.sampleMs(""), null)
assert.strictEqual(L.sampleMs(undefined), null)
assert.strictEqual(L.sampleMs(null), null)
assert.strictEqual(L.sampleMs("-1"), null)
assert.strictEqual(L.sampleMs("timeout"), null)

assert.strictEqual(L.status(0, false, 3000), "waiting")
assert.strictEqual(L.status(0, false, 10001), "down")
assert.strictEqual(L.status(23, true, 4900), "good")
assert.strictEqual(L.status(49.9, true, 900), "good")
assert.strictEqual(L.status(50, true, 900), "slow")
assert.strictEqual(L.status(100, true, 900), "bad")
assert.strictEqual(L.status(5631, true, 6000), "bad")
// One lost poll (5 s) keeps the last reading; two in a row read "no net".
assert.strictEqual(L.status(23, true, 9999), "good")
assert.strictEqual(L.status(23, true, 10001), "down")

assert.strictEqual(L.label("good", 23.3), "23 ms")
assert.strictEqual(L.label("slow", 64.6), "65 ms")
assert.strictEqual(L.label("bad", 5631), "5.6 s")
assert.strictEqual(L.label("down", 0), "no net")
assert.strictEqual(L.label("waiting", 0), "…")

console.log("Latency.js: all assertions pass")
