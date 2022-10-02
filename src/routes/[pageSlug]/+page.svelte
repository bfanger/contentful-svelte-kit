<script lang="ts">
  import Text from "$lib/modules/Text/Text.svelte";
  /* eslint-disable no-underscore-dangle */
  import type { PageData } from "./$types";

  export let data: PageData;
  $: modules = data.modules || [];
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>
<h1>{data.title}</h1>
{#each modules as module}
  {#if module.type === "text"}
    <Text title={module.title} html={module.html} />
  {:else}
    <h3>Unsupported module: {module.type}</h3>
  {/if}
{/each}
