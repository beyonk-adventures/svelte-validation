{#await load()}
Loading example...
{:then highlighted}
<pre>
  <code class="language-svelte">{@html highlighted}</code>
</pre>
{/await}

<script>
  import Prism from 'prismjs';
  import './theme.css';
  import 'prism-svelte';

  export let src

  async function load () {
    const res = await fetch(`/api/example?file=${src}`)
    const text = await res.text()
    return Prism.highlight(text, Prism.languages.svelte, 'svelte')
  }
</script>

<style>
  pre {
    overflow: auto;
    background-color: black;
    padding: 2rem;
  }
</style>