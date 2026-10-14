// The latency in the bar, from the internet ping the widget already takes:
// `omarchy-network-status --verbose` sends one ping (1 s timeout) per call and
// prints `internet_ping_ms`, empty when no reply came. The panel reads it
// every 1.5 s while open; the bar has it read every 5 s while closed.
//
// Thresholds as in coniglio.ping: orange from 50 ms, red from 100 ms, and
// "no net" once nothing has come back for 10 s (two polls in a row lost).
//
// Plain functions, so the file runs under node too (Latency.test.js).

var slowMs = 50          // orange from here
var badMs = 100          // red from here
var downAfterMs = 10000  // no reply for this long: no network

// The round trip of one sample, in ms; null for a lost ping or no route.
function sampleMs(raw) {
  if (raw === undefined || raw === null) return null
  var text = String(raw).trim()
  if (!/^[0-9]+(\.[0-9]+)?$/.test(text)) return null
  return Number(text)
}

// "down" once nothing has come back for downAfterMs (quietMs: since the last
// reply, or since the start before any), "waiting" before the first reply,
// otherwise "good", "slow" or "bad" by the latest round trip.
function status(ms, hasReply, quietMs) {
  if (quietMs > downAfterMs) return "down"
  if (!hasReply) return "waiting"
  if (ms >= badMs) return "bad"
  if (ms >= slowMs) return "slow"
  return "good"
}

function label(state, ms) {
  if (state === "down") return "no net"
  if (state === "waiting") return "…"
  return ms >= 1000 ? (ms / 1000).toFixed(1) + " s" : Math.round(ms) + " ms"
}

if (typeof module !== "undefined") {
  module.exports = {
    slowMs: slowMs,
    badMs: badMs,
    downAfterMs: downAfterMs,
    sampleMs: sampleMs,
    status: status,
    label: label
  }
}
