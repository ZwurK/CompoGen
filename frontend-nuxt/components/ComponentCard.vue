<template>
    <div class="rounded-lg mb-6 bg-white border-2">
        <router-link :to="`/component/${component._id}`" class="h-64 overflow-hidden">
            <div style="height: 300px;" class="border-b-2 overflow-hidden">
                <iframe sandbox="allow-scripts" :srcdoc="codeInterpreter(component.framework, component.code)"
                    class="w-full h-full"></iframe>
            </div>
        </router-link>
        <div class="px-4 py-2 flex items-center gap-3 justify-end">
            <img v-if="component.framework === 'Bootstrap'" src="/images/bootstrap_logo.png" class="h-7 w-auto" />
            <img v-else src="/images/tailwindcss_logo.png" class="h-6 w-auto" />
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
                <div>
                    <IconLikeFill v-if="isLikedByUser" class="text-gray-400 hover:text-gray-600 h-7 w-7"
                        @click="toggleFavorite" />
                    <IconLikeEmpty v-else class="text-gray-400 hover:text-gray-600 h-7 w-7" @click="toggleFavorite" />
                </div>
                <span class="text-lg text-gray-600">{{ component.likes }}</span>
            </div>
            <button @click="copyToClipboard(component.code)" class="text-gray-400 hover:text-gray-600">
                <IconCopy class="h-7 w-7" />
            </button>
        </div>
    </div>
</template>




<script setup>

import { useUserStore } from '~/stores/user';

const userStore = useUserStore();
const { codeInterpreter } = useCodeInterpreter();
const { copyToClipboard } = useCopy();
const config = useRuntimeConfig();

let props = defineProps(['component']);

let favorites = computed(() => props.component.likes);

let isLikedByUser = computed(() => {
    return userStore.user.likedComponents.includes(props.component._id);
});

let isLoggedIn = userStore.isLoggedIn;

async function toggleFavorite() {

    if (!isLoggedIn) {
        return;
    }

    console.log('test')

    const isFavorite = userStore.user.likedComponents.includes(props.component._id);

    try {
        let response;
        if (isFavorite) {
            const { data, error, execute } = useFetch(`/api/favorite/unlike/${props.component._id}`, {
                method: 'PUT',
                baseURL: config.public.apiBaseUrl,
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            // Execute the request
            await execute()
        } else {
            response = await useFetch();
            const { data, error, execute } = useFetch(`/api/favorite/like/${props.component._id}`, {
                method: 'PUT',
                baseURL: config.public.apiBaseUrl,
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            // Execute the request
            await execute()
        }

    } catch (error) {
        console.error(error);
    }
}

</script>