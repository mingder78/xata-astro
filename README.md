# Astro with Tailwind

```sh
bun create astro@latest -- --template with-tailwindcss
```

# add xata

```sh
bun run src/index.ts
[
  {
    id: "rec_cv5b8gh5jljht25gudf0",
    password: "asdf123",
    username: "ming",
    read: [Function],
    update: [Function],
    replace: [Function],
    delete: [Function],
    xata: {
      createdAt: 2025-03-07T08:54:26.874Z,
      updatedAt: 2025-03-07T08:54:26.874Z,
      version: 0,
    },
    getMetadata: [Function],
    toSerializable: [Function],
    toString: [Function],
  }
]
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/with-tailwindcss)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/with-tailwindcss)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/with-tailwindcss/devcontainer.json)

Astro comes with [Tailwind](https://tailwindcss.com) support out of the box. This example showcases how to style your Astro project with Tailwind.

For complete setup instructions, please see our [Tailwind Integration Guide](https://docs.astro.build/en/guides/integrations-guide/tailwind).


# code structure

```
.
├── .astro
│   ├── collections
│   ├── content-assets.mjs
│   ├── content-modules.mjs
│   ├── content.d.ts
│   ├── data-store.json
│   ├── settings.json
│   └── types.d.ts
├── .env
├── .env.example
├── .gitignore
├── .xata
│   ├── migrations
│   │   ├── .ledger
│   │   ├── mig_cv5b57a000vn51j3sm60_2574386a.json
│   │   ├── mig_cvn44krjvveebe59jb00_69ecf93c.json
│   │   ├── mig_cvn4533jvveebe59jb10_e3a3acda.json
│   │   └── mig_cvn4abjjvveebe59jb20_361795b3.json
│   └── version
│       └── compatibility.json
├── .xatarc
├── LICENSE.md
├── README.md
├── astro.config.mjs
├── bun.lockb
├── package.json
├── public
│   └── favicon.svg
├── src
│   ├── components
│   │   └── Button.astro
│   ├── db
│   │   └── db.ts
│   ├── layouts
│   │   └── main.astro
│   ├── pages
│   │   ├── [...slugs].ts
│   │   ├── index.astro
│   │   └── markdown-page.md
│   ├── styles
│   │   └── global.css
│   └── xata.ts
└── tsconfig.json
```
