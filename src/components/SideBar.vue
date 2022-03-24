<template>
  <h2 class="title">Flickr public image feed</h2>
  <el-skeleton :rows="5" :loading="loading" animated>
    <template #default>
      <ul class="list">
        <li
          v-for="feed in feeds"
          :key="feed.author_id"
          class="list-item"
          @click="setSelection(feed)"
        >
          <el-card class="box-card" shadow="hover">
            <template #header>
              <div>By: {{ feed.author }}</div>
            </template>
            <div v-html="feed.description"></div>
          </el-card>
        </li>
      </ul>
    </template>
  </el-skeleton>
</template>

<script>
export default {
  props: {
    feeds: Array,
    selection: Object,
    loading: Boolean,
  },
  methods: {
    setSelection(feed) {
      // conversion for more readable data
      const tagList = feed.tags ? feed.tags.split(" ") : [];
      const date_taken_string = new Date(feed.date_taken).toString();
      const date_published_string = new Date(feed.published).toString();

      // assign to object
      feed.tagsArr = tagList;
      feed.date_taken_string = date_taken_string;
      feed.date_published_string = date_published_string;

      Object.assign(this.selection, feed);
    },
  },
};
</script>

<style>
li {
  cursor: pointer;
}
h2.title {
  color: #ffffff;
}
.box-card {
  width: 100%;
}
.box-card:hover {
  background-color: #ffe68c;
}
.list {
  height: 90vh;
  padding: 0;
  margin: 0;
  direction: rtl;
}

.list .list-item {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
  padding: 10px;
}
.list .list-item + .list-item {
  margin-top: 10px;
}
</style>