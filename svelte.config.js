import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
  },
  //   compilerOptions: {
  //     css: false,
  //   },
};

export default config;
