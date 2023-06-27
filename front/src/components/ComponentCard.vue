<template>
    <div class="rounded-lg bg-white m-4 border">
        <router-link :to="`/component/${component._id}`"> <iframe sandbox="allow-same-origin allow-scripts"
                :srcdoc.prop="generateSrcDoc(component.framework, component.code)"
                style="width: 100%; height: 100%;"></iframe></router-link>
        <div class="flex items-center gap-3 justify-end mt-2">
            <button @click="like(component)" class="flex items-center gap-1 text-gray-400">
                <span class="text-sm">{{ component.likes }}</span>
                <LikeIcon :filled="hasLiked(component._id)" />
            </button>
            <button @click="copyToClipboard(component.code)" class="text-gray-400">
                <CopyIcon />
            </button>
        </div>
    </div>
</template>

<script>

import CopyIcon from "./icons/Copy.vue";
import LikeIcon from "./icons/Like.vue";

export default {
    props: ['component', "likedComponents"],
    components: {
        CopyIcon,
        LikeIcon
    },
    methods: {
        hasLiked(id) {
            return this.likedComponents.includes(id);
        },
        async copyToClipboard(text) {
            try {
                await navigator.clipboard.writeText(text);
                alert('Code copié dans le presse-papier!');
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
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
        like(component) {
            this.$emit('like-component', component._id);
        },
    }
}

</script>