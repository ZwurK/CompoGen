<template>
    <div class="mt-40">
        <div class="flex gap-10 mx-20 mb-10">
            <select
                class="block w-full bg-white border-2 border-gray-300 focus:border-purple-500 text-base leading-6 font-medium rounded-md text-gray-700 focus:outline-none transition ease-in-out duration-150 px-3 py-2 mb-4"
                v-model="sort" @change="loadComponents">
                <option value="date:asc">Date (Asc)</option>
                <option value="date:desc">Date (Desc)</option>
                <option value="likes:asc">Popularity (Asc)</option>
                <option value="likes:desc">Popularity (Desc)</option>
            </select>

            <select
                class="block w-full bg-white border-2 border-gray-300 focus:border-purple-500 text-base leading-6 font-medium rounded-md text-gray-700 focus:outline-none transition ease-in-out duration-150 px-3 py-2 mb-4"
                v-model="filter" @change="loadComponents">
                <option value="">All</option>
                <option value="framework:Bootstrap">Bootstrap</option>
                <option value="framework:Tailwindcss">TailwindCSS</option>
            </select>

            <select v-model="filter"
                class="block w-full bg-white border-2 border-gray-300 focus:border-purple-500 text-base leading-6 font-medium rounded-md text-gray-700 focus:outline-none transition ease-in-out duration-150 px-3 py-2 mb-4"
                @change="loadComponents">
                <option value="">All</option>
                <option v-for="(componentType, index) in componentsType" :key="index" :value="'type:' + componentType">{{
                    componentType }}</option>
            </select>
        </div>

        <div class="flex flex-wrap justify-center lg:gap-10 xl:gap-20">
            <ComponentCard class="basis-full lg:basis-5/12 mx-4" v-for="component in components" :key="component.id"
                :component="component" />
        </div>

        <div class="flex md:justify-center gap-5 mt-20">
            <button
                class="flex items-center space-x-2 rounded bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-4 py-2 text-white"
                @click="previousPage" :disabled="page === 1">Previous</button>
            <button
                class="flex items-center space-x-2 rounded bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-4 py-2 text-white"
                @click="nextPage">Next</button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: "ExplorePage",
    data() {
        return {
            page: 1,
            limit: 10,
            sort: "date:asc",
            filter: "",
            componentsType: ['Navbar', 'Footer', 'Card', 'Table', 'Progress Bar', 'Button', 'Input', 'Form', 'Pagination', 'Alert', 'Search Bar', 'Pricing', 'Call to action'],
        };
    },
    computed: {
        ...mapGetters('favorite', ['components']), // Pour récupérer les composants à afficher
        ...mapGetters('user', ['isLoggedIn']),
    },
    async created() {
        await this.loadComponents();
    },
    methods: {
        ...mapActions('favorite', ['fetchComponents']),
        async loadComponents() {
            try {
                if (this.isLoggedIn) {
                    await this.$store.dispatch("favorite/fetchUserFavorites"); // Permet de charger les favoris de l'utilisateur avant les composants pour éviter les bugs
                } 

                // Appele l'action fetchComponents avec les bons paramètres
                await this.fetchComponents({
                    page: this.page,
                    limit: this.limit,
                    sort: this.sort,
                    filter: this.filter
                });
            }
            catch (error) {
                console.error(error);
            }
        },
        async nextPage() {
            this.page++;
            await this.loadComponents();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        async previousPage() {
            if (this.page > 1) {
                this.page--;
                await this.loadComponents();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

    },
};
</script>
