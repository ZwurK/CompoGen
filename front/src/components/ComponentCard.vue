<template>
    <div class="rounded-lg mb-6 bg-white border-2">
        <router-link :to="`/component/${component._id}`" class="h-64 overflow-hidden">
            <div style="height: 300px;" class="border-b-2 overflow-hidden">
                <iframe sandbox="allow-scripts" :srcdoc.prop="generateSrcDoc(component.framework, component.code)"
                    class="w-full h-full"></iframe>
            </div>
        </router-link>
        <div class="px-4 py-2 flex items-center gap-3 justify-end">
            <img v-if="component.framework === 'Bootstrap'" src="../assets/images/bootstrap_logo.png" class="h-7 w-auto" />
            <img v-else src="../assets/images/tailwindcss_logo.png" class="h-6 w-auto" />
            <button type="button"
                class="p-1 text-gray-600 border border-gray-200 rounded-md focus:outline-none hidden lg:block"
                @click="$router.push('/component/' + component._id)"><svg viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg" class="w-6 h-6">
                    <path d="M3 3H9V5H5V9H3V3Z" fill="currentColor"></path>
                    <path d="M3 21H9V19H5V15H3V21Z" fill="currentColor"></path>
                    <path d="M15 21H21V15H19V19H15V21Z" fill="currentColor"></path>
                    <path d="M21 3H15V5H19V9H21V3Z" fill="currentColor"></path>
                </svg></button>

            <div class="flex gap-1 items-center justify-center" v-if="isLoggedIn">
                <LikeFillIcon v-if="isComponentFavorited() === false" class="text-gray-400 hover:text-gray-600 h-7 w-7"
                    @click="toggleFavorite" />
                <LikeEmptyIcon v-else class="text-gray-400 hover:text-gray-600 h-7 w-7" @click="toggleFavorite" />
                <span class="text-lg text-gray-600">{{ this.favorites }}</span>
            </div>
            <button @click="copyToClipboard(component.code)" class="text-gray-400 hover:text-gray-600">
                <CopyIcon class="h-7 w-7" />
            </button>
        </div>
    </div>
</template>




<script>

import CopyIcon from "./icons/Copy.vue";
import { useToast } from "vue-toastification";
import LikeEmptyIcon from '@/components/icons/LikeEmpty.vue';
import LikeFillIcon from '@/components/icons/LikeFill.vue';
import authenticatedAxios from "@/config/authenticatedAxios";
import { mapGetters } from 'vuex';

export default {
    props: ['component'],
    components: {
        CopyIcon,
        LikeFillIcon,
        LikeEmptyIcon,
    },
    computed: {
        favorites() {
            return this.component.likes;
        },
        ...mapGetters('user', ['isLoggedIn']),
    },
    methods: {
        isComponentFavorited() {
            return this.$store.state.favorite.userFavorites.includes(this.component._id);
        },
        async copyToClipboard(code) {
            navigator.clipboard.writeText(code)
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
        generateSrcDoc(framework, code) {
            /* eslint-disable no-useless-escape */
            let cssLink = framework === 'Bootstrap'
                ? '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"><\/script>'
                : '<script src="https://cdn.tailwindcss.com"><\/script>';

            return `<html>
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
        async toggleFavorite() {

            if (!this.isLoggedIn) {
                return;
            }

            const isFavorite = this.$store.state.favorite.userFavorites.includes(this.component._id);

            try {
                let response;
                if (isFavorite) {
                    response = await authenticatedAxios.put(`/api/favorite/unlike/${this.component._id}`);
                    this.$store.commit("favorite/removeFavorite", this.component._id);
                } else {
                    response = await authenticatedAxios.put(`/api/favorite/like/${this.component._id}`);
                    this.$store.commit("favorite/addFavorite", this.component._id);
                }

                // Mise à jour du nombre de likes du composant dans le store Vuex après l'action de l'utilisateur
                this.$store.commit('favorite/updateComponentLikes', { componentId: this.component._id, likes: response.data.likes });

            } catch (error) {
                console.error(error);
            }
        }
    }
}

</script>