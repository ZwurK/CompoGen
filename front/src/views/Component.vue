<template>
  <div class="p-10">
    <div class="mb-4 space-x-2">
      <button v-for="size in screenSizes" :key="size" @click="changeScreenSize(size)"
        class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none">
        {{ size }}
      </button>
    </div>
    <iframe sandbox="allow-same-origin allow-scripts" :srcdoc="generateSrcDoc(component)" :style="iframeStyle"
      style="height: 100%;"></iframe>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      component: null,
      screenSize: 'md',
      screenSizes: ['sm', 'md', 'lg', 'xl'],
    };
  },
  computed: {
    iframeStyle() {
      switch (this.screenSize) {
        case 'sm': return 'width: 540px;';
        case 'md': return 'width: 720px;';
        case 'lg': return 'width: 960px;';
        case 'xl': return 'width: 100%';
        default: return 'width: 100%;';
      }
    },
  },
  async created() {
    try {
      const response = await axios.get(`http://localhost:3000/api/elements/getOneElement/${this.$route.params.id}`);
      this.component = response.data;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    generateSrcDoc(element) {
      if (element) {
        /* eslint-disable no-useless-escape */
        let cssLink = element.framework === 'Bootstrap'
          ? '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"><\/script>'
          : '<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">';

        return `<html>
                  <head>
                      ${cssLink}
                  </head>
                  <body>
                      ${element.code}
                      <script>
                    document.addEventListener('DOMContentLoaded', function() {
                      var links = document.getElementsByTagName('a');
                      for (var i = 0; i < links.length; i++) {
                        links[i].addEventListener('click', function(e) {
                          e.preventDefault();
                        });
                      }
                    });
                  <\/script>
                  </body>
              </html>`;
                      /* eslint-enable no-useless-escape */
      }
      return '';
    },
    changeScreenSize(size) {
      this.screenSize = size;
    },
  }
};
</script>
