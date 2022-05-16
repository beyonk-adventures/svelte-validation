import preprocess from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),

  kit: {
    package: {
      exports: f => {
        return f.endsWith('index.js')
      }
    }
  }
}

export default config
