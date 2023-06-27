<template>
  <div class="p-10 bg-gray-100">
    <h1 class="text-4xl font-bold mb-10">Explore Components</h1>

    <select v-model="filter"
      class="block w-full bg-white border-2 border-gray-300 focus:border-purple-500 text-base leading-6 font-medium rounded-md text-gray-700 focus:outline-none transition ease-in-out duration-150 px-3 py-2 mb-4">
      <option value="">All</option>
      <option v-for="(element, index) in elementsType" :key="index">{{ element }}</option>
    </select>


    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ComponentCard v-for="component in filteredComponents" :key="component.id" :component="component"
        :likedComponents="likedComponents" @like-component="likeComponent" />


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
import ComponentCard from '../components/ComponentCard.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ExplorePage',
  components: {
    ComponentCard,
  },
  data() {
    return {
      elementsType: ['Navbar', 'Footer', 'Card', 'Table', 'Progress Bar', 'Button', 'Input', 'Form', 'Pagination', 'Alert', 'Search Bar', 'Pricing', 'Call to action'],
      filter: '',
      currentPage: 1,
    };
  },
  computed: {
    ...mapGetters('explore', ['components', 'totalPages']),
    ...mapGetters('favorite', ['likedComponents']),
    filteredComponents() {
      if (this.filter === '') {
        return this.components;
      }
      return this.components.filter(component => component.type === this.filter);
    },
  },
  methods: {
    ...mapActions('user', ['fetchUserFavorites']),
    ...mapActions('favorite', ['updateLikedComponents']),
    ...mapActions('explore', ['fetchComponents', 'updateComponentLikes']),
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.fetchComponents(this.currentPage + 1);
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.fetchComponents(this.currentPage - 1);
        this.currentPage--;
      }
    },
    async likeComponent(componentId) {
      const newLikes = await this.updateLikedComponents(componentId);
      this.updateComponentLikes({ componentId, newLikes });
    },
  },
  async created() {
    await this.fetchComponents(this.currentPage);
    await this.fetchUserFavorites();
  },
};
</script>
  