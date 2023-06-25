<template>
    <section class="pt-24 bg-white">
        <div class="px-12 mx-auto max-w-7xl">
            <div class="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
                <h1
                    class="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
                    <span>Looking for</span> <span
                        class="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-pink-500 to-purple-500 lg:inline">the
                        perfect</span> <span>web component?</span>
                </h1>
                <p class="px-0 mb-8 text-lg text-gray-600 md:text-xl lg:px-24">
                    Browse through thousands of ready-to-use components and generate your own using AI.
                </p>
                <div class="mb-4 space-x-0 md:space-x-2 md:mb-8">
                    <a href="#_"
                        class="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 rounded-2xl sm:w-auto sm:mb-0">
                        Get Started
                        <svg class="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </a>
                    <a href="#_"
                        class="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg bg-gray-100 rounded-2xl sm:w-auto sm:mb-0">
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
                <div v-for="component in topComponents" :key="component.id"
                    class="border border-gray-300 rounded-lg p-4 min-w-[40%]">
                    <div class="h-32 rounded-md mb-2">
                        <iframe :srcdoc="generateSrcDoc(component.framework, component.code)"
                            style="width: 100%; height: 100%;" sandbox="allow-scripts"></iframe>
                    </div>
                    <hr class="my-12 h-0.5 border-t-0 bg-purple-400" />
                    <h2 class="text-2xl font-bold text-pink-400 mb-2">{{ component.name }}</h2>
                    <div class="flex items-center">
                        <router-link :to="`/component/${component._id}`"
                            class="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded mr-2">Live
                            view</router-link>
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
                                    <path d="M9 12H15" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                    </path>
                                    <path d="M9 16H12" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                    </path>
                                    <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                                        stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                                    </path>
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>
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

import axios from 'axios';

export default {
    name: 'HomePage',
    data() {
        return {
            topComponents: [],
            email: '',
        };
    },
    async created() {
        try {
            const response = await axios.get('http://localhost:3000/api/elements/top');
            this.topComponents = response.data;
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
        submitForm() {
            axios.post('http://localhost:3000/newsletter/subscribe', { email: this.email })
                .then(response => {
                    console.log(response);
                    this.email = '';
                })
                .catch(error => {
                    console.log(error);
                });
        },
    }

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
  