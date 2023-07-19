<template>
  <div class="mt-40">
    <div class="flex gap-10 mx-20 mb-10">
      <select
        class="block w-full bg-white border-2 border-gray-300 focus:border-purple-500 text-base leading-6 font-medium rounded-md text-gray-700 focus:outline-none transition ease-in-out duration-150 px-3 py-2 mb-4"
        v-model="params.sort" @change="loadComponents">
        <option value="date:asc">Date (Asc)</option>
        <option value="date:desc">Date (Desc)</option>
        <option value="likes:asc">Popularity (Asc)</option>
        <option value="likes:desc">Popularity (Desc)</option>
      </select>

      <select
        class="block w-full bg-white border-2 border-gray-300 focus:border-purple-500 text-base leading-6 font-medium rounded-md text-gray-700 focus:outline-none transition ease-in-out duration-150 px-3 py-2 mb-4"
        v-model="params.filter" @change="loadComponents">
        <option value="">All</option>
        <option value="framework:Bootstrap">Bootstrap</option>
        <option value="framework:Tailwindcss">TailwindCSS</option>
      </select>

      <select v-model="params.filter"
        class="block w-full bg-white border-2 border-gray-300 focus:border-purple-500 text-base leading-6 font-medium rounded-md text-gray-700 focus:outline-none transition ease-in-out duration-150 px-3 py-2 mb-4"
        @change="loadComponents">
        <option value="">All</option>
        <option v-for="(componentType, index) in componentsType" :key="index" :value="'type:' + componentType">{{
          componentType }}</option>
      </select>
    </div>

    <div v-if="pending">
      Loading...
    </div>
    <div v-else class="flex flex-wrap justify-center lg:gap-10 xl:gap-20">
      <ComponentCard class="basis-full lg:basis-5/12 mx-4" v-for="component in componentStore.components" :key="component.id"
        :component="component" />
    </div>

    <div class="flex md:justify-center gap-5 mt-20">
      <button
        class="flex items-center space-x-2 rounded bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-4 py-2 text-white"
        @click="previousPage" :disabled="params.page === 1">Previous</button>
      <button
        class="flex items-center space-x-2 rounded bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-4 py-2 text-white"
        @click="nextPage">Next</button>
    </div>
  </div>
</template>


<script setup>

definePageMeta({
  middleware: ['fetch-user-data']
})

import { useComponentStore } from '~/stores/component';

const componentStore = useComponentStore();
const config = useRuntimeConfig()

let pending = ref(false)
let params = ref({
  page: 1,
  limit: 10,
  sort: 'date:asc',
  filter: '',
})
let componentsType = ref(['Navbar', 'Footer', 'Card', 'Table', 'Progress Bar', 'Button', 'Input', 'Form', 'Pagination', 'Alert', 'Search Bar', 'Pricing', 'Call to action'])


onMounted(() => {
  componentStore.fetchComponents(params);
});

const nextPage = async () => {
  params.page++;
  componentStore.fetchComponents(params);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
const previousPage = async () => {
  if (params.page > 1) {
    params.page--;
    componentStore.fetchComponents(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

</script>

