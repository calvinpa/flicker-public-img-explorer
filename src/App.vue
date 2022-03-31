<template>
  <div class="common-layout">
    <el-container>
      <el-container>
        <el-header>
          <h2 v-if="headerText">Filtered by tags: {{headerText}}</h2>
        </el-header>
        <el-main>
          <div class="content">
            <FeedContent :selection="selection" />
          </div>
        </el-main>
        <el-footer>
          <el-select
            class="tags-search"
            size="large"
            v-model="tagSearchInput"
            multiple
            filterable
            allow-create
            default-first-option
            :reserve-keyword="false"
            placeholder="Search feeds by tags"
            @change="tagsChanged"
          >
          </el-select>
        </el-footer>
      </el-container>
      <el-aside width="30vw">
        <SideBar
          :feeds="imagesFeed"
          :selection="selection"
          :loading="isLoading"
        />
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import FeedContent from "./components/FeedContent.vue";
import SideBar from "./components/SideBar.vue";
import axios from "axios";
import { ElNotification } from "element-plus";

const host = process.env.NODE_ENV === "production" ? "https://www.flickr.com": "http://localhost:8080";
const flickerProxy = `${host}/services/feeds/photos_public.gne`;

export default {
  name: "App",
  components: {
    FeedContent,
    SideBar,
  },
  data() {
    return {
      isLoading: false, // for loading purpose
      imagesFeed: [], // containers for api response
      // params used for search param to api endpoint
      params: {
        format: "json",
        nojsoncallback: 1,
        tags: "",
      },
      tagSearchInput: [], // containers for tags search input
      selection: {}, // selected feed that will be displayed on FeedContent
      headerText: "",
    };
  },
  mounted() {
    // call API when page loads
    this.fetchData(this.processUrl());
  },
  methods: {
    processUrl() {
      // function to return url path with object converted to search param
      this.params.tags = this.tagSearchInput.toString();
      this.headerText = this.params.tags;
      const param =
        Object.keys(this.params).length > 0
          ? new URLSearchParams(this.params).toString()
          : "";
      const url = `${flickerProxy}${param ? "?" + param : ""}`;
      return url
    },
    tagsChanged() {
      this.fetchData(this.processUrl());
    },
    fetchData(url) {
      // main function to call API
      this.isLoading = true;
      axios
        .post(url)
        .then((response) => {
          if (response.status === 200) {
            this.imagesFeed = response.data.items;
            this.imagesFeed.sort(this.sortByPublishDate)
          } else {
          }
        })
        .catch((error) => {
          ElNotification({
            title: "Error",
            message: error,
            type: "error",
            duration: 0,
          });
        })
        .finally(() => (this.isLoading = false));
    },
    sortByPublishDate(a,b) {
      // function for sorting results by published data
      return new Date(b.published) - new Date (a.published)
    }
  },
};
</script>

<style>
#app {
  font-family: FreeMono, monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  height: 98vh;
  background: rgb(28, 90, 103);
  background: linear-gradient(
    225deg,
    rgba(28, 90, 103, 1) 0%,
    rgba(137, 222, 246, 1) 47%,
    rgb(233, 233, 233) 100%
  );
}
.common-layout {
  height: 100%;
  width: 100%;
}
.content {
  height: calc(100vh - 200px);
  max-height: calc(100vh - 200px);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tags-search {
  width: 50vw;
}
</style>
