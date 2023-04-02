<template>
    <div class="flex flex-col md:flex-row">
        <navigation></navigation>
        <div class="container text-slate-900 dark:text-white">
            <h2 class="mb-7 pt-4">Unofficial Sonos client</h2>
            <p>Issues and contact: </p>
            <a class="hover:text-violet-500 dark:hover:text-violet-400"
                href="https://github.com/ariksidney/sonos-web">https://github.com/ariksidney/sonos-web</a>
        </div>
    </div>

</template>

<script>
import Navigation from './Navigation.vue';

export default {
    name: "About",
    components: { Navigation },
}
</script>
