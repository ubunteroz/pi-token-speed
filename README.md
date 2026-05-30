# pi-token-speed

A [Pi Coding Agent](https://pi.dev/) extension that displays real-time **tokens-per-second (TPS)** performance metrics in the status bar while the AI is streaming responses.

## Features

- **Real-time TPS tracking** — measures token throughput as the assistant generates text and thinking content
- **Sliding window calculation** — uses a 1-second sliding window for accurate, responsive metrics
- **Color-coded speed indicators** — visual feedback based on performance thresholds
- **Fully configurable** — customize display, thresholds and colors via `~/.pi/agent/settings.json`

## Speed Tiers

| Tier | TPS | Color |
|------|-----|-------|
| 🟥 Slow | 0–15 | `#ff4444` (red) |
| 🟨 Medium | 15–30 | `#ffaa00` (orange) |
| 🟩 Fast | 30–45 | `#00ff88` (green) |
| 🟦 Blazing | 45+ | `#44ddff` (cyan) |

## Installation

This package is a Pi extension. Install it with

```bash
npm install pi-token-speed
```

or

```bash
pi install https://github.com/gsanhueza/pi-token-speed
```

## Configuration

You can customize the display, speed thresholds and colors by adding a `tokenSpeed` section to your `~/.pi/agent/settings.json`:

```json
{
  "tokenSpeed": {
    "display": "tps",
    "tpsSlow": 0,
    "tpsMedium": 15,
    "tpsFast": 30,
    "tpsBlazing": 45,
    "colorSlow": "#ff4444",
    "colorMedium": "#ffaa00",
    "colorFast": "#00ff88",
    "colorBlazing": "#44ddff"
  }
}
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `display` | `tps`, `full` | `tps` | Display only TPS or full information |
| `tpsSlow` | number | `0` | Minimum TPS threshold ("slow") |
| `tpsMedium` | number | `15` | TPS above this is "medium" |
| `tpsFast` | number | `30` | TPS above this is "fast" |
| `tpsBlazing` | number | `45` | TPS above this is "blazing" |
| `colorSlow` | string | `"#ff4444"` | Color for slow tier |
| `colorMedium` | string | `"#ffaa00"` | Color for medium tier |
| `colorFast` | string | `"#00ff88"` | Color for fast tier |
| `colorBlazing` | string | `"#44ddff"` | Color for blazing tier |

## Commands

| Command | Description |
|---------|-------------|
| `/tps` | Toggle display mode between `tps` (just the speed) and `full` (full information) |

## How It Works

1. **Session Start** — Renders the initial status bar entry showing `⚡ TPS: --`
2. **Message Start** — When the assistant begins streaming, the engine starts tracking
3. **Token Update** — Each text/thinking delta increments the token counter and updates the display
4. **Sliding Window** — TPS is calculated using the most recent 1-second window of token timestamps for sub-second precision
5. **Message End** — Final average TPS is displayed for the full response

## Dependencies

| Dependency                        | Purpose                               |
| --------------------------------- | ------------------------------------- |
| `@earendil-works/pi-coding-agent` | Pi Coding Agent SDK (peer dependency) |
