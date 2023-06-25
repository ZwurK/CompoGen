<template>
    <transition name="fade">
        <div v-if="show" class="notification" :class="type">
            <button @click="show = false">x</button>
            <p>{{ message }}</p>
        </div>
    </transition>
</template>

<script>
export default {
  name: 'NotificationComponent',
  props: {
    messageProp: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: true,
      message: '',
      title: ''
    };
  },
  methods: {
    showNotification(title, message) {
      this.title = title;
      this.message = message;
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 5000);
    },
  },
  watch: {
    messageProp: function(newVal) {
      this.message = newVal;
    }
  }
};
</script>


<style scoped>
.notification {
    position: fixed;
    bottom: 1em;
    right: 1em;
    padding: 1em;
    border-radius: 0.5em;
    color: white;
    z-index: 1000;
}

.notification button {
    background: none;
    border: none;
    color: white;
    font-size: 1.5em;
    position: absolute;
    top: 0.5em;
    right: 0.5em;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
