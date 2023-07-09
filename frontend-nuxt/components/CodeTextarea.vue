<template>
    <prism-editor class="my-editor" :componentCode="componentCode" v-model="code" :highlight="highlighter" line-numbers></prism-editor>
</template>

<script>
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';

import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-tomorrow.css';

export default {
    name: 'CodeTextarea',
    data() {
        return {
            code: 'Test',
        };
    },
    components: {
        PrismEditor,
    },
    props: {
        componentCode: {
            type: String,
            default: 'test',
        },
    },
    mounted() {
        this.code = this.componentCode;
    },
    methods: {
        highlighter(code) {
            return Prism.highlight(code, Prism.languages.html, 'html');
        },
    },
};
</script>

  
<style>
.my-editor {
    background: #ffffff;
    color: black;
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
}

.prism-editor__textarea:focus {
    outline: none;
}
</style>
