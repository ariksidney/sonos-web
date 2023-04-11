<script lang="ts">
import Alert from '../Alert.vue';
import Loader from '../Loader.vue';

export default {
    components: { Alert, Loader },
    name: "Audiobook",
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
    <div>
        <template v-if="container.currentItem.track.name">
            <a>{{ container.currentItem.track.name }}</a>
        </template>
        <template v-if="container.currentItem.track.author">
            <a> &#9679; {{ container.currentItem.track.author.name }}</a>
        </template>
    </div>
    <div v-if="container.currentItem.track.narrator">
        <p>Narrated by {{ container.currentItem.track.narrator.name }}</p>
    </div>
</template>
