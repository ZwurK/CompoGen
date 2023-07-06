<template>
  <div class="mt-40">
    <h1 class="text-4xl font-bold text-gray-900 mb-10 ml-20">Favorites</h1>
    <div class="flex flex-wrap justify-center lg:gap-10 xl:gap-20">
      <ComponentCard v-for="component in favoriteComponents" :key="component._id" :component="component"
        class="basis-full lg:basis-5/12 mx-4" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import authenticatedAxios from '@/config/authenticatedAxios';
import ComponentCard from '@/components/ComponentCard.vue';

export default {
  name: 'FavoritesPage',
  components: { ComponentCard },
  data() {
    return {
      favoriteComponents: []
    };
  },
  async mounted() {
    await this.$store.dispatch("favorite/fetchUserFavorites");
    this.fetchFavoriteComponents();
  },

  computed: {
    ...mapGetters('favorite', ['userFavorites']),
  },
  methods: {
    async fetchFavoriteComponents() {
      if (this.userFavorites && this.userFavorites.length > 0) {
        const promises = this.userFavorites.map(id => authenticatedAxios.get(`/api/components/getOneComponent/${id}`));

        try {
          const response = await Promise.all(promises);
          this.favoriteComponents = response.map(res => res.data);
        } catch (error) {
          console.error(error);
        }
      }
    }

  }
};
</script>
