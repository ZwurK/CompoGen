<template>
    <div>
        <NavbarWhite />
        <main class="px-4 sm:px-5 lg:px-10 max-w-screen-xl mx-auto"><router-view /></main>
        <FooterWhite/>
        <ContactForm />
    </div>
</template>
  
<script>
import NavbarWhite from '../components/Navbar.vue';
import FooterWhite from '../components/Footer.vue';
import ContactForm from '../components/ContactForm.vue';

export default {
    components: {
        NavbarWhite,
        FooterWhite,
        ContactForm,
    },
};
</script>
  