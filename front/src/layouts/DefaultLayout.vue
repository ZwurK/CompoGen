<template>
    <div>
        <NavbarWhite />
        <main><router-view /></main>
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
  