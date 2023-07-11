<template>
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50" @click="showModal = false">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div @click.stop
            class="w-full max-w-md m-5 rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 max-h-100">
            <div class="bg-white p-5 rounded-lg shadow-lg overflow-auto">
                <div>
                    <h2 class="mt-6 text-center text-3xl font-bold text-violet-600">
                        Enter your openAI API key</h2>
                </div>
                <div class="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                    <div class="w-full max-w-md space-y-8">
                        <form @submit.prevent="saveApiKey" class="mt-8 space-y-6">
                            <div class="rounded-md shadow">
                                <div class="mt-2">
                                    <label for="apikey" class="sr-only">Open AI API Key</label>
                                    <input v-model="apiKey" id="apikey" name="apikey" type="text" required
                                        class="w-full py-2 px-3 leading-none border border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent bg-white"
                                        placeholder="API Key" />
                                </div>
                            </div>
                            <div>
                                <button type="submit"
                                    class="w-full text-center mr-1 px-4 py-3 leading-none border rounded text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500">Save
                                    API key</button>
                            </div>

                        </form>
                    </div>
                </div>
                <a class="text-sm text-violet-600 hover:text-purple-500 font-semibold mt-20" target="_blank"
                    href="https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key">
                    Where do I find my api key ?
                </a>
            </div>
        </div>
    </div>

    <div v-if="isLoading" class="fixed z-50 inset-0 transition-opacity" aria-hidden="true">
        <div class="flex items-center justify-center h-screen" style="background-color: rgba(75, 85, 99, 0.75);">
            <div class="flex flex-col items-center justify-center h-screen">
                <div class="w-1/4 relative flex flex-col items-center">
                    <img class="rotating-image" src="../assets/images/logo.png" alt="Image à faire tourner">
                </div>
                <p class="text-center text-white mt-10">Please wait, component generation generally takes a minute.</p>
            </div>
        </div>
    </div>

    <div class="h-screen md:flex flex-col md:flex-row" style="margin-top: 76px;">
        <div v-if="!fullscreen"
            class="w-full h-full md:w-1/3 p-4 overflow-auto hidden border-r-2 border-b-2 md:flex md:flex-col">
            <div class="flex flex-col align-center justify-between">
                <h2 class="text-3xl font-semibold text-gray-900 mt-3 mb-4">Settings</h2>
                <label for="Toggle3" class="inline-flex rounded-md cursor-pointer text-gray-100 mb-4">
                    <input id="Toggle3" type="checkbox" class="hidden peer" v-model="customPrompt">
                    <span class="flex items-center justify-center text-center text-sm flex-1 px-3 py-2 rounded-l-md bg-violet-600 peer-checked:bg-gray-700">Settings</span>
                    <span class="flex items-center justify-center text-center text-sm flex-1 px-3 py-2 rounded-r-md bg-gray-700 peer-checked:bg-violet-600">Custom prompt</span>
                </label>
            </div>
            <form @submit.prevent="generateComponent(false)" v-if="!this.customPrompt">
                <div class="space-y-4">
                    <div>
                        <label for="framework" class="text-lg font-semibold text-violet-600">Framework</label>
                        <div class="relative mb-4">
                            <select id="framework" v-model="framework"
                                class="block appearance-none w-full text-lg py-3 px-4 pr-8 leading-none border-2 border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent bg-white">
                                <option v-for="(framework, index) in frameworks" :key="index">{{ framework }}</option>
                            </select>
                            <div class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                <IconChevron/>
                            </div>
                        </div>
                        <label class="text-lg font-semibold text-violet-600">Component Type</label>
                        <div class="relative mb-4">
                            <select v-model="component"
                                class="block appearance-none w-full text-lg py-3 px-4 pr-8 leading-none border-2 border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent bg-white">
                                <option v-for="(component, index) in components" :key="index">{{ component }}
                                </option>
                            </select>
                            <div class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                <IconChevron/>
                            </div>
                        </div>

                        <label class="text-lg font-semibold text-violet-600">Style</label>
                        <div class="relative mb-4">
                            <select v-model="style"
                                class="block appearance-none w-full text-lg py-3 px-4 pr-8 leading-none border-2 border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent bg-white">
                                <option v-for="(style, index) in styles" :key="index">{{ style }}
                                </option>
                            </select>
                            <div class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                <IconChevron />
                            </div>
                        </div>


                        <div class="flex items-center justify-between mx-16">
                            <div>
                                <label for="primary-color" class="text-lg font-semibold text-violet-600">Primary
                                    Color</label>
                                <div class="relative">
                                    <input id="primary-color" v-model="primaryColor" type="color">
                                </div>
                            </div>

                            <div>
                                <label for="secondary-color" class="text-lg font-semibold text-violet-600">Secondary
                                    Color</label>
                                <div class="relative">
                                    <input id="secondary-color" v-model="secondaryColor" type="color">
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit"
                        class="flex items-center space-x-2 rounded bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-4 py-2 text-white">
                        <div class="flex items-center">
                            <span>Generate</span>
                        </div>
                    </button>
                </div>
            </form>
            <form @submit.prevent="generateComponent(true)" v-else>
                <label for="secondary-color" class="text-lg font-semibold text-violet-600">Custom prompt</label>
                <textarea
                    class="mb-4 block appearance-none w-full text-lg py-3 px-4 pr-8 leading-none border-2 border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent bg-white"
                    type="text" v-model="prompt"></textarea>
                <button type="submit"
                    class="flex items-center space-x-2 rounded bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-4 py-2 text-white">
                    <div class="flex items-center">
                        <span>Generate</span>
                    </div>
                </button>
            </form>
        </div>

        <div class="w-full h-full md:w-2/3 md:h-auto md:flex md:flex-col flex-grow">
            <div class="flex justify-between border-b-2 border-gray-200 pt-3">
                <ul class="flex gap-4 ml-4 cursor-pointer items-end">
                    <li class="md:hidden pb-2" v-if="!fullscreen" @click="tab = 'settings'"
                        :class="{ 'border-b-2 border-purple-500 text-violet-600': isActive('settings') }">
                        Settings
                    </li>
                    <li class="pb-2" @click="tab = 'render'"
                        :class="{ 'border-b-2 border-purple-500 text-violet-600': isActive('render') }">
                        Render
                    </li>
                    <li class="pb-2" v-if="!fullscreen" @click="tab = 'code'"
                        :class="{ 'border-b-2 border-purple-500 text-violet-600': isActive('code') }">
                        Code
                    </li>
                </ul>
                <div v-if="tab === 'render'" class="flex items-center">
                    <button type="button"
                        class="p-1 text-gray-600 border border-gray-200 rounded-md focus:outline-none hidden lg:block mr-4"
                        @click="share">
                        <IconShare/>
                    </button>
                    <button type="button"
                        class="p-1 text-gray-600 border border-gray-200 rounded-md focus:outline-none hidden lg:block mr-4"
                        @click="fullscreen = !fullscreen"><svg viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg" class="w-6 h-6">
                            <path d="M3 3H9V5H5V9H3V3Z" fill="currentColor"></path>
                            <path d="M3 21H9V19H5V15H3V21Z" fill="currentColor"></path>
                            <path d="M15 21H21V15H19V19H15V21Z" fill="currentColor"></path>
                            <path d="M21 3H15V5H19V9H21V3Z" fill="currentColor"></path>
                        </svg></button>
                    <button type="button" @click="selectedScreenSize = 'xs'"
                        :class="{ 'text-gray-800 dark:text-gray-500': selectedScreenSize === 'xs', 'text-gray-600 dark:text-gray-300': selectedScreenSize !== 'xs' }"
                        class="px-4 text-sm focus:outline-none hidden lg:block"><svg width="8.57142857142857" height="24"
                            viewBox="0 0 10 28" xmlns="http://www.w3.org/2000/svg" class="block mx-auto mb-1 fill-current">
                            <path
                                d="M1.5 12h7a1.5 1.5 0 0 1 1.5 1.5v13A1.5 1.5 0 0 1 8.5 28h-7A1.5 1.5 0 0 1 0 26.5v-13A1.5 1.5 0 0 1 1.5 12zM1 15v10h8V15H1zm4 12.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM4 13v1h2v-1H4z"
                                fill-rule="evenodd"></path>
                        </svg>xs</button><button type="button" @click="selectedScreenSize = 'sm'"
                        :class="{ 'text-gray-800 dark:text-gray-500': selectedScreenSize === 'sm', 'text-gray-600 dark:text-gray-300': selectedScreenSize !== 'sm' }"
                        class="px-4 text-sm focus:outline-none hidden lg:block"><svg width="11.999999999999998" height="24"
                            viewBox="0 0 14 28" xmlns="http://www.w3.org/2000/svg" class="block mx-auto mb-1 fill-current">
                            <path
                                d="M1.5 6h11A1.5 1.5 0 0 1 14 7.5v19a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 0 26.5v-19A1.5 1.5 0 0 1 1.5 6zM1 9v16h12V9H1zm6 18.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM7 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"
                                fill-rule="evenodd"></path>
                        </svg>sm</button><button type="button" @click="selectedScreenSize = 'md'"
                        :class="{ 'text-gray-800 dark:text-gray-500': selectedScreenSize === 'md', 'text-gray-600 dark:text-gray-300': selectedScreenSize !== 'md' }"
                        class="px-4 text-sm focus:outline-none hidden lg:block"><svg width="22.28571428571428" height="24"
                            viewBox="0 0 26 28" xmlns="http://www.w3.org/2000/svg" class="block mx-auto mb-1 fill-current">
                            <path
                                d="M26 26.5a1.5 1.5 0 0 1-1.5 1.5h-23A1.5 1.5 0 0 1 0 26.5v-14A1.5 1.5 0 0 1 1.5 11h23a1.5 1.5 0 0 1 1.5 1.5v14zm-3 .5V12H3v15h20zm1.5-6.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-23-.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"
                                fill-rule="evenodd"></path>
                        </svg>md</button><button type="button" @click="selectedScreenSize = 'lg'"
                        :class="{ 'text-gray-800 dark:text-gray-500': selectedScreenSize === 'lg', 'text-gray-600 dark:text-gray-300': selectedScreenSize !== 'lg' }"
                        class="px-4 text-sm focus:outline-none hidden lg:block"><svg width="32.57142857142856" height="24"
                            viewBox="0 0 38 28" xmlns="http://www.w3.org/2000/svg" class="block mx-auto mb-1 fill-current">
                            <path
                                d="M34 26h4v1c-1.333.667-2.667 1-4 1H4c-1.333 0-2.667-.333-4-1v-1h4V7.5A1.5 1.5 0 0 1 5.5 6h27A1.5 1.5 0 0 1 34 7.5V26zM6 8v18h26V8H6z"
                                fill-rule="evenodd"></path>
                        </svg>lg</button><button type="button" @click="selectedScreenSize = 'xl'"
                        :class="{ 'text-gray-800 dark:text-gray-500': selectedScreenSize === 'xl', 'text-gray-600 dark:text-gray-300': selectedScreenSize !== 'xl' }"
                        class="px-4 text-sm focus:outline-none hidden lg:block"><svg width="30.85714285714285" height="24"
                            viewBox="0 0 36 28" xmlns="http://www.w3.org/2000/svg" class="block mx-auto mb-1 fill-current">
                            <path
                                d="M20.857 24l.857 3H24v1H12v-1h2.286l.857-3H1.5A1.5 1.5 0 0 1 0 22.5v-21A1.5 1.5 0 0 1 1.5 0h33A1.5 1.5 0 0 1 36 1.5v21a1.5 1.5 0 0 1-1.5 1.5H20.857zM2 2v18h32V2H2z">
                            </path>
                        </svg>xl</button>
                </div>
                <div v-if="tab === 'code'" class="flex items-center m-2">
                    <button type="button"
                        class="p-1 text-gray-600 border border-gray-200 rounded-md focus:outline-none hidden lg:block"
                        @click="copyToClipboard">
                        <IconCopy />
                    </button>
                </div>
            </div>

            <div class="h-full overflow-hidden">
                <div v-if="tab === 'render'" class="border-b-2 w-full h-full flex items-center justify-center"> <iframe
                        :srcdoc="interpretedCode || defaultComponent" :style="getIframeSize()"></iframe></div>

                <CodeTextarea v-if="tab === 'code' && !fullscreen" :componentCode="generatedComponentCode"
                    class="w-full h-full overflow-auto focus:outline-none border-b-2" />
            </div>
        </div>
    </div>
