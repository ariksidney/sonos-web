<script lang="ts">
import Alert from '../Alert.vue';
import Loader from '../Loader.vue';

export default {
    components: { Alert, Loader },
    name: "Station",
    props: ['container'],
    data() {
        return {
            needsScroll: false
        }
    },
    async mounted() {
        this.needsScroll = this.isScrollable();
    },
    methods: {
        isScrollable(): boolean {
            const elementName = "trackName";
            const element = document.getElementById(elementName);
            if (element) {
                var overflowX = element.offsetWidth < element.scrollWidth,
                    overflowY = element.offsetHeight < element.scrollHeight;

                return (overflowX || overflowY);
            } else {
                return false;
            }
        }
    }
}
</script>

<template>
    <h3 id="trackName" :class="{ scroll: needsScroll }">{{ container.container.name }}</h3>
    <div v-if="container.streamInfo">
        <p>{{ container.streamInfo }}</p>
    </div>
    <div v-if="container.container.service">
        <p>{{ container.container.service.name }}</p>
    </div>
</template>
