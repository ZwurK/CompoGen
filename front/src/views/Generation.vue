<template>
    <section class="mx-auto max-w-7xl px-8 py-12">
        <h1 class="mb-8 text-4xl font-bold text-pink-400">Generate Component</h1>
        <div class="md:flex">
            <div class="md:w-1/4 mb-12 md:mb-0 md:border-r-2 border-gray-200 pr-4">
                <h2 class="mb-6 text-2xl font-bold text-purple-400">Settings</h2>
                <form @submit.prevent="generateComponent">
                    <div class="space-y-4">
                        <div>
                            <label for="framework" class="text-lg font-semibold text-purple-500">Framework</label>
                            <div class="relative mb-4">
                                <select id="framework" v-model="framework"
                                    class="block appearance-none w-full text-lg py-3 px-4 pr-8 leading-none border-2 border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent bg-white">
                                    <option v-for="(framework, index) in frameworks" :key="index">{{ framework }}</option>
                                </select>
                                <div class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                    <svg class="fill-current h-4 w-4" viewBox="0 -4.5 20 20" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        fill="#000000">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <title>arrow_down [#338]</title>
                                            <desc>Created with Sketch.</desc>
                                            <defs> </defs>
                                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <g id="Dribbble-Light-Preview"
                                                    transform="translate(-220.000000, -6684.000000)" fill="#000000">
                                                    <g id="icons" transform="translate(56.000000, 160.000000)">
                                                        <path
                                                            d="M164.292308,6524.36583 L164.292308,6524.36583 C163.902564,6524.77071 163.902564,6525.42619 164.292308,6525.83004 L172.555873,6534.39267 C173.33636,6535.20244 174.602528,6535.20244 175.383014,6534.39267 L183.70754,6525.76791 C184.093286,6525.36716 184.098283,6524.71997 183.717533,6524.31405 C183.328789,6523.89985 182.68821,6523.89467 182.29347,6524.30266 L174.676479,6532.19636 C174.285736,6532.60124 173.653152,6532.60124 173.262409,6532.19636 L165.705379,6524.36583 C165.315635,6523.96094 164.683051,6523.96094 164.292308,6524.36583"
                                                            id="arrow_down-[#338]"> </path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                            <label class="text-lg font-semibold text-purple-500">Component Type</label>
                            <div class="relative">
                                <select v-model="component"
                                    class="block appearance-none w-full text-lg py-3 px-4 pr-8 leading-none border-2 border-gray-300 rounded text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent bg-white">
                                    <option v-for="(element, index) in elements" :key="index">{{ element }}</option>
                                </select>
                                <div class="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                                    <svg class="fill-current h-4 w-4" viewBox="0 -4.5 20 20" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        fill="#000000">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <title>arrow_down [#338]</title>
                                            <desc>Created with Sketch.</desc>
                                            <defs> </defs>
                                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                <g id="Dribbble-Light-Preview"
                                                    transform="translate(-220.000000, -6684.000000)" fill="#000000">
                                                    <g id="icons" transform="translate(56.000000, 160.000000)">
                                                        <path
                                                            d="M164.292308,6524.36583 L164.292308,6524.36583 C163.902564,6524.77071 163.902564,6525.42619 164.292308,6525.83004 L172.555873,6534.39267 C173.33636,6535.20244 174.602528,6535.20244 175.383014,6534.39267 L183.70754,6525.76791 C184.093286,6525.36716 184.098283,6524.71997 183.717533,6524.31405 C183.328789,6523.89985 182.68821,6523.89467 182.29347,6524.30266 L174.676479,6532.19636 C174.285736,6532.60124 173.653152,6532.60124 173.262409,6532.19636 L165.705379,6524.36583 C165.315635,6523.96094 164.683051,6523.96094 164.292308,6524.36583"
                                                            id="arrow_down-[#338]"> </path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                            </div>


                        </div>

                        <button :disabled="isLoading" type="submit"
                            class="flex items-center space-x-2 rounded bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 text-white hover:from-pink-400 hover:to-purple-400">
                            <div v-if="isLoading">Loading...</div>
                            <div class="flex items-center" v-else>
                                <svg class="h-6 w-6" viewBox="0 0 24.00 24.00" fill="none"
                                    xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            d="M12.9998 14L9.99985 11M15.0102 3.5V2M18.9495 5.06066L20.0102 4M18.9495 13L20.0102 14.0607M11.0102 5.06066L9.94954 4M20.5102 9H22.0102M6.13122 20.8686L15.3685 11.6314C15.7645 11.2354 15.9625 11.0373 16.0367 10.809C16.1019 10.6082 16.1019 10.3918 16.0367 10.191C15.9625 9.96265 15.7645 9.76465 15.3685 9.36863L14.6312 8.63137C14.2352 8.23535 14.0372 8.03735 13.8089 7.96316C13.608 7.8979 13.3917 7.8979 13.1908 7.96316C12.9625 8.03735 12.7645 8.23535 12.3685 8.63137L3.13122 17.8686C2.7352 18.2646 2.53719 18.4627 2.46301 18.691C2.39775 18.8918 2.39775 19.1082 2.46301 19.309C2.53719 19.5373 2.7352 19.7354 3.13122 20.1314L3.86848 20.8686C4.2645 21.2646 4.4625 21.4627 4.69083 21.5368C4.89168 21.6021 5.10802 21.6021 5.30887 21.5368C5.53719 21.4627 5.7352 21.2646 6.13122 20.8686Z"
                                            stroke="#ffffff" stroke-width="1.2" stroke-linecap="round"
                                            stroke-linejoin="round">
                                        </path>
                                    </g>
                                </svg>
                                <span>Generate</span>
                            </div>
                        </button>
                        <p v-if="isLoading" class="text-gray-500">Component generation generally takes a minute.</p>
                    </div>
                </form>
            </div>
            <div class="md:ml-10 md:w-3/4">
                <h2 class="mb-6 text-2xl font-bold text-purple-400">Preview</h2>
                <div class="mt-8">

                    <div class="border-b border-gray-200">
                        <ul class="flex cursor-pointer">
                            <li @click="tab = 'render'"
                                :class="{ 'border-b-2 border-purple-500 pb-2 font-bold': isActive('render') }" class="mr-4">
                                Render
                            </li>
                            <li @click="tab = 'code'"
                                :class="{ 'border-b-2 border-purple-500 pb-2 font-bold': isActive('code') }">
                                Code
                            </li>
                        </ul>
                    </div>

                    <div v-if="tab === 'render'" class="border-2 border-gray-300 p-4 rounded-md mt-4">
                        <div v-if="generatedComponent !== ''">
                            <iframe sandbox="allow-same-origin allow-scripts" :srcdoc="generateSrcDoc()"
                                style="width: 100%; height: 500px;"></iframe>
                        </div>
                        <div v-else>
                            <p>Aucun composant généré pour le moment.</p>
                        </div>
                    </div>


                    <div v-else class="relative mt-4">
                        <textarea v-model="generatedComponent"
                            class="text-md h-64 w-full resize-none rounded-md bg-opacity-50 px-3 py-2 text-gray-400 placeholder-gray-400 border-2 border-purple-500"
                            readonly></textarea>
                        <button @click="copyToClipboard"
                            class="absolute right-2 bottom-2 bg-purple-500 text-white rounded px-2 py-1 mb-2"><svg
                                class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15"
                                        stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                                    </path>
                                    <path d="M9 12H15" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round"
                                        stroke-linejoin="round"></path>
                                    <path d="M9 16H12" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round"
                                        stroke-linejoin="round"></path>
                                    <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                                        stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                                    </path>
                                </g>
                            </svg></button>
                    </div>

                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    name: 'GenerationPage',
    data() {
        return {
            framework: 'Tailwindcss',
            frameworks: ['Tailwindcss', 'Bootstrap'],
            component: 'Navbar',
            tab: 'render',
            elements: ['Navbar', 'Footer', 'Card', 'Table', 'Progress Bar', 'Button', 'Input', 'Form', 'Pagination', 'Alert', 'Search Bar', 'Pricing', 'Call to action', 'modals', 'badge', 'header', 'select', 'loader', 'checkbox', 'carousel', 'accordion', 'dropdown'],
            generatedComponent: '',
            isLoading: false,
        }
    },
    computed: {

        cssLink() {
            /* eslint-disable no-useless-escape */
            return this.framework === 'Bootstrap'
                ? '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"><\/script>'
                : '<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">';
            /* eslint-enable no-useless-escape */
        }
    },
    methods: {
        async generateComponent() {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('You must be logged in to generate an element.');
                return;
            }
            if (!this.frameworks.includes(this.framework)) {
                alert('Invalid framework selected.');
                return;
            }
            this.isLoading = true;
            try {
                const response = await axios.post("http://localhost:3000/api/elements/generate",
                    {
                        component: this.component,
                        framework: this.framework
                    },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                this.generatedComponent = response.data.generatedComponent;
            } catch (error) {
                console.error(error);
            } finally {
                this.isLoading = false;
            }
        },
        copyToClipboard() {
            navigator.clipboard.writeText(this.generatedComponent)
                .then(() => {
                    // Afficher un message de succès, ou faire quelque chose lorsque la copie réussit
                    console.log('Copied to clipboard');
                })
                .catch(err => {
                    // Afficher un message d'erreur, ou faire quelque chose lorsque la copie échoue
                    console.error('Could not copy text: ', err);
                });
        },
        isActive(tab) {
            return this.tab === tab;
        },
        generateSrcDoc() {
            /* eslint-disable no-useless-escape */
            return `<html>
                    <head>
                        ${this.cssLink}
                    </head>
                    <body>
                        ${this.generatedComponent}
                    </body>
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
                </html>`;
            /* eslint-enable no-useless-escape */
        }
    },
}
</script>
