<script lang="ts">
  import type { LayoutData } from "./$types";

  export let data: LayoutData;
  $: menu = data.menu || [];
</script>

<svelte:head>
  <title>{data.title}</title>
  {#if data.description}
    <meta name="description" content={data.description} />
  {/if}
</svelte:head>

<header>
  <nav>
    <ul>
      {#each menu as item}
        <li>
          <a href={item.url}>{item.title}</a>
          <ul>
            {#if item.items}
              {#each item.items as subitem}
                <li><a href={subitem.url}>{subitem.title}</a></li>
              {/each}
            {/if}
          </ul>
        </li>
      {/each}
    </ul>
  </nav>
</header>
<main>
  <slot />
</main>

<style lang="scss">
  :global {
    @import "../app.scss";
  }
</style>
