// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server', // or 'hybrid' if mixing static and SSR
  adapter: node({
    mode: 'standalone' // or 'middleware' depending on your use case
  }),
});
