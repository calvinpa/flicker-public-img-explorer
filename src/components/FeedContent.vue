<template>
  <div class="block">
    <div v-html="selection.description"></div>
  </div>
</template>

<script>
export default {
  props: {
    selection: Object,
  },
  mounted() {
    console.log("selection", this.selection);
  },
};
</script>
<style>
</style>