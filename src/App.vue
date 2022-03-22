<template>
  <ImageSlider />
  {{ imagesFeed }}
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js App" />
  <el-button>Default</el-button>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import ImageSlider from "./components/ImageSlider.vue";
import { ref, onMounted } from "vue";
import axios from "axios";

const localhost = "http://localhost:8080"
const flickerPublicFeed =
  "https://www.flickr.com/services/feeds/photos_public.gne?format=json";
const flickerProxy = `${localhost}/services/feeds/photos_public.gne?format=json&nojsoncallback=1`
const headers = new Headers();
headers.append("Access-Control-Allow-Origin", "true");
const requestOptions = {
  method: "POST",
  headers: headers,
  redirect: "follow",
};
const result = ref(null)

export default {
  name: "App",
  components: {
    HelloWorld,
    ImageSlider,
  },
  setup() {
  },
  data() {
    return {
      imagesFeed: null,
    };
  },
  async mounted() {
    axios.post(flickerProxy).then((data) => {
      // if (data.data) {
      //   this.imagesFeed = JSON.parse(data.data)
      // }
      console.log('imagesFeed on mounted', this.jsonFlickrApi(data));
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
