<template>
    <monaco-editor class="my-editor" v-model="code" lang="html" :options="{theme: 'vs-light'}">
        Loading Editor...
    </monaco-editor>
</template>

<script>

export default {
    name: 'CodeTextarea',
    data() {
        return {
            code: 'Test',
        };
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
};
</script>

  
<style>
.my-editor {
    background: #fff;
    color: black;
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 32px;
    line-height: 1.5;
    padding: 5px;
}

.prism-editor__textarea:focus {
    outline: none;
}
</style>
