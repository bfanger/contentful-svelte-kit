<script lang="ts">
  import type { LayoutData } from "./$types";

  export let data: LayoutData;
</script>

<svelte:head>
  <title>{data.title}</title>
  {#if data.description}
    <meta name="description" content={data.description} />
  {/if}
</svelte:head>
<slot />
<pre>{JSON.stringify(data, null, 2)}</pre>

<style lang="scss">
  :global {
    @import "../app.scss";
  }
</style>
