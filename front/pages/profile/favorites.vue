<template>
  <div class="mt-40">
    <h1 class="text-4xl font-bold text-gray-900 mb-10 ml-20">Favorites</h1>
    <div class="flex flex-wrap justify-center lg:gap-10 xl:gap-20">
      <ComponentCard v-for="component in favoriteComponents" :key="component._id" :component="component"
        class="basis-full lg:basis-5/12 mx-4" />
    </div>
  </div>
</template>
  
<script setup>

import { useUserStore } from '~/stores/user';

definePageMeta({
  middleware: ['fetch-user-data']
})

const config = useRuntimeConfig();
const userStore = useUserStore();

import { ref } from 'vue';

let favoriteComponents = ref([]);

const fetchFavoriteComponent = (id) => {
  const { data, error, execute } = useFetch(`/api/components/getOneComponent/${id}`, {
    method: "GET",
    baseURL: config.public.apiBaseUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userStore.token}`,
    }
  });

  return { data, error, execute };
};

const fetchFavoriteComponents = async () => {
  if (userStore.user.likedComponents && userStore.user.likedComponents.length > 0) {
    const fetchers = userStore.user.likedComponents.map(id => fetchFavoriteComponent(id));
    
    for (const fetcher of fetchers) {
      await fetcher.execute();

      if (fetcher.error.value) {
        throw fetcher.error.value.data.message;
      } else {
        favoriteComponents.value.push(fetcher.data.value);
      }
    }
  }
};


onMounted(async () => {
  fetchFavoriteComponents();
});
</script>