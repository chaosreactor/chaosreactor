# Hosting

Chaos Reactor is built with [Next.js](https://nextjs.org/), which is a framework for building static and server-rendered applications. This means that you can host Chaos Reactor on any static hosting service, such as [Netlify](https://www.netlify.com/), [Vercel](https://vercel.com/), [Surge](https://surge.sh/), or [GitHub Pages](https://pages.github.com/).

## Netlify

To host Chaos Reactor on Netlify, you can use the following configuration:

```toml
[build]
  command = "npm run build"
  publish = "build"
  functions = "functions"
```

### Netlify and Next.js

Netlify comes with [support for Next.js baked-in.](https://docs.netlify.com/integrations/frameworks/next-js/overview/?_ga=2.73526802.1827089513.1663916613-1381580213.1648050086)

## Vercel

To host Chaos Reactor on Vercel, you can use the following configuration:

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ]
}
```

## Surge

To host Chaos Reactor on Surge, you can use the following configuration:

```json
{
  "build": "npm run build",
  "public": "build",
  "functions": "functions"
}
```

## GitHub Pages

To host Chaos Reactor on GitHub Pages, you can use the following configuration:

```json
{
  "homepage": "https://<your-username>.github.io/<your-repo-name>",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

## Custom

If you want to host Chaos Reactor on a custom server, you can use the following configuration:

```json
{
  "scripts": {
    "start": "next start -p $PORT"
  }
}
```

<!--

Saving some temporary Copilot-written docs:

## Docker

To host Chaos Reactor on Docker, you can use the following configuration:

```dockerfile
FROM node:14-alpine
```

-->
