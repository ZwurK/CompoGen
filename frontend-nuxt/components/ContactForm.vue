<template>
    <button class="fixed bottom-4 right-4 bg-purple-500 text-white rounded px-4 py-2" @click="showModal = true"><svg
            class="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
                <g id="Communication / Chat_Remove">
                    <path id="Vector"
                        d="M9 11H15M7.12357 18.7012L5.59961 19.9203C4.76744 20.5861 4.35115 20.9191 4.00098 20.9195C3.69644 20.9198 3.40845 20.7813 3.21846 20.5433C3 20.2696 3 19.7369 3 18.6712V7.2002C3 6.08009 3 5.51962 3.21799 5.0918C3.40973 4.71547 3.71547 4.40973 4.0918 4.21799C4.51962 4 5.08009 4 6.2002 4H17.8002C18.9203 4 19.4796 4 19.9074 4.21799C20.2837 4.40973 20.5905 4.71547 20.7822 5.0918C21 5.5192 21 6.07899 21 7.19691V14.8036C21 15.9215 21 16.4805 20.7822 16.9079C20.5905 17.2842 20.2843 17.5905 19.908 17.7822C19.4806 18 18.921 18 17.8031 18H9.12207C8.70603 18 8.49877 18 8.2998 18.0408C8.12328 18.0771 7.95216 18.1368 7.79168 18.2188C7.61281 18.3101 7.45249 18.4384 7.13478 18.6926L7.12357 18.7012Z"
                        stroke="#ffffff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path>
                </g>
            </g>
        </svg></button>

    <div v-if="showModal" class="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center"
        style="background-color: rgba(0,0,0,0.5)">
        <div class="bg-white rounded shadow-lg w-64">
            <div class="px-4 py-2">
                <h2 class="text-2xl font-bold mb-4">Contact Us</h2>
                <input v-model="form.name" type="text" placeholder="Your Name"
                    class="w-full border-2 border-purple-500 p-2 rounded mb-3">
                <input v-model="form.email" type="email" placeholder="Your Email"
                    class="w-full border-2 border-purple-500 p-2 rounded mb-3">
                <textarea v-model="form.message" placeholder="Your Message"
                    class="w-full border-2 border-purple-500 p-2 rounded h-24"></textarea>
                <button @click="submitForm" class="w-full bg-purple-500 text-white rounded px-4 py-2 mt-4">Send
                    Message</button>
                <button @click="showModal = false" class="w-full text-gray-500 mt-2">Close</button>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    name: 'ContactForm',
    data() {
        return {
            showModal: false,
            form: {
                name: '',
                email: '',
                message: ''
            }
        };
    },

    methods: {
        submitForm() {
            axios.post('/api/contact/submit', this.form)
                .then(response => {
                    console.log(response);
                    this.form = {
                        name: '',
                        email: '',
                        message: ''
                    };
                    this.showModal = false;
                })
                .catch(error => {
                    console.log(error);
                });
        },
    }
}
</script>

<style scoped>button.fixed {
    transition: all 0.3s ease;
}

button.fixed:hover {
    transform: translateY(-10px);
}</style>
