<script lang="ts">
  export let title: string | undefined;
  export let html: string | undefined;
</script>

<h2>{title}</h2>
<div>{@html html}</div>
