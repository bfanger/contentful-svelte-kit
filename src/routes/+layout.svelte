<script lang="ts">
  import type { LayoutData } from "./$types";

  export let data: LayoutData;
  console.log(data);
</script>

<slot />
<pre>{JSON.stringify(data, null, 2)}</pre>

<style lang="scss">
  :global {
    @import "../app.scss";
  }
</style>
