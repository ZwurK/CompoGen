<template>
  <div class="p-10">
    <h1 class="text-4xl font-bold text-pink-400 mb-10">Explore Components</h1>

    <select v-model="filter"
      class="block w-full bg-white border-2 border-gray-300 focus:border-purple-500 text-base leading-6 font-medium rounded-md text-gray-700 focus:outline-none transition ease-in-out duration-150 px-3 py-2 mb-4">
      <option value="">All</option>
      <option v-for="(element, index) in elementsType" :key="index">{{ element }}</option>
    </select>


    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="component in filteredComponents" :key="component.id" class="border border-gray-300 rounded-lg p-4">
        <div class="h-32 rounded-md mb-2">
          <iframe sandbox="allow-same-origin allow-scripts"
            :srcdoc.prop="generateSrcDoc(component.framework, component.code)"
            style="width: 100%; height: 100%;"></iframe>
        </div>
        <hr class="my-12 h-0.5 border-t-0 bg-purple-400" />
        <h2 class="text-2xl font-bold text-pink-400 mb-2">{{ component.name }}</h2>
        <div class="flex items-center">
          <router-link :to="`/component/${component._id}`"
            class="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded mr-2">Live view</router-link>
          <button @click="copyToClipboard(component.code)"
            class="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded mr-2">
            <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15"
                  stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                </path>
                <path d="M9 12H15" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                </path>
                <path d="M9 16H12" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                </path>
                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#ffffff"
                  stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                </path>
              </g>
            </svg>
          </button>
          <button @click="like(component)" class="px-4 py-2">
            {{ component.likes }} <svg class="h-10 w-10" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg" stroke="#F472B6" stroke-width="0.4800000000000001">
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M12 19.7501C11.8012 19.7499 11.6105 19.6708 11.47 19.5301L4.70001 12.7401C3.78387 11.8054 3.27072 10.5488 3.27072 9.24006C3.27072 7.9313 3.78387 6.6747 4.70001 5.74006C5.6283 4.81186 6.88727 4.29042 8.20001 4.29042C9.51274 4.29042 10.7717 4.81186 11.7 5.74006L12 6.00006L12.28 5.72006C12.739 5.25606 13.2857 4.88801 13.8883 4.63736C14.4909 4.3867 15.1374 4.25845 15.79 4.26006C16.442 4.25714 17.088 4.38382 17.6906 4.63274C18.2931 4.88167 18.8402 5.24786 19.3 5.71006C20.2161 6.6447 20.7293 7.9013 20.7293 9.21006C20.7293 10.5188 20.2161 11.7754 19.3 12.7101L12.53 19.5001C12.463 19.5752 12.3815 19.636 12.2904 19.679C12.1994 19.7219 12.1006 19.7461 12 19.7501ZM8.21001 5.75006C7.75584 5.74675 7.30551 5.83342 6.885 6.00505C6.4645 6.17669 6.08215 6.42989 5.76001 6.75006C5.11088 7.40221 4.74646 8.28491 4.74646 9.20506C4.74646 10.1252 5.11088 11.0079 5.76001 11.6601L12 17.9401L18.23 11.6801C18.5526 11.3578 18.8086 10.9751 18.9832 10.5538C19.1578 10.1326 19.2477 9.68107 19.2477 9.22506C19.2477 8.76905 19.1578 8.31752 18.9832 7.89627C18.8086 7.47503 18.5526 7.09233 18.23 6.77006C17.9104 6.44929 17.5299 6.1956 17.1109 6.02387C16.6919 5.85215 16.2428 5.76586 15.79 5.77006C15.3358 5.76675 14.8855 5.85342 14.465 6.02505C14.0445 6.19669 13.6621 6.44989 13.34 6.77006L12.53 7.58006C12.3869 7.71581 12.1972 7.79149 12 7.79149C11.8028 7.79149 11.6131 7.71581 11.47 7.58006L10.66 6.77006C10.3395 6.44628 9.95791 6.18939 9.53733 6.01429C9.11675 5.83919 8.66558 5.74937 8.21001 5.75006Z"
                  fill="#F472B6"></path>
              </g>
            </svg>
            {{ likedComponents.includes(component._id) ? 'Dislike' : 'Like' }}
          </button>
        </div>

      </div>
    </div>
    <div class="flex justify-between my-8">
      <button :disabled="currentPage <= 1" @click="prevPage"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Previous
      </button>
      <div>
        Page {{ currentPage }} of {{ totalPages }}
      </div>
      <button :disabled="currentPage >= totalPages" @click="nextPage"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Next
      </button>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';

export default {
  name: 'ExplorePage',
  data() {
    return {
      elementsType: ['Navbar', 'Footer', 'Card', 'Table', 'Progress Bar', 'Button', 'Input', 'Form', 'Pagination', 'Alert', 'Search Bar', 'Pricing', 'Call to action'],
      components: [],
      filter: '',
      likedComponents: [],
      currentPage: 1,
      totalPages: 0,
    };
  },
  computed: {
    filteredComponents() {
      if (this.filter === '') {
        return this.components;
      }
      return this.components.filter(component => component.type === this.filter);
    },
  },
  async created() {
    try {
      const response = await axios.get(`http://localhost:3000/api/elements/explore?page=${this.currentPage}`);
      this.components = response.data.components;
      this.totalPages = response.data.totalPages;
    } catch (error) {
      console.error(error);
    }
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    try {
      const response = await axios({
        url: 'http://localhost:3000/api/favorite/getUserFavorites',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      this.components = response.data;
      this.likedComponents = this.components.map(component => component._id);
    } catch (error) {
      console.error(error);
    }
  },

  methods: {
    async copyToClipboard(text) {
      try {
        await navigator.clipboard.writeText(text);
        alert('Code copié dans le presse-papier!');
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    },
    generateSrcDoc(framework, code) {
      /* eslint-disable no-useless-escape */
      let cssLink = framework === 'Bootstrap'
        ? '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"><\/script>'
        : '<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">';

      return `<html>
                    <head>
                        ${cssLink}
                    </head>
                    <body>
                        ${code}
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
    },
    async like(component) {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const action = this.likedComponents.includes(component._id) ? 'unlike' : 'like';
      try {
        const res = await axios({
          url: `http://localhost:3000/api/favorite/${action}/${component._id}`,
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        component.likes = res.data.likes;
        if (action === 'like') {
          this.likedComponents.push(component._id);
        } else {
          const index = this.likedComponents.indexOf(component._id);
          if (index > -1) {
            this.likedComponents.splice(index, 1);
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    async changePage(page) {
      try {
        const response = await axios.get(`http://localhost:3000/api/elements/explore?page=${page}`);
        this.components = response.data.components;
        this.currentPage = page;
      } catch (error) {
        console.error(error);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.changePage(this.currentPage + 1);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.changePage(this.currentPage - 1);
      }
    },
  }

};
</script>
  