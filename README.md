# Network, with the latency in the bar

Omarchy's network widget (Wi-Fi and Ethernet) with one addition: the round
trip to the internet, left of the icon, inside one soft outline with it.

```
( 36 ms 󰖩 )
```

## In the bar

- The latency is the widget's own internet ping: `omarchy-network-status
  --verbose`, which the panel already reads, sends one ping (1 s timeout) to
  the internet and one to the router on each call. The panel reads it every
  1.5 s while open; the widget now also reads it every 5 s while the panel is
  closed, so the number is always current. No second ping runs.
- Colours, as the other outlined widgets (`Attention.qml`, `Attention.js`):
  the bar's text colour, orange from 50 ms, red from 100 ms; red "no net"
  once no reply has come for 10 s (two reads in a row without one); a dim
  "…" before the first reply.
- Hover: the internet and router round trips. A click on the number does
  what the icon does: it opens or closes the panel.
- On a vertical bar only the icon shows.
- The logic (`Latency.js`) is plain functions; `node Latency.test.js` checks
  it.

Everything else is Omarchy's widget unchanged: the panel, its own ping
averages and packet loss, Wi-Fi networks, DNS, bands.

## Install

`~/.config/omarchy/plugins/coniglio.network` is a symlink to this folder. The
bar entry is `coniglio.network` (it replaced `omarchy.network` when the
widget was cloned with `omarchy plugin clone omarchy.network`, Omarchy
4.0.4). A clone does not follow Omarchy's later changes to the original
widget; compare `Panel.qml` and `Model.js` with
`/usr/share/omarchy/shell/plugins/panels/network/` after an Omarchy update.

It replaces `coniglio.ping` (github.com/stefanoconiglio/omarchy-ping), whose
pill showed the same latency from a ping of its own.
