import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // TODO: enable and adapt to Runes
  // compilerOptions: {
  //   runes: true,
  // },
  kit: {
    adapter: adapter({
      fallback: 'index.html',
    }),
  },
};

export default config;
