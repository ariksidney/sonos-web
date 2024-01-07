<script lang="ts">
import { defineComponent } from 'vue'
import Alert from './Alert.vue'
import Loader from './Loader.vue'

export default defineComponent({
  components: { Loader, Alert },
  name: 'Modal',
  props: ['title'],
  expose: ['show', 'hide'],
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    show() {
      this.showModal = true
    },
    hide() {
      this.showModal = false
    },
    closeEvent(event) {
      if (!document.getElementById('modal').contains(event.target)) {
        this.hide()
      }
    }
  }
})

</script>

<template>
  <Transition name="modal" type="animation">
    <div v-if="showModal">
      <div @click="closeEvent"
        class="modal fixed z-10 top-0 left-0 w-full h-full overflow-auto bg-black/70">
        <div id='modal'
          class="modal-content fixed bottom-0 bg-slate-100 dark:bg-slate-800 lg:w-1/2 lg:left-1/4 lg:right-1/4 w-full pt-3 pb-5">
          <div class="modal-body">
            <h2 class="font-semibold pb-1 text-gray-900 dark:text-slate-100">{{ title }}</h2>
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-body {
  padding: 2px 16px;
}

.modal-enter-active {
  animation: slide 0.3s;
}

.modal-leave-active {
  animation: slide 0.3s reverse;
}

@-webkit-keyframes slide {
  from {
    bottom: -300px;
    opacity: 0
  }

  to {
    bottom: 0;
    opacity: 1
  }
}

@keyframes slide {
  from {
    bottom: -300px;
    opacity: 0
  }

  to {
    bottom: 0;
    opacity: 1
  }
}
</style>
