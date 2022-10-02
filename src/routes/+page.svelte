<script lang="ts">
  import type { PageData } from "./$types";
  import Page from "./[pageSlug]/+page.svelte";

  export let data: PageData;
  $: untypedData = data as any;
</script>

<Page data={untypedData} />
