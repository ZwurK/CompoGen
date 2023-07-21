<template>
  <div>
    <button @click.prevent="toggleDropdown"
      class="text-center px-4 py-3 leading-none border-2 border-violet-600 rounded text-violet-600 md:ml-10 hover:text-white hover:bg-violet-600"
    >
        {{ triggerText }}
    </button>

    <div v-if="isOpen" @click="closeDropdown" ref="clickOutside" class="origin-top-right absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-xl">
      <!-- Dropdown content goes here -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
      triggerText: String,
  },
  data() {
    return {
        isOpen: false
    }
  },

  methods: {
    toggleDropdown () {
      this.isOpen = !this.isOpen;
    },
    closeDropdown () {
      this.isOpen = false;
    },
    handleClickOutside (event) {
        console.log(event.target)
      if (!this.$el.contains(event.target)) {
        this.isOpen = false;
      }
    }
  }, 

  mounted() {
      document.addEventListener('click', this.handleClickOutside);
  },

  beforeUnmount() {
      document.removeEventListener('click', this.handleClickOutside);
  }
};
</script>