import adapter from '@sveltejs/adapter-static';
const isDev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // TODO: enable and adapt to Runes
  // compilerOptions: {
  //   runes: true,
  // },
  kit: {
    paths: {
      base: isDev ? '' : '/snoo',
    },
    adapter: adapter({
      fallback: 'index.html',
    }),
  },
};

export default config;
