<template>
    <div v-show="isVisible" class="md:fixed right-4 top-4 md:right-6 md:top-6">
        <div class="p-4 mb-4 text-sm text-blue-700 bg-blue-100 dark:bg-blue-200 dark:text-blue-800 rounded-lg " role="alert">
            <span class="font-medium">{{ title }}</span>
            {{ message }}
        </div>
    </div>
</template>

<script>
export default {
    name: "Alert",
    props: ["title", "message"],
    data() { return {
        isVisible: true,
    }},
    mounted() {
        setTimeout(() => {
            this.isVisible = false
        }, 5000)
    }
}
</script>

<style scoped>
.alert {
    height: auto;
    width: auto;
    -webkit-animation-name: cssAnimation;
    -webkit-animation-duration: 5s;
    -webkit-animation-fill-mode: forwards;
    animation-name: cssAnimation;
    animation-duration: 5s;
    animation-fill-mode: forwards;
}

@keyframes cssAnimation {
    0% {
        opacity: 1;
    }

    90% {
        opacity: 1;

    }

    100% {
        opacity: 0;
        visibility: hidden;
        /* height: 0;
        width: 0; */
    }
}

@-webkit-keyframes cssAnimation {
    0% {
        opacity: 1;
    }

    90% {
        opacity: 1;

    }

    100% {
        opacity: 0;
        visibility: hidden;
        /* height: 0;
        width: 0; */
    }
}
</style>