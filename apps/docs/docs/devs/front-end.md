# Front-end development

This document outlines the front-end development process for Voxable.

## Prerequisites & Setup

See [Getting Started](/devs/getting-started).

## Generating components

We use [Nx](https://nx.dev/) to generate components. Nx is a set of tools for building and managing full-stack applications.

To generate a component, run the following command (or use the [Nx Console](https://nx.dev/latest/react/getting-started/nx-console):

```bash
pnpm nx g @nrwl/next:component Table --project=ui --no-interactive
```

This will generate a component in `libs/ui/src/lib/table.tsx` and a test in `libs/ui/src/libs/table.test.tsx`.

### Generating stories

We use [Storybook](https://storybook.js.org/) to host living documentation for our components. To generate stories from your component code, run the following command:

```bash
nx stories:generate ui
```

