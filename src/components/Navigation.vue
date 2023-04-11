<template>
    <aside
        class="hidden md:flex flex-row p-4 gap-1.5 md:flex-col items-start md:min-h-screen md:pb-0 text-slate-900 dark:text-white bg-white dark:bg-slate-900 md:flex-none md:w-1/5 lg:w-1/7">
        <div>
            <h1>Sonos Web</h1>
        </div>
        <div class="hover:text-violet-500 dark:hover:text-violet-400 pb-1">
            <button @click="overview()">Overview</button>
        </div>
        <div class="hover:text-violet-500 dark:hover:text-violet-400 pb-1">
            <button @click="favorites()">Favorites</button>
        </div>
        <div class="hover:text-violet-500 dark:hover:text-violet-400 pb-1">
            <button @click="about()">About</button>
        </div>
        <div class="hover:text-violet-500 dark:hover:text-violet-400 pb-1">
            <button @click="logout()">Logout</button>
        </div>
    </aside>
    <aside class="relative h-full md:invisible pt-4 pr-4 pl-4 text-slate-900 dark:text-white">
        <div class="flex gap-3 pb-5">
            <button @click="toggleMobileMenu()" class="outline-none mobile-menu-button">
                <svg class=" w-6 h-6 text-gray-500 hover:text-violet-500" x-show="!showMenu" fill="none"
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
            <div>
                <h1>Sonos Web</h1>
            </div>
        </div>
        <div class="hidden mobile-menu mb-7 mt-3">
            <div class="flex flex-col gap-2 w-full">
                <button class="hover:text-violet-500 dark:hover:text-violet-400 pb-1" @click="overview()">Overview</button>
                <button class="hover:text-violet-500 dark:hover:text-violet-400 pb-1" @click="favorites()">Favorites</button>
                <button class="hover:text-violet-500 dark:hover:text-violet-400 pb-1" @click="about()">About</button>
                <button class="hover:text-violet-500 dark:hover:text-violet-400 pb-1" @click="logout()">Logout</button>
            </div>
        </div>

    </aside>

</template>

<script lang="ts">
import AuthService from "../services/auth.service"
import { useRouter } from 'vue-router';

export default {
    name: "Navigation",
    setup() {
        const router = useRouter();
        return {
            router,
        };
    },
    methods: {
        logout() {
            AuthService.signOut();
            this.router.push('/SignIn')
        },
        settings() {
            this.router.push('/Settings')
        },
        overview() {
            this.router.push('/')
        },
        about() {
            this.router.push('/about')
        },
        favorites() {
            this.router.push('/favorites')
        },
        toggleMobileMenu() {
            const mobile = document.querySelector(".mobile-menu");
            if (mobile !== null) {
                mobile.classList.toggle("hidden");
            }
        }
    }
}

</script>