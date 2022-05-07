<template>
    <div class="flex flex-col md:flex-row">
        <navigation></navigation>
        <main class="text-slate-900 dark:text-white w-full pr-4 pl-4 pb-4 md:p-4">
                {{checkedSettings}}
            <div class="flex items-center justify-center w-full mb-12">
                <label for="pageVisitReload" class="flex items-center cursor-pointer">
                    <div class="relative">
                        <input id="pageVisitReload" type="checkbox" class="sr-only" v-model="checkedSettings" >
                        <div class="w-10 h-4 bg-gray-300 rounded-full shadow-inner"></div>
                        <div class="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                    </div>
                    <div class="ml-3 text-dark dark:text-white">
                        Reload on page visit
                    </div>
                </label>

            </div>
        </main>
    </div>
</template>

<script language="ts">
import Navigation from './Navigation.vue';

export default {
    name: "Settings",
    components: { Navigation },
    data() {
        return {
            checkedSettings: [
                
            ]
        }
    }
}
</script>

<style scoped>
input:checked~.dot {
    transform: translateX(100%);
    background-color: rgb(124 58 237);
}
</style>