<script lang="ts">

export default {
    components: {},
    name: "Music",
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
    <h3 id="trackName" :class="{ scroll: needsScroll }">
        {{ container.currentItem.track.name }}
    </h3>
    <template v-if="container.currentItem.track.artist">
        <a aria-label="Artist name" title="Artist">{{ container.currentItem.track.artist.name }}</a>
    </template>
    <template v-if="container.currentItem.track.album">
        <a aria-label="Album name" title="Album"> &#9679; {{ container.currentItem.track.album.name }}</a>
    </template>
    <div v-if="container.container.type.startsWith('playlist')">
        <p class="text-sm">Playing {{ container.container.name }}</p>
    </div>
</template>
