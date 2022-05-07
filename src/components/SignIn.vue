<template>
  <div class="bg-white dark:bg-slate-900 min-h-screen w-full">
    <div class="text-slate-900 dark:text-white min-h-screen flex items-center justify-center">
      <div v-if="!hasAccessCode">
        <div class=" flex flex-col gap-7 p-8 bg-slate-100 rounded-xl dark:bg-slate-800 shadow-grey-800 shadow-md">
          <div>
            <h1>Sonos Web</h1>
            <h2>Unofficial Sonos Webclient</h2>
          </div>
          <button @click="handleLogin()"
            class="h-10 px-6 font-semibold rounded-full bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white shadow-md"
            type="button">Sign in</button>
        </div>
      </div>
      <div v-else>
        <loader></loader>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from '../services/auth.service';
import Loader from './Loader.vue';

export default defineComponent({
  components: { Loader },
  name: 'SignIn',
  setup() {
    const router = useRouter();
    return {
      router,
    };
  },
  data() {
    return {
      hasAccessCode: false,
      tokenUrl: import.meta.env.VITE_sonos_get_token_url,
    };
  },
  async mounted() {
    await this.router.isReady();
    try {
      const authorizationCode = this.$route.query.code;
      if (authorizationCode) {
        this.hasAccessCode = true;
        await AuthService.getAccessToken(authorizationCode);
        if (AuthService.isLoggedIn()) {
          this.router.push('/');
        }
      }
    } catch (err) {
      console.error(err);
    }
  },
  methods: {
    handleLogin() {
      window.location.href = this.tokenUrl;
    },
    handleLoggedIn() {
      if (AuthService.isLoggedIn()) {
        this.router.push('/');
      }
    }
  }
})
</script>