# Desktop App

The Chaos Reactor desktop app is build with [Tauri](https://tauri.app/).

## Getting Started

Copy the example environment file and fill in the required values:

```bash
cd apps/desktop
cp .env.example .env.local
```

Add [the correct Tauri build-triple identifier for your platform](https://tauri.app/v1/guides/distribution/publishing) as `TAURI_TARGET` in `.env.local`. If you are building for macOS on an Intel Mac, you can use `x86_64-apple-darwin` as the target (the current default).

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14.15.1)
- [Rust](https://www.rust-lang.org/tools/install) (v1.49.0)
- [NPM](https://www.npmjs.com/get-npm)

#### macOS

You'll need to install the Xcode Command Line Tools.

```bash
 sudo xcodebuild -license
 xcodebuild -runFirstLaunch
```

## Updating Tauri

```bash
npm install @tauri-apps/cli@latest @tauri-apps/api@latest
```