</template>
  
<script>

import htmlContent from '@/components/defaultComponent.js';
import { useToast } from "vue-toastification";

export default {
    name: "GenerationPage",
    data() {
        return {
            framework: 'Tailwindcss',
            frameworks: ['Tailwindcss', 'Bootstrap'],
            component: 'Navbar',
            components: ['Navbar', 'Footer', 'Card', 'Table', 'Progress Bar', 'Button', 'Input', 'Form', 'Pagination', 'Alert', 'Search Bar', 'Pricing', 'Call to action', 'modals', 'badge', 'header', 'select', 'loader', 'checkbox', 'carousel', 'accordion', 'dropdown', 'breadcrumb', 'sidebar'],
            style: 'Modern',
            styles: ['Modern', 'Classic', 'Minimalist', 'Flat', 'Material', 'Neumorphism', 'Skeuomorphism', 'Vintage', 'Brutalist', 'Cartoonish', 'Retro'],
            primaryColor: '#7c3aed',
            secondaryColor: '#d1d5db',
            tab: 'render',
            generatedComponentCode: '',
            componentId: null,
            isLoading: false,
            defaultComponent: htmlContent,
            selectedScreenSize: 'xl',
            fullscreen: false,
            showModal: false,
            apiKey: '',
            customPrompt: false,
            prompt: '',
        };
    },
    computed: {
        interpretedCode() {
            if (!this.generatedComponentCode) {
                return this.defaultComponent;
            }
            return this.codeInterpreter(this.framework, this.generatedComponentCode);
        },
        cssLink() {
            /* eslint-disable no-useless-escape */
            return this.framework === 'Bootstrap'
                ? '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"><\/script>'
                : '<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">';
            /* eslint-enable no-useless-escape */
        },
        generationType() {
            return this.customPrompt ? 'custom' : 'supported';
        }
    },
    methods: {
        share() {
            if (this.componentId === null) {
                const toast = useToast();
                toast.error('You must generate a component to share it.', {
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            } else {
                navigator.clipboard.writeText('http://localhost:8080/component/' + this.componentId)
                    .then(() => {
                        const toast = useToast();
                        toast.success('Link copied to clipboard.', {
                            closeOnClick: true,
                            pauseOnHover: true,
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        const toast = useToast();
                        toast.error('An error has occurred.', {
                            closeOnClick: true,
                            pauseOnHover: true,
                        });
                    });
            }
        },
        isActive(tab) {
            return this.tab === tab;
        },
        async saveApiKey() {
            try {
                const response = await authenticatedAxios.post('/api/auth/save-api-key', { apiKey: this.apiKey });
                console.log(response.data);
                this.showModal = false;
                const toast = useToast();
                toast.success('The api key has been successfully saved, you can generate components as you wish.', {
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            } catch (error) {
                console.error(error);
            }
        },
        async generateComponent(customPrompt) {

            const token = localStorage.getItem('token');
            if (!token) {
                const toast = useToast();
                toast.error('You must be logged in to generate a component.', {
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                return;
            }
            if (!this.frameworks.includes(this.framework)) {
                const toast = useToast();
                toast.error('Invalid settings.', {
                    closeOnClick: true,
                    pauseOnHover: true,
                });
                return;
            }
            this.isLoading = true;

            if(customPrompt === true) {

                try {
                const response = await authenticatedAxios.post("/api/components/generate",
                    {
                        prompt: this.prompt
                    },
                );
                this.generatedComponentCode = response.data.generatedComponent;
                this.componentId = response.data.componentId;
            } catch (error) {
                console.error(error);
                if (error.response && (error.response.data.message === "You have reached the limit of 10 generated components." || "Invalid API key.")) {
                    this.showModal = true;
                    const toast = useToast();
                    toast.error(error.response.data.message, {
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                } else {
                    const toast = useToast();
                    const message = error.response ? error.response.data.message : 'An error occurred while generating the component';
                    toast.error(message, {
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                }
            } finally {
                this.isLoading = false;
            }

            } else {
                try {
                const response = await authenticatedAxios.post("/api/components/generate",
                    {
                        component: this.component,
                        framework: this.framework,
                        style: this.style,
                        primaryColor: this.primaryColor,
                        secondaryColor: this.secondaryColor
                    },
                );
                this.generatedComponentCode = response.data.generatedComponent;
                this.componentId = response.data.componentId;
            } catch (error) {
                console.error(error);
                if (error.response && (error.response.data.message === "You have reached the limit of 10 generated components." || "Invalid API key.")) {
                    this.showModal = true;
                    const toast = useToast();
                    toast.error(error.response.data.message, {
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                } else {
                    const toast = useToast();
                    const message = error.response ? error.response.data.message : 'An error occurred while generating the component';
                    toast.error(message, {
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                }
            } finally {
                this.isLoading = false;
            }
            }
        },
        codeInterpreter(framework, code) {
            /* eslint-disable no-useless-escape */
            let cssLink = framework === 'Bootstrap'
                ? '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"><\/script>'
                : '<script src="https://cdn.tailwindcss.com"><\/script>';

            return `<html>
                    <head>
                        ${cssLink}
                    </head>
                    <body style="background-color: #f9fafb;">
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
        getIframeSize() {
            switch (this.selectedScreenSize) {
                case 'xs': return { width: '320px', height: '100%' };
                case 'sm': return { width: '640px', height: '100%' };
                case 'md': return { width: '768px', height: '100%' };
                case 'lg': return { width: '1024px', height: '100%' };
                case 'xl': return { width: '1280px', height: '100%' };
                default: return { width: '100%', height: '100%' };
            }
        },
        copyToClipboard() {
            navigator.clipboard.writeText(this.generatedComponentCode)
                .then(() => {
                    const toast = useToast();
                    toast.success('Code copied to clipboard.', {
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                })
                .catch(error => {
                    console.log(error);
                    const toast = useToast();
                    toast.error('An error has occurred.', {
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                });
        },
    }
};
</script>
  
<style scoped>
@keyframes rotate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.rotating-image {
    animation: rotate 2s infinite linear;
}
</style>
  