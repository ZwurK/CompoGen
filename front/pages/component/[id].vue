<template>
  <div class="h-screen md:flex flex-col md:flex-row" style="margin-top: 76px;">
    <div class="w-full h-full md:w-2/3 md:h-auto md:flex md:flex-col flex-grow">
      <div class="flex justify-between border-b-2 border-gray-200 pt-3 mb-2">
        <ul class="flex gap-4 ml-4 cursor-pointer items-end">
          <li class="pb-2" @click="tab = 'render'"
            :class="{ 'border-b-2 border-purple-500 text-violet-600': isActive('render') }">
            Render
          </li>
          <li class="pb-2" @click="tab = 'code'"
            :class="{ 'border-b-2 border-purple-500 text-violet-600': isActive('code') }">
            Code
          </li>
        </ul>
        <div v-if="tab === 'render'" class="flex items-center">
          <button type="button"
            class="p-1 text-gray-600 border border-gray-200 rounded-md focus:outline-none hidden lg:block mr-4"
            @click="share(component._id)">
            <IconShare />
          </button>
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
            @click="copyToClipboard(component.code)">
            <IconCopy />
          </button>
        </div>
      </div>

      <div class="h-full overflow-hidden">
        <div v-if="tab === 'render'" class="border-b-2 w-full h-full flex items-center justify-center"> <iframe
            :srcdoc="interpretedCode" :style="iframeSize(selectedScreenSize)"></iframe></div>

        <CodeTextarea v-if="tab === 'code'" :componentCode="component.code"
          class="w-full h-full overflow-auto focus:outline-none border-b-2" />
      </div>
    </div>
  </div>
</template>
  
  
<script setup>

let tab = ref('render');
let selectedScreenSize = ref('xl');
let component = ref(null);
let pending = ref(false);

const route = useRoute();
const config = useRuntimeConfig();
const { share } = useShare();
const { copyToClipboard } = useCopy();
const { codeInterpreter } = useCodeInterpreter();
const { iframeSize } = useIframeSize();

// Computed
const interpretedCode = computed(() => {
  if (component.value) {
    return codeInterpreter(component.value.framework, component.value.code);
  } else {
    return;
  }
});

const isActive = (currentTab) => {
    return tab.value === currentTab;
};

const getIframeSize = () => {
  switch (selectedScreenSize.value) {
    case 'xs': return { width: '320px', height: '100%' };
    case 'sm': return { width: '640px', height: '100%' };
    case 'md': return { width: '768px', height: '100%' };
    case 'lg': return { width: '1024px', height: '100%' };
    case 'xl': return { width: '1280px', height: '100%' };
    default: return { width: '100%', height: '100%' };
  }
};

const fetchComponent = async () => {
    pending.value = true;
    const { data, error, execute } = useFetch(config.public.apiBaseUrl + `/api/components/getOneComponent/${route.params.id}`, {
        method: 'GET',
        baseURL: config.public.apiBaseUrl,
        headers: {
            'Content-Type': 'application/json',
        },
    })

     // Execute the request
     await execute()
    
    if (error.value) {
      // Handle error
      throw error.value; 
    } else {
      component.value = data.value;
    }
    pending.value = false;
}

onMounted(fetchComponent);


</script>

  