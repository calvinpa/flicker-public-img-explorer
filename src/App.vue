<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="30vw">
        <SideBar :images="imagesFeed" :selection="selection"/>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <div class="content">
            <FeedContent :selection="selection"/>
          </div>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import FeedContent from "./components/FeedContent.vue";
import SideBar from "./components/SideBar.vue"
import axios from "axios";

const host = "http://localhost:8080"
const flickerProxy = `${host}/services/feeds/photos_public.gne?format=json&nojsoncallback=1`

export default {
  name: "App",
  components: {
    HelloWorld,
    FeedContent,
    SideBar,
  },
  setup() {
  },
  data() {
    return {
      imagesFeed: [],
      params: {
        format: 'json',
        nojsoncallback: 1,
      },
      selection: {}
    };
  },
  async mounted() {
    console.log('params', new URLSearchParams(this.params).toString());
    axios.post(flickerProxy).then((response) => {
      console.log('response', response);
      if (response.status === 200) {
        this.imagesFeed = response.data.items
        console.log('this.imagesFeed', this.imagesFeed);
      }
    });
  },
  methods: {
    jsonFlickrApi(rsp) {
      console.log('rsp', rsp);
    }
  },
  created() {},
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
.common-layout {
  background-color: rgb(218, 218, 218);
  height: 100%;
  width: 100%;
}
.content {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
