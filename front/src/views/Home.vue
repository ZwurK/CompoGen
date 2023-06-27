<template>
    <section class="mt-40 bg-white">
        <div class="px-12 mx-auto max-w-7xl">
            import ComponentCard from '../components/ComponentCard.vue';
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
                    <a href="#_"
                        class="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-2xl sm:w-auto sm:mb-0">
                        Get Started
                        <svg class="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </a>
                    <a href="#_"
                        class="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg bg-gray-200 hover:bg-gray-100 rounded-2xl sm:w-auto sm:mb-0">
                        Learn More
                        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z">
                            </path>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </section>

    <section class="w-full overflow-hidden bg-white mt-40">
        <h2
            class="text-center mb-8 text-3xl font-extrabold leading-none tracking-normal text-gray-900 md:text-4xl md:tracking-tight">
            <span
                class="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-pink-500 to-purple-500 lg:inline">Featured
            </span>
            <span>components</span>
        </h2>
        <div class="relative">
            <div class="flex gap-4 pb-8 overflow-x-scroll hide-scrollbar" ref="scroller">
                <ComponentCard v-for="component in $store.getters['explore/topComponents']" :key="component.id"
                    :component="component" :likedComponents="likedComponents" @like-component="likeComponent" />

            </div>
            <button @click="scroll(-1)"
                class="absolute top-1/2 left-0 transform -translate-y-1/2 z-10 p-4 bg-white rounded-full shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    class="w-6 h-6 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>
            <button @click="scroll(1)"
                class="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 p-4 bg-white rounded-full shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    class="w-6 h-6 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
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
            <form @submit.prevent="submitForm" class="mb-4 space-x-0 md:space-x-2 md:mb-8">
                <input v-model="email" type="email"
                    class="w-full px-3 py-2 mb-2 text-lg border rounded-lg focus:outline-none focus:border-blue-500 sm:w-auto sm:mb-0"
                    placeholder="Enter your email" />
                <button
                    class="inline-flex items-center justify-center w-full px-6 py-3 text-lg text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 rounded-2xl sm:w-auto">
                    Subscribe
                    <svg class="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                </button>
            </form>
        </div>
    </div>
</template>
  
<script>

import ComponentCard from '../components/ComponentCard.vue';
import { mapActions, mapGetters } from 'vuex';
import axios from 'axios';

export default {
    name: "HomePage",
    data() {
        return {
            topComponents: [],
            email: "",
        };
    },
    computed: {
        ...mapGetters('favorite', ['likedComponents']),
    },
    mounted() {
        this.$store.dispatch("explore/fetchTopComponents");
    },
    methods: {
        ...mapActions('favorite', ['updateLikedComponents']),
        ...mapActions('explore', ['updateComponentLikes']),
        async likeComponent(componentId) {
            const newLikes = await this.updateLikedComponents(componentId);
            this.updateComponentLikes({ componentId, newLikes });
        },
        scroll(direction) {
            const container = this.$refs.scroller;
            let scrollAmount = 0;
            const slideTimer = setInterval(() => {
                container.scrollLeft += direction * 10;
                scrollAmount += 10;
                if (scrollAmount >= 100) {
                    clearInterval(slideTimer);
                }
            }, 25);
        },
        submitForm() {
            axios.post("http://localhost:3000/newsletter/subscribe", { email: this.email })
                .then(response => {
                    console.log(response);
                    this.email = "";
                })
                .catch(error => {
                    console.log(error);
                });
        },
    },
    components: { ComponentCard }
};
</script>

<style>
.hide-scrollbar::-webkit-scrollbar {
    display: none;
}

.hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
  