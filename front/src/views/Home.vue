<template>
    <section class="mt-40 bg-white flex flex-wrap lg:flex-nowrap justify-center">
        <div class="px-12 mx-auto max-w-7xl mt-20">
            <div class="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
                <h1
                    class="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
                    <span>Looking for</span> <span
                        class="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-violet-600 to-indigo-600 lg:inline">the
                        perfect </span><span>web component?</span>
                </h1>
                <p class="px-0 mb-8 text-lg text-gray-600 md:text-xl lg:px-24">
                    Browse through thousands of ready-to-use components and generate your own using AI.
                </p>
                <div class="mb-4 space-x-0 md:space-x-2 md:mb-8">
                    <router-link to="/generate"
                        class="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-2xl sm:w-auto sm:mb-0">
                        Get Started
                        <ArrowRightIcon />
                    </router-link>
                    <router-link to="/"
                        class="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg bg-gray-200 hover:bg-gray-100 rounded-2xl sm:w-auto sm:mb-0">
                        Learn More
                        <LightIcon />
                    </router-link>
                </div>
            </div>
        </div>
        <div class="w-1/2">
            <img src="../assets/images/landing.png" />
        </div>
    </section>

    <section class="w-full overflow-hidden bg-white mt-40">
        <div class="flex  justify-between">
            <div></div>
            <h2
                class="text-center mb-8 text-3xl font-extrabold leading-none tracking-normal text-gray-900 md:text-4xl md:tracking-tight">
                <span
                    class="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-violet-600 to-indigo-600 lg:inline">Featured
                </span>
                <span>components</span>
            </h2>
            <div class="mt-4 me-10 space-x-4">
                <button @click="scroll(-100)"
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    class="w-6 h-6 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>
            <button @click="scroll(100)"
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    class="w-6 h-6 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
            </div>
        </div>

        <div>
            <div class="flex gap-4 overflow-x-scroll hide-scrollbar" ref="scroller">
                <ComponentCard class="basis-full lg:basis-4/12 mx-4 flex-shrink-0" v-for="component in topComponents"
                    :key="component.id" :component="component" />
            </div>


        </div>
    </section>


    <div class="px-12 mx-auto max-w-7xl mt-24">
        <div class="w-full mx-auto text-center md:w-11/12 xl:w-9/12">
            <h2 class="mb-8 text-2xl font-extrabold leading-none tracking-normal text-gray-900 md:text-4xl">
                Stay Connected
            </h2>
            <p class="px-0 mb-8 text-lg text-gray-600 md:text-xl lg:px-24">
                Subscribe to our newsletter for updates and new components.
            </p>
            <form @submit.prevent="subscribe" class="mb-4 space-x-0 md:space-x-2 md:mb-8">
                <input v-model="email" type="email"
                    class="text-lg py-3 px-4 pr-8 leading-none border-2 border-gray-300 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent bg-white"
                    placeholder="Enter your email" required />
                <button
                    class="inline-flex items-center justify-center w-full px-6 py-3 text-lg text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-2xl sm:w-auto">
                    Subscribe
                    <ArrowRightIcon />
                </button>
            </form>
        </div>
    </div>
</template>
  
<script>

import ArrowRightIcon from '../components/icons/ArrowRight.vue';
import LightIcon from '../components/icons/Light.vue';
import ComponentCard from '../components/ComponentCard.vue';
import unauthenticatedAxios from '../config/unauthenticatedAxios';
import { useToast } from "vue-toastification";
import { mapGetters } from 'vuex';

export default {
    name: "HomePage",
    components: { ComponentCard, ArrowRightIcon, LightIcon },
    data() {
        return {
            topComponents: [],
            email: "",
        };
    },
    computed: {
        ...mapGetters('user', ['isLoggedIn']),
    },
    async created() {
        this.fetchTopComponents();
    },
    methods: {
        scroll(direction) {
            const container = this.$refs.scroller;
            const maxScrollWidth = container.scrollWidth - container.clientWidth / 2 - container.clientWidth / 2;

            if (maxScrollWidth !== 0) {
                let scrollAmount = 0;
                const slideTimer = setInterval(() => {
                    container.scrollLeft += direction * 10;
                    scrollAmount += 10;
                    if (scrollAmount >= 100) {
                        clearInterval(slideTimer);
                    }
                });
            }
        },
        async fetchTopComponents() {
            if (this.isLoggedIn) {
                await this.$store.dispatch("favorite/fetchUserFavorites"); // Permet de charger les favoris de l'utilisateur avant les composants pour éviter les bugs
            }
            unauthenticatedAxios.get("/api/components/top")
                .then(response => {
                    this.topComponents = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        subscribe() {
            unauthenticatedAxios.post("/api/newsletter/subscribe", { email: this.email })
                .then(response => {
                    console.log(response);
                    this.email = "";
                    const toast = useToast();
                    toast.success('You have subscribed to the newsletter.', {
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                })
                .catch(error => {
                    console.log(error);
                    if (error.response) {
                        const toast = useToast();
                        toast.error(`Error: ${error.response.data.errors[0].msg}`, {
                            closeOnClick: true,
                            pauseOnHover: true,
                        });
                    } else {
                        const toast = useToast();
                        toast.error(`Error: An unexpected error has occurred.`, {
                            closeOnClick: true,
                            pauseOnHover: true,
                        });
                    }
                });
        },

    },
};
</script>

<style>
.hide-scrollbar::-webkit-scrollbar {
    display: none;
}

.hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
    scroll-behavior: smooth;
}
</style>
  