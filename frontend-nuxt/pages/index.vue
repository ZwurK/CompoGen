<template>
    <section class="relative h-screen max-h-[1024px] flex items-center">
        <div class="flex-1 flex flex-col justify-center max-w-3xl">
            <h1
                class="mb-4 sm:mb-8 text-5xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
                <span>Looking for</span> <span
                    class="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-violet-600 to-indigo-600 lg:inline">the
                    perfect </span><span>web component?</span>
            </h1>
            <p class="px-0 mb-4 sm:mb-8 text-base text-gray-600 md:text-xl">
                Browse through thousands of ready-to-use components and generate your own using AI.
            </p>
            <div class="mb-4 space-x-0 md:space-x-2 md:mb-8">
                <nuxt-link to="/generate"
                    class="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-2xl sm:w-auto sm:mb-0">
                    Get Started
                    <IconArrowRight />
                </nuxt-link>
                <nuxt-link to="/"
                    class="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg bg-gray-200 hover:bg-gray-100 rounded-2xl sm:w-auto sm:mb-0">
                    Learn More
                    <IconLight />
                </nuxt-link>
            </div>
        </div>
        <div class="absolute -z-10 bottom-0 right-0 max-w-3xl">
            <img src="/images/landing.png" />
        </div>
    </section>

    <section class="w-full overflow-hidden bg-white mt-40">
        <div class="flex justify-between mb-8 items-center">
            <h2
                class="flex-1 text-left md:text-center text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:tracking-tight">
                <span
                    class="inline w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-violet-600 to-indigo-600 lg:inline">Featured
                </span>
                <span>components</span>
            </h2>
            <div class="mt-4 me-10 space-x-4">
                <button @click="scroll(-100)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        class="w-6 h-6 text-gray-500">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>
                <button @click="scroll(100)">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        class="w-6 h-6 text-gray-500">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        </div>

        <div class="relative">
            <div v-if="pending"></div>
            <div v-else class="flex gap-3 overflow-x-scroll hide-scrollbar" ref="scroller">
                <ComponentCard class="flex-1 min-w-[360px]" v-for="component in components" :key="component.id"
                    :component="component" />
            </div>
        </div>
    </section>


    <div class="mx-auto max-w-7xl mt-24">
        <div class="w-full mx-auto text-center md:w-11/12 xl:w-9/12">
            <h2 class="mb-4 text-2xl font-extrabold leading-none tracking-normal text-gray-900 md:text-4xl">
                Stay Connected
            </h2>
            <p class="px-0 mb-4 text-lg text-gray-600 md:text-xl lg:px-24">
                Subscribe to our newsletter for updates and new components.
            </p>
            <form @submit.prevent="subscribe" class="mb-4 space-x-0 md:space-x-2 md:mb-8">
                <input v-model="email" type="email"
                    class="sm:w-fit w-full text-lg py-3 px-4 pr-8 leading-none border-2 border-gray-300 rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent bg-white"
                    placeholder="Enter your email" required />
                <button
                    class="inline-flex items-center justify-center w-full px-6 py-3 text-lg text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-2xl sm:w-auto">
                    Subscribe
                    <IconArrowRight />
                </button>
            </form>
        </div>
    </div>
</template>
  
<script setup>

const email = ref('');

let params = {
    page: 1,
    limit: 10,
    sort: 'likes:desc',
    filter: '',
}

const config = useRuntimeConfig()
const { data: components, error, pending } = useFetch(config.public.apiBaseUrl + '/api/components/explore', params)

const subscribe = async () => {
  const response = await $fetch(config.public.apiBaseUrl + '/api/newsletter/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email.value }),
  });

  console.log(response)

  const data = await response.json();

  if (!response.ok) {
    console.log(data.errors[0].msg);
  } else {
    console.log(data.message);
  }
};

const scroll = (direction) => {
    const container = this.$refs.scroller;
    const maxScrollWidth = container.scrollWidth - container.clientWidth / 2 - container.clientWidth / 2;

    if (maxScrollWidth !== 0) {
        let scrollAmount = 0;
        const slideTimer = setInterval(() => {
            container.scrollLeft += direction * 10;
            scrollAmount += 10;
            if (scrollAmount >= 10) {
                clearInterval(slideTimer);
            }
        });
    }
}

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
  