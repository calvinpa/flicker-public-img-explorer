<template>
  <div class="img-content" v-if="selection.author">
    <el-tooltip
      class="box-item"
      effect="dark"
      content="Click on image to go to the flickr post"
      placement="top"
    >
      <el-image :src="selection.media.m" @click="goToFlickr(selection.link)" class="imgBtn">
        <template #placeholder>
          <div class="image-slot">Loading<span class="dot">...</span></div>
        </template>
        <template #error>
          <div class="image-slot">Image not found...</div>
        </template>
      </el-image>
    </el-tooltip>
    <el-descriptions title="Public Feed Information" border :column="2">
      <el-descriptions-item label="Author" >{{
        selection.author
      }}</el-descriptions-item>
      <el-descriptions-item label="Author Id">{{
        selection.author_id
      }}</el-descriptions-item>
      <el-descriptions-item label="Title" :span="2">{{
        selection.title
      }}</el-descriptions-item>
      <el-descriptions-item label="Date taken">{{
        selection.date_taken_string
      }}</el-descriptions-item>
      <el-descriptions-item label="Date published">{{
        selection.date_published_string
      }}</el-descriptions-item>
      <el-descriptions-item label="Tags">
        <el-tag
          class="tags"
          type="success"
          v-for="(item, index) in selection.tagsArr"
          :key="index"
          >{{ item }}</el-tag
        >
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  props: {
    selection: Object,
  },
  methods: {
    goToFlickr(url) {
      window.open(url, "_blank").focus();
    },
  },
};
</script>
<style>
.tags {
  margin: 5px;
}
.imgBtn{
  cursor: pointer;
}
</style>