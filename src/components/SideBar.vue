<template>
  <h2>Flickr public image feed</h2>
  <ul class="list">
    <li
      v-for="img in images"
      :key="img.author_id"
      class="list-item"
      @click="setSelection(img)"
    >
      <el-card class="box-card">
        <template #header>
          <div>By: {{ img.author }}</div>
        </template>
        <div v-html="img.description"></div>
      </el-card>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    images: Array,
    selection: Object,
  },
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    setSelection(img) {
      Object.assign(this.selection, img);
    },
  },
};
</script>

<style>
li {
  cursor: pointer;
}
.box-card {
  width: 100%;
}
.list {
  height: 90vh;
  padding: 0;
  margin: 0;
  direction: rtl;
  overflow: hidden visible;
}

.list .list-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
  padding: 10px;
  margin: 10px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
.list .list-item + .list-item {
  margin-top: 10px;
}
</style>